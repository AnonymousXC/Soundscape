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
import { useRouter } from "next/router";


const Player : NextComponentType = () => {

    const currBR = useBreakpoint()
    const isMobile = currBR === "sm" || currBR === "base" ? true : false
    const [ loopState, setLoopState ] = useState(true)
    const [ downloadLink, setDownloadLink ] = useState("")
    const [ autoplay, setAutoPlay ] = useState(false)
    const router = useRouter()
    
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
        (document.getElementsByTagName("audio")[0] as HTMLAudioElement).src = lastSessionSong.playURL;
        (document.getElementById("artist-name") as HTMLParagraphElement).innerText = lastSessionSong.songArtist; 
        (document.getElementById("song-image") as HTMLImageElement).src = lastSessionSong.songImgUrl;
        (document.getElementById("song-name") as HTMLParagraphElement).innerText = lastSessionSong.songTitle;

        // Song Meta Data
        navigator.mediaSession.metadata = new MediaMetadata({
            title: lastSessionSong.songTitle,
            artist: lastSessionSong.songArtist,
            artwork: [
                {src: lastSessionSong.songImgUrl, sizes:"500x500", type: 'image/png'}
            ]
        })

        // Audio MetaData
        try {
            document.getElementsByTagName("audio")[0].setAttribute("data-curr-song", JSON.stringify(lastSessionSong))
        } catch(err) {}

        let loopBtn = document.getElementsByClassName("rhap_repeat-button")[0]
        loopBtn.addEventListener("click", (e) => {
            localStorage.setItem("loop-check", loopBtn.getAttribute("aria-label") === "Enable loop" ? "true" : "false")
        })

    }

    useEffect(() => {

        navigator.mediaSession.setActionHandler("nexttrack", (e) => {
            playRandomSong()
        })

        navigator.mediaSession.setActionHandler("previoustrack", (e) => {
            document.getElementsByTagName('audio')[0].currentTime = 0;
            
        })

        let isAutoPlay = localStorage.getItem("auto-play")
        if(isAutoPlay === "true") {
            // document.getElementsByTagName("audio")[0].play()
            setAutoPlay(true)            
            localStorage.removeItem("auto-play")
        }
        

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
        let favBtnIcon = document.getElementById("fav-icon-img") as HTMLImageElement
        let favBtnMob = document.getElementById("fav-icon-mob-img") as HTMLImageElement
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
                <Flex w={"100%"} justifyContent="space-between" pr={1}>
                    <Text id="artist-name" className="artist-name-cl" fontSize={"0.8rem"} color="#979797">Imagine Dragons</Text>
                    <Button variant={"unstyled"} key="share-desktop"
                    onClick={() => {
                        shareCurrentSong()
                    }}>
                        <Image src="images/icons/Share Icon.svg" w={"20px"} />
                    </Button>
                </Flex>
            </Flex>

            <AudioPlayer
            onEnded={() => {
                playRandomSong()
            }}
            autoPlay={autoplay}
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
                    
                ] : [ 
                    RHAP_UI.LOOP,
                    <Button variant={"unstyled"} mx={1} key="lyrics-asdjknddf"
                    onClick={() => {
                        router.push("/?tab=Lyrics", undefined, {shallow : true})
                    }}>
                        <Image src="images/icons/Mic Icon Mobile.svg" w={"24px"} />
                    </Button>,
                    // <Button variant={"unstyled"} key="share-desktop"
                    // onClick={() => {
                    //     shareCurrentSong()
                    // }}>
                    //     <Image src="images/icons/Share Icon.svg" w={"24px"} />
                    // </Button>
                 ]
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
            customVolumeControls={
                [
                    <Button variant={"unstyled"} mx={1} key="lyrics-sadhjaasavd-asd"
                    onClick={() => {
                        router.push("/?tab=Lyrics", undefined, {shallow : true})
                    }}>
                        <Image src="images/icons/Mic Icon.svg" w={"28px"} />
                    </Button>,
                    RHAP_UI.VOLUME
                ]
            }
            src={""}
            loop={loopState}
            onClickNext={() => {
                playRandomSong()
            }}
            onClickPrevious={() => {
                document.getElementsByTagName("audio")[0].currentTime = 0
            }}
            />
        </Flex>
    )
}


function addCurrentSongToFav() {
    let preFavArr = JSON.parse(localStorage.getItem("Fav-Arr") || '[]')
    let currFavToAdd = JSON.parse(document.getElementsByTagName("audio")[0].getAttribute("data-curr-song") || '[]')
    let favBtnIcon = document.getElementById("fav-icon-img") as HTMLImageElement
    let favBtnMob = document.getElementById("fav-icon-mob-img") as HTMLImageElement

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


function shareCurrentSong() {
        
    const currSongData = JSON.parse(document.getElementsByTagName("audio")[0].getAttribute("data-curr-song") || '{}')    
    try {
        navigator.share({
            title: currSongData.songTitle,
            text: "Listen it.",
            url: `${window.location.origin}/track/${currSongData.songID}`
        })
        return;
    } catch(err) {
        navigator.clipboard.writeText(`${window.location.origin}/track/${currSongData.songID}`)
        alert("Link Copied to Clipboard.")
    }
}


export default Player;