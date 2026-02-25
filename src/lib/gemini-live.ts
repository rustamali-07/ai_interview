import { InterviewSetup, TranscriptEntry } from "@/types";
import { buildInterviewPrompt } from "./prompts";
import { floatTo16BitPCM, arrayBufferToBase64, base64ToArrayBuffer, pcm16ToFloat32 } from "./audio-processor";

export type GeminiLiveEvent =
  | { type: "connected" }
  | { type: "setup_complete" }
  | { type: "transcript"; speaker: "ai" | "user"; text: string }
  | { type: "audio"; data: Float32Array; sampleRate: number }
  | { type: "turn_complete" }
  | { type: "interrupted" }
  | { type: "error"; error: string }
  | { type: "closed" };

export type GeminiLiveEventHandler = (event: GeminiLiveEvent) => void;

const GEMINI_LIVE_WS_URL = "wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent";
const MODEL = "models/gemini-live-2.5-flash-preview-native-audio";

export class GeminiLiveClient {
  private ws: WebSocket | null = null;
  private apiKey: string;
  private setup: InterviewSetup;
  private onEvent: GeminiLiveEventHandler;
  private audioContext: AudioContext | null = null;
  private audioQueue: AudioBuffer[] = [];
  private isPlaying = false;
  private outputSampleRate = 24000;

  constructor(apiKey: string, setup: InterviewSetup, onEvent: GeminiLiveEventHandler) {
    this.apiKey = apiKey;
    this.setup = setup;
    this.onEvent = onEvent;
  }

  async connect() {
    const url = `${GEMINI_LIVE_WS_URL}?key=${this.apiKey}`;
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      this.onEvent({ type: "connected" });
      this.sendSetup();
    };

    this.ws.onmessage = async (event) => {
      try {
        const data = typeof event.data === "string" ? JSON.parse(event.data) : await event.data.text().then(JSON.parse);
        await this.handleMessage(data);
      } catch (err) {
        console.error("Failed to parse WS message:", err);
      }
    };

    this.ws.onerror = (err) => {
      this.onEvent({ type: "error", error: "WebSocket connection error" });
    };

    this.ws.onclose = () => {
      this.onEvent({ type: "closed" });
    };

    // Setup audio context for playback
    try {
      this.audioContext = new AudioContext({ sampleRate: this.outputSampleRate });
    } catch {
      this.audioContext = new AudioContext();
    }
  }

  private sendSetup() {
    const systemPrompt = buildInterviewPrompt(this.setup);
    const setupMsg = {
      setup: {
        model: MODEL,
        generation_config: {
          response_modalities: ["AUDIO", "TEXT"],
          speech_config: {
            voice_config: {
              prebuilt_voice_config: { voice_name: "Puck" }
            }
          }
        },
        system_instruction: {
          parts: [{ text: systemPrompt }]
        }
      }
    };
    this.ws?.send(JSON.stringify(setupMsg));
  }

  private async handleMessage(data: Record<string, unknown>) {
    // Setup complete
    if (data.setupComplete !== undefined) {
      this.onEvent({ type: "setup_complete" });
      return;
    }

    // Server content (audio/text from AI)
    if (data.serverContent) {
      const sc = data.serverContent as Record<string, unknown>;

      if (sc.turnComplete) {
        this.onEvent({ type: "turn_complete" });
      }

      if (sc.interrupted) {
        this.onEvent({ type: "interrupted" });
      }

      if (sc.modelTurn) {
        const modelTurn = sc.modelTurn as Record<string, unknown>;
        const parts = (modelTurn.parts as Array<Record<string, unknown>>) || [];

        for (const part of parts) {
          if (part.text && typeof part.text === "string") {
            this.onEvent({ type: "transcript", speaker: "ai", text: part.text });
          }

          if (part.inlineData) {
            const inlineData = part.inlineData as Record<string, unknown>;
            const mimeType = inlineData.mimeType as string;
            const audioData = inlineData.data as string;

            if (mimeType?.startsWith("audio/") && audioData) {
              const sampleRate = this.parseSampleRate(mimeType) || this.outputSampleRate;
              const buffer = base64ToArrayBuffer(audioData);
              const float32 = pcm16ToFloat32(buffer);
              this.onEvent({ type: "audio", data: float32, sampleRate });
              await this.playAudioChunk(float32, sampleRate);
            }
          }
        }
      }
    }

    // Input transcript (what user said, recognized by Gemini)
    if (data.clientContent) {
      const cc = data.clientContent as Record<string, unknown>;
      if (cc.turns) {
        const turns = cc.turns as Array<Record<string, unknown>>;
        for (const turn of turns) {
          if (turn.role === "user") {
            const parts = (turn.parts as Array<Record<string, unknown>>) || [];
            for (const part of parts) {
              if (part.text && typeof part.text === "string") {
                this.onEvent({ type: "transcript", speaker: "user", text: part.text as string });
              }
            }
          }
        }
      }
    }
  }

  private parseSampleRate(mimeType: string): number | null {
    const match = mimeType.match(/rate=(\d+)/);
    return match ? parseInt(match[1]) : null;
  }

  private async playAudioChunk(float32: Float32Array, sampleRate: number) {
    if (!this.audioContext) return;

    const audioBuffer = this.audioContext.createBuffer(1, float32.length, sampleRate);
    audioBuffer.getChannelData(0).set(float32);
    this.audioQueue.push(audioBuffer);

    if (!this.isPlaying) {
      this.playNextChunk();
    }
  }

  private playNextChunk() {
    if (!this.audioContext || this.audioQueue.length === 0) {
      this.isPlaying = false;
      return;
    }

    this.isPlaying = true;
    const buffer = this.audioQueue.shift()!;
    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(this.audioContext.destination);
    source.onended = () => this.playNextChunk();
    source.start();
  }

  sendAudioChunk(float32: Float32Array) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;

    const pcm16Buffer = floatTo16BitPCM(float32);
    const base64 = arrayBufferToBase64(pcm16Buffer);

    const msg = {
      realtimeInput: {
        mediaChunks: [{
          mimeType: "audio/pcm;rate=16000",
          data: base64
        }]
      }
    };

    this.ws.send(JSON.stringify(msg));
  }

  sendText(text: string) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;

    const msg = {
      clientContent: {
        turns: [{ role: "user", parts: [{ text }] }],
        turnComplete: true
      }
    };
    this.ws.send(JSON.stringify(msg));
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    this.audioQueue = [];
    this.isPlaying = false;
  }

  get isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}
