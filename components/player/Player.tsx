import type { NextComponentType } from "next";
import AudioPlayer from 'react-h5-audio-player';
import { RHAP_UI } from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';
import {
    Button,
    Flex,
    Image,
    Text,
    useBreakpoint, 
    Link
} from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { addRecentPlayFromDatabase } from "../home/HomeTab";
import { pushFavSongToDB } from "../../.firebase/miscellaneous";
import { playRandomSong } from "../../miscellaneous/playRandomSong";


const Player : NextComponentType = () => {

    const currBR = useBreakpoint()
    const isMobile = currBR === "sm" || currBR === "base" ? true : false
    const [ loopState, setLoopState ] = useState(true)
    const [ downloadLink, setDownloadLink ] = useState("")
    
    function configurePlayer(lastSession : any) {
        let lastSessionSong : any = lastSession[lastSession.length - 1]
        
        let isLoop : any = localStorage.getItem("loop-check") === "true"
        setLoopState(isLoop)

        if(!lastSessionSong) return;
        
        if(!lastSessionSong.songTitle || !lastSessionSong.songTitle || !lastSessionSong.songTitle)
        {
            document.getElementById("song-name")!.innerText = "CV"
            document.getElementById("artist-name")!.innerText = "Welcome"
            document.getElementById("win-title")!.innerText = "Soundscape : Welcome"
            return
        }
        document.getElementsByTagName("audio")[0].src = lastSessionSong.playURL    
        document.getElementById("song-name")!.innerText = lastSessionSong.songTitle
        document.getElementById("artist-name")!.innerText = lastSessionSong.songArtist 
        document.getElementById("win-title")!.innerText = "Soundscape : " + lastSessionSong.songTitle
        document.getElementById("song-image")!.src = lastSessionSong.songImgUrl

        let loopBtn = document.getElementsByClassName("rhap_repeat-button")[0]
        loopBtn.addEventListener("click", (e) => {
            localStorage.setItem("loop-check", loopBtn.getAttribute("aria-label") === "Enable loop" ? "true" : "false")
        })

    }

    useEffect(() => {

        if(localStorage.getItem("userID"))
        {
            addRecentPlayFromDatabase().then(data => {
                configurePlayer(data?.recentPlays)
                return;
            })
        }

        let lastSession : any = JSON.parse(localStorage.getItem("recent-played") || '{}')
        configurePlayer(lastSession)

        let favArr = JSON.parse(localStorage.getItem("Fav-Arr") || '[]')
        let favBtnIcon = document.getElementById("fav-icon-img")
        let favBtnMob = document.getElementById("fav-icon-mob-img")
        for (let i = 0; i < favArr.length; i++) {
            const el = favArr[i];
            if(el.songID === lastSession[lastSession.length - 1].songID)
            {
                try {
                    favBtnIcon.src = "images/icons/Fav Icon.svg"
                    favBtnMob.src = "images/icons/Fav Icon.svg"
                    break;
                } catch {}
            }
            else
            {
                try {
                    favBtnIcon.src = "images/icons/Non Fav Music Icon.svg"
                    favBtnMob.src = "images/icons/Non Fav Music Icon.svg"
                } catch {}
            }
        }
    }, [])

    return (
        <Flex
        id="player"
        className="music-player"
        w={isMobile === true ? "100%" : "100vw"}
        h={"90px"}
        position={'fixed'}
        bottom={isMobile === true ? "calc(0% + 50px)" : "initial"}
        backgroundColor="#10141F"
        zIndex={5}>
            <Flex 
            id="song-details"
            w={"30%"} 
            display={isMobile === true ? "none" : "flex"}
            flexDirection="column"
            px={8} fontSize="0.9rem"
            pt={4}>
                <Flex className="wrapper" w={"100%"} justifyContent="space-between">
                    <Text id="song-name" className="song-name-cl">Welcome</Text>
                    <Button 
                    variant={"unstyled"}
                    pt={2}
                    w={"min-content"}
                    h={"min-content"}
                    onClick={() => {
                        addCurrentSongToFav()
                    }} ><Image src="images/icons/Non Fav Music Icon.svg" w={"4"} id="fav-icon-img" alt="" /></Button>
                </Flex>
                <Flex w={"100%"}>
                    <Text id="artist-name" className="artist-name-cl" fontSize={"0.8rem"} color="#979797">Imagine Dragons</Text>
                </Flex>
            </Flex>

            <AudioPlayer
            onEnded={() => {
                playRandomSong()
            }}
            defaultCurrentTime="00:00"
            defaultDuration="00:00"
            layout="stacked-reverse"
            showSkipControls={!isMobile}
            showFilledVolume={true}
            autoPlayAfterSrcChange={true}
            customAdditionalControls={
                isMobile === false ?
                [
                    RHAP_UI.LOOP,
                    <Link href={downloadLink} download={true} key="asdasd"
                    onClick={() => {
                        setDownloadLink(document.getElementsByTagName("audio")[0].src)
                    }}>
                        <Image src="images/icons/Download Icon.svg" w={"31px"} fill="#fff" alt="" />
                    </Link>
                    
                ] : [ RHAP_UI.LOOP ]
            }
            customControlsSection={
                isMobile ? [
                    RHAP_UI.ADDITIONAL_CONTROLS,
                    RHAP_UI.MAIN_CONTROLS,
                    <Flex width={"33%"} justifyContent="flex-end" key="asvhjuh-551">
                    <Button variant="unstyled" display={"flex"} justifyContent="center" alignItems={"center"} key="fdshbsdfkkams"
                    onClick={() => {
                        addCurrentSongToFav()
                    }}>
                        <Image src="images/icons/Non Fav Music Icon.svg" w={"23px"} id="fav-icon-mob-img" alt=""/>
                    </Button>

                    <Link href={downloadLink} download={true} display="flex" justifyContent={"flex-end"} alignItems="center"
                    onClick={() => {
                        setDownloadLink(document.getElementsByTagName("audio")[0].src)
                    }}>
                        <Image src="images/icons/Download Icon.svg" w={"27px"} fill="#fff" alt="" />
                    </Link>

                    </Flex>
                ] : [
                    RHAP_UI.ADDITIONAL_CONTROLS,
                    RHAP_UI.MAIN_CONTROLS,
                    RHAP_UI.VOLUME_CONTROLS
                ]
            }
            customIcons={
                {
                    previous: <Image src="images/icons/Previous Music Icon.svg" className="player-btn" rounded={29.5} alt="" ></Image>,
                    next: <Image src="images/icons/Next Music Icon.svg" className="player-btn" rounded={29.5} alt="" ></Image>,
                    forward: <Image src="images/icons/Forward Music Icon.svg" className="player-btn" rounded={29.5} alt="" ></Image>,
                    rewind: <Image src="images/icons/Backward Music Icon.svg" className="player-btn" rounded={29.5} alt=""></Image>,
                    play: <Image src="images/icons/Pause Music Icon.svg" className="player-btn" rounded={29.5} alt="" ></Image>,
                    pause: <Image src="images/icons/Play Music Icon.svg" className="player-btn" rounded={29.5} alt="" ></Image>,
                    loop: <Image src="images/icons/Loop Music Icon.svg" alt="" ></Image>,
                    loopOff: <Image src="images/icons/Loop Off Music Icon.svg" alt="" ></Image>,
                    volume: <Image src="images/icons/Volume Music Icon.svg" alt="" ></Image>,
                    volumeMute: <Image src="images/icons/Volume Mute Icon.svg" alt="" ></Image>,
                }
            }
            src={""}
            loop={loopState}
            />
        </Flex>
    )
}


function addCurrentSongToFav() {
    let preFavArr = JSON.parse(localStorage.getItem("Fav-Arr") || '[]')
    let currFavToAdd = JSON.parse(document.getElementsByTagName("audio")[0].getAttribute("data-curr-song") || '[]')
    let favBtnIcon = document.getElementById("fav-icon-img")
    let favBtnMob = document.getElementById("fav-icon-mob-img")

    for(let i = 0; i < preFavArr.length; i++)
        if(preFavArr[i].songID === currFavToAdd.songID)
            {
                preFavArr.splice(i, 1)
                if(favBtnMob)
                    favBtnMob.src = "images/icons/Non Fav Music Icon.svg"
                if(favBtnIcon)
                    favBtnIcon.src = "images/icons/Non Fav Music Icon.svg"
                localStorage.setItem("Fav-Arr", JSON.stringify(preFavArr))
                pushFavSongToDB()
                return;
            }
    
    if(favBtnIcon)
        favBtnIcon.src = "images/icons/Fav Icon.svg"
    if(favBtnMob)
        favBtnMob.src = "images/icons/Fav Icon.svg"
    preFavArr.push(currFavToAdd)
    localStorage.setItem("Fav-Arr", JSON.stringify(preFavArr))
    pushFavSongToDB()
}

// function downloadCurrSong() {
//     let songURL = document.getElementsByTagName("audio")[0].src
//     const linkEl = document.createElement("a")
//     linkEl.href = songURL
//     linkEl.download = "true"
//     document.body.append(linkEl)
//     linkEl.click()
//     // document.removeChild(linkEl)
// }


export default Player;