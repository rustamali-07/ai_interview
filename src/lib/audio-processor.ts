/**
 * Audio processor utilities for mic capture and PCM16 conversion
 * Converts Float32 audio samples to 16-bit PCM base64 for Gemini Live API
 */

export function floatTo16BitPCM(float32Array: Float32Array): ArrayBuffer {
  const buffer = new ArrayBuffer(float32Array.length * 2);
  const view = new DataView(buffer);
  for (let i = 0; i < float32Array.length; i++) {
    const s = Math.max(-1, Math.min(1, float32Array[i]));
    view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return buffer;
}

export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

export function pcm16ToFloat32(pcm16Buffer: ArrayBuffer): Float32Array {
  const dataView = new DataView(pcm16Buffer);
  const float32Array = new Float32Array(pcm16Buffer.byteLength / 2);
  for (let i = 0; i < float32Array.length; i++) {
    const int16 = dataView.getInt16(i * 2, true);
    float32Array[i] = int16 / 32768.0;
  }
  return float32Array;
}

export async function createAudioContext(sampleRate = 16000): Promise<AudioContext> {
  const AudioContextClass =
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext ||
    AudioContext;
  return new AudioContextClass({ sampleRate });
}

export async function resampleAudio(
  audioBuffer: AudioBuffer,
  targetSampleRate: number
): Promise<Float32Array> {
  const offlineCtx = new OfflineAudioContext(
    1,
    Math.ceil((audioBuffer.duration * targetSampleRate)),
    targetSampleRate
  );
  const source = offlineCtx.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(offlineCtx.destination);
  source.start(0);
  const rendered = await offlineCtx.startRendering();
  return rendered.getChannelData(0);
}
