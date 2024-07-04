export {};

declare global {
  interface Window {
    audioContext: MediaElementAudioSourceNode;
    ReactNativeWebView?: any;
    togglePlay?: any,
  }
}