export {};

declare global {
    interface Window {
        audioContext: MediaElementAudioSourceNode;
        ReactNativeWebView?: any;
        pauseSongRN?: any;
        playSongRN?: any;
        addFavourite?: any;
        changeSong?: any;
        openSongPage: any;
    }
}
