"use client";
import React, { RefObject } from "react";

interface Props {
    audio: RefObject<HTMLAudioElement>;
}

class KeyBinding extends React.Component<Props> {
    componentDidMount(): void {
        document.onkeydown = (_event: KeyboardEvent) => {
            // @ts-expect-error
            if (_event.target.tagName == "INPUT") return;

            if (_event.keyCode === 32) {
                if (_event.repeat) return;
                _event.preventDefault();
                if (this.props.audio.current?.paused === true)
                    this.props.audio.current?.play();
                else this.props.audio.current?.pause();
            } else if (_event.code === "ArrowRight") {
                if (this.props.audio.current)
                    this.props.audio.current.currentTime += 5;
            } else if (_event.code === "ArrowLeft") {
                if (this.props.audio.current)
                    this.props.audio.current.currentTime -= 5;
            } else if (_event.code === "ArrowUp") {
                if (
                    this.props.audio.current &&
                    this.props.audio.current.volume < 0.9
                )
                    this.props.audio.current.volume += 0.1;
            } else if (_event.code === "ArrowDown") {
                if (
                    this.props.audio.current &&
                    this.props.audio.current.volume > 0.1
                )
                    this.props.audio.current.volume -= 0.1;
            } else if (_event.code === "KeyL") {
                if (this.props.audio.current)
                    this.props.audio.current.currentTime += 10;
            } else if (_event.code === "KeyJ") {
                if (this.props.audio.current)
                    this.props.audio.current.currentTime -= 10;
            } else if (_event.code === "KeyK") {
                if (_event.repeat) return;
                if (this.props.audio.current?.paused === true)
                    this.props.audio.current?.play();
                else this.props.audio.current?.pause();
            }
        };
    }

    render(): React.ReactNode {
        return null;
    }
}

export default KeyBinding;
