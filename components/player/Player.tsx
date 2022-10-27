import type { NextComponentType } from "next";
import AudioPlayer, {RHAP_UI} from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import {
    Button,
    Flex,
    Image,
    Text,
} from "@chakra-ui/react"
import { useEffect } from "react";


const Player : NextComponentType = () => {

    useEffect(() => {
        let lastSessionSong : any = JSON.parse(localStorage.getItem("last-played") || '{}')
        if(!lastSessionSong.songTitle || !lastSessionSong.songTitle || !lastSessionSong.songTitle)
        {
            document.getElementById("song-name")!.innerHTML = "CV"
            document.getElementById("artist-name")!.innerHTML = "Welcome"     
            return
        }
        document.getElementsByTagName("audio")[0].src = lastSessionSong.playURL    
        document.getElementById("song-name")!.innerHTML = lastSessionSong.songTitle
        document.getElementById("artist-name")!.innerHTML = lastSessionSong.songArtist 
    }, [])

    return (
        <Flex
        id="player"
        className="music-player"
        w={"100vw"}
        h={"90px"}
        backgroundColor="#10141F">
            <Flex 
            id="song-details"
            w={"30%"} 
            flexDirection="column"
            px={8} fontSize="0.9rem"
            pt={4}>
                <Flex className="wrapper" w={"100%"} justifyContent="space-between">
                    <Text id="song-name" className="song-name-cl">Bad Liar</Text>
                    <Button 
                    variant={"unstyled"}
                    pt={2}
                    w={"min-content"}
                    h={"min-content"} ><Image src="images/icons/Non Fav Music Icon.svg" w={"4"} /></Button>
                </Flex>
                <Flex w={"100%"}>
                    <Text id="artist-name" className="artist-name-cl" fontSize={"0.8rem"} color="#979797">Imagine Dragons</Text>
                </Flex>
            </Flex>

            <AudioPlayer
            defaultCurrentTime="00:00"
            defaultDuration="00:00"
            layout="stacked-reverse"
            showSkipControls={true}
            showFilledVolume={true}
            autoPlayAfterSrcChange={true}
            customIcons={
                {
                    previous: <Image src="images/icons/Previous Music Icon.svg" className="player-btn" rounded={29.5}></Image>,
                    next: <Image src="images/icons/Next Music Icon.svg" className="player-btn" rounded={29.5}></Image>,
                    forward: <Image src="images/icons/Forward Music Icon.svg" className="player-btn" rounded={29.5}></Image>,
                    rewind: <Image src="images/icons/Backward Music Icon.svg" className="player-btn" rounded={29.5}></Image>,
                    play: <Image src="images/icons/Pause Music Icon.svg" className="player-btn" rounded={29.5}></Image>,
                    pause: <Image src="images/icons/Play Music Icon.svg" className="player-btn" rounded={29.5}></Image>,
                    loop: <Image src="images/icons/Loop Music Icon.svg"></Image>,
                    loopOff: <Image src="images/icons/Loop Off Music Icon.svg"></Image>,
                    volume: <Image src="images/icons/Volume Music Icon.svg" ></Image>,
                    volumeMute: <Image src="images/icons/Volume Mute Icon.svg"></Image>,
                }
            }
            src={""}
            />
        </Flex>
    )
}


export default Player;