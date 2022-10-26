import type { NextComponentType } from "next";
import {
    Flex,
    Text,
    Image,
    Button
} from "@chakra-ui/react"
import { useEffect, useState } from "react";

interface songProps {
    songImage: string,
    songTitle: string,
    songDuration: string,
    artistName: string,
    songPlayURL: string,
}



const SongInfoBar : NextComponentType<any> = (props : any)  => {

    let [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        let audio = document.getElementsByTagName("audio")[0]
        if(audio.paused === false && audio.src === props.songPlayURL)
            setIsPlaying(true)
        audio.addEventListener("play", (e) => {
            if(audio.src === props.songPlayURL)
                setIsPlaying(true)
        })
    }, [])

    setInterval(() => {
        let audio = document.getElementsByTagName("audio")[0]
        if(audio.src !== props.songPlayURL)
            setIsPlaying(false)
        if(audio.paused === true)
            setIsPlaying(false)
    }, 1000)

    return (
        <Flex
        w={"98%"}
        h={"50px"}
        rounded={8}
        justifyContent="space-between"
        mt={2}
        px={2}
        py={3}
        alignItems="center"
        backgroundColor={"rgba(0,0,0,0.2)"}
        color="rgba(255,255,255,0.8)">
            <Image src={props.songImage} alt="songicon" width={"40px"} height="40px" rounded={6} mx={4} my="auto" loading="lazy" />
            <Flex justifyContent={"space-between"} h={"100%"} w={"70%"} alignItems="center">
                <Text w={"50%"}>{props.songTitle}</Text>
                <Text>{props.artistName}</Text>
                <Text>{props.songDuration}</Text>
            </Flex>
            <Button variant={"unstyled"}
            onClick={() => {
                
                let audio = document.getElementsByTagName("audio")[0]

                if(audio.paused === false && audio.src === props.songPlayURL)
                {
                    setIsPlaying(false)
                    audio.pause()
                    return
                }

                if(audio.src === props.songPlayURL && audio.paused === true)
                {
                    audio.play()
                    setIsPlaying(true)
                    return;
                }
                

                let imageSong = document.getElementById("song-image")
                let songName = document.getElementById("song-name")
                let artistNameEl = document.getElementById("artist-name")
                audio.src = props.songPlayURL
                audio.play().catch((error) => {}) 
                imageSong.src! = props.songImage
                songName!.innerHTML = props.songTitle
                artistNameEl!.innerHTML = props.artistName
                setIsPlaying(true)

                localStorage.setItem("last-played", JSON.stringify({
                    "songImgUrl" : props.songImage,
                    "songTitle" : props.songTitle,
                    "songDuration" : props.songDuration,
                    "songArtist" : props.artistName,
                    "playURL" : props.songPlayURL
                }))

            }}>
                <Image src={isPlaying ? "images/icons/Play Music Icon.svg" : "images/icons/Pause Music Icon.svg"} w={"40px"} className="player-btn" rounded={29.5} />
            </Button>
        </Flex>
    )
}


export default SongInfoBar