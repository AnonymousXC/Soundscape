export {};

declare global {
    interface Window {
        audioContext: MediaElementAudioSourceNode;
        ReactNativeWebView?: any;
        pauseSongRN?: any;
        playSongRN?: any;
        getSuggestion?: any;
        changeSong?: any;
    }
}
