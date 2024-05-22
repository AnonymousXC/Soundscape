export {};

declare global {
  interface Window {
    audioContext: MediaElementAudioSourceNode;
  }
}