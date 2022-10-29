import type { NextComponentType } from "next";
import {
    Flex,
    Text,
    Image,
    Button,
    useBreakpoint
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

    const currBR = useBreakpoint()
    const isMobile = currBR === "sm" || currBR === "base" ? true : false

    let [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        let audio = document.getElementsByTagName("audio")[0]
        if(audio.src === props.songPlayURL && audio.paused !== true) setIsPlaying(true)
        audio.addEventListener("play", (e) => {
            if(audio.src === props.songPlayURL)
                setIsPlaying(true)
                
        })

        audio.addEventListener("pause", () => {
            setIsPlaying(false)
        })

    }, [])

    setInterval(() => {
        let audio = document.getElementsByTagName("audio")[0]
 
        if(audio.src != props.songPlayURL || audio.paused === true)
            setIsPlaying(false)

    }, 1500)

    return (
        <Flex
        w={isMobile === false ? props.card === true ? ["18%", "18%", "22%", "18%"] : "98%" :  props.card === true ? "40%" : "95%"}
        h={props.card === true ? "100%"  :"50px"}
        maxW={props.card === true ? "205px" : ""}
        maxH={props.card === true ? "270px" : ""}
        rounded={8}
        justifyContent="space-between"
        mt={2}
        px={2}
        py={3}
        ml={props.card === true ? 4 : 0}
        mb={props.card === true ? 8 : 0}
        alignItems="center"
        backgroundColor={"rgba(0,0,0,0.2)"}
        color="rgba(255,255,255,0.8)"
        direction={props.card === true ? "column" : "row"}>
            <Image src={props.songImage} alt="songicon" width={props.card === true ? "90%" : "40px"} height={props.card === true ? "auto" : "40px"} rounded={6} mx={4} loading="lazy" />
            <Flex justifyContent={"space-between"} h={"100%"} w={props.card === true ? "100%" : "70%"} alignItems={props.card === true ? "center" : "center"}
            direction={props.card === true ? "column" : "row"}>
                <Text w={isMobile === false ? props.card === true ? "100%" : "50%" : "95%"} textAlign={props.card === true ? "center" : "initial"}>{props.songTitle}</Text>
                <Text fontSize={props.card === true ? "0.8rem" : ""} color={props.card === true ? "#747474" : ""}>{isMobile === false && props.artistName}</Text>
                <Text>{props.card === true || isMobile === true ? "" :  props.songDuration}</Text>
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
                if(imageSong && songName && artistNameEl)
                {
                    imageSong.src! = props.songImage
                    songName!.innerText = props.songTitle
                    artistNameEl!.innerText = props.artistName
                }
                setIsPlaying(true)
                document.getElementById("win-title")!.innerText = "Soundscape : " + props.songTitle
                // document.getElementById("site-icon")!.href = props.songImage

                let musicDataToSave = {
                    "songImgUrl" : props.songImage,
                    "songTitle" : props.songTitle,
                    "songDuration" : props.songDuration,
                    "songArtist" : props.artistName,
                    "playURL" : props.songPlayURL
                }

                localStorage.setItem("last-played", JSON.stringify(musicDataToSave))

                let recentPlayedArray : any = JSON.parse(localStorage.getItem("recent-played") || '[]')

                recentPlayedArray.forEach((ele : any, idx : number) => {
                    if(JSON.stringify(ele) === JSON.stringify(musicDataToSave))
                        {
                            recentPlayedArray.splice(idx, 1)
                            return
                        }
                })

                recentPlayedArray.push(musicDataToSave)
                localStorage.setItem("recent-played", JSON.stringify(recentPlayedArray))
    
            }}>
                <Image src={isPlaying ? "images/icons/Play Music Icon.svg" : "images/icons/Pause Music Icon.svg"} w={"40px"} className="player-btn" rounded={29.5} />
            </Button>
        </Flex>
    )
}


export default SongInfoBar