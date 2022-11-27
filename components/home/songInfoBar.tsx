import type { NextComponentType } from "next";
import {
    Flex,
    Text,
    Image,
    Button,
    useBreakpoint
} from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { pushRecentPlayedToDB } from "../../.firebase/miscellaneous"
import { useRouter } from "next/router";

interface SongProps {
    songImage : string,
    songTitle : string,
    songPlayURL : string,
    artistName : string,
    songDuration : string,
    songID : string,
    card : boolean,
}


const SongInfoBar : NextComponentType<SongProps> = (props : SongProps)  => {

    const currBR = useBreakpoint()
    const isMobile = currBR === "sm" || currBR === "base" ? true : false
    const router = useRouter()


    let [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        let audio = document.getElementsByTagName("audio")[0]
        if(!audio) return;
            
        if(JSON.parse(document.getElementsByTagName("audio")[0].getAttribute("data-curr-song") || '{}').songID === props.songID && audio.paused === false) 
            setIsPlaying(true)
        else 
            setIsPlaying(false)
        
        audio.addEventListener("play", (e) => {
            if(JSON.parse(document.getElementsByTagName("audio")[0].getAttribute("data-curr-song") || '{}').songID === props.songID)
                setIsPlaying(true)
            else
                setIsPlaying(false)
        })

        audio.addEventListener("pause", () => {
            setIsPlaying(false)
        })

    }, [props.songID])


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
        direction={props.card === true ? "column" : "row"}
        onClick={() => {
            sessionStorage.setItem("songClicked", JSON.stringify(props))
            router.push("/?tab=Detail", undefined, { shallow : true })
        }}
        cursor="pointer" >
            <Image src={props.songImage} alt="" width={props.card === true ? "90%" : "40px"} height={props.card === true ? "auto" : "40px"} rounded={6} mx={4} loading="lazy" className="songBarImage" />
            <Flex justifyContent={"space-between"} h={"100%"} w={props.card === true ? "100%" : "70%"} alignItems={props.card === true ? "center" : "center"}
            direction={props.card === true ? "column" : "row"} minH={isMobile ? "40px" : "65px"} textOverflow="ellipsis">
                <Text w={isMobile === false ? props.card === true ? "100%" : "50%" : "95%"} textAlign={props.card === true ? "center" : "initial"}  height={props.card ? "25px" : "initial"} overflow={props.card ? "hidden" : "auto"} >{props.songTitle}</Text>
                <Text fontSize={props.card === true ? "0.8rem" : ""} color={props.card === true ? "#747474" : ""} textOverflow="ellipsis"overflow={"hidden"} h="20px" >{isMobile === false ? props.artistName : props.card === true ? props.artistName : ""}</Text>
                <Text>{props.card === true || isMobile === true ? "" :  props.songDuration}</Text>
            </Flex>
            <Button variant={"unstyled"} zIndex={100} cursor="default" className="playing-current"
            onClick={(e) => {
                
                e.stopPropagation()

                let audio = document.getElementsByTagName("audio")[0]
                
                // Pausing if playing and same song
                // if(audio.paused === false && audio.src === props.songPlayURL)
                if(isPlaying === true)
                {
                    setIsPlaying(false)
                    audio.pause()
                    return
                }

                // Playing if paused and same song
                if(audio.src === props.songPlayURL && audio.paused === true)
                {
                    audio.play()
                    setIsPlaying(true)
                    return;
                }

                // Changing The Song
                let imageSong = document.getElementById("song-image") as HTMLImageElement
                let songName = document.getElementById("song-name")
                let artistNameEl = document.getElementById("artist-name")
                audio.src = props.songPlayURL
                audio.play().catch((e) => {} ) 
                if(imageSong && songName && artistNameEl)
                {
                    imageSong.src! = props.songImage
                    songName!.innerText = props.songTitle
                    artistNameEl!.innerText = props.artistName
                }
                setIsPlaying(true)

                // Song Meta Data
                navigator.mediaSession.metadata = new MediaMetadata({
                    title: props.songTitle,
                    artist: props.artistName,
                    artwork: [
                        {src: props.songImage, sizes:"500x500", type: 'image/png'}
                    ]
                })

                // Data to save
                let musicDataToSave = {
                    "songImgUrl" : props.songImage,
                    "songTitle" : props.songTitle,
                    "songDuration" : props.songDuration,
                    "songArtist" : props.artistName,
                    "playURL" : props.songPlayURL,
                    "songID" : props.songID
                }

                // Saving the data
                let recentPlayedArray : any = JSON.parse(localStorage.getItem("recent-played") || '[]')

                recentPlayedArray.forEach((ele : any, idx : number) => {
                    if(ele.songID === musicDataToSave.songID)
                        {
                            recentPlayedArray.splice(idx, 1)
                            return
                        }
                })

                // Checking if favourite song
                let favArr = JSON.parse(localStorage.getItem("Fav-Arr") || '[]')
                let favBtnIcon = document.getElementById("fav-icon-img") as HTMLImageElement
                let favBtnMob = document.getElementById("fav-icon-mob-img") as HTMLImageElement
                for (let i = 0; i < favArr.length; i++) {
                    const el = favArr[i];
                    if(el.songID === props.songID)
                    {
                        if(favBtnIcon)
                            favBtnIcon.src = "images/icons/Fav Icon.svg"
                        if(favBtnMob)
                            favBtnMob.src = "images/icons/Fav Icon.svg"
                        break;
                    }
                    else
                    {
                        try {
                            favBtnIcon.src = "images/icons/Non Fav Music Icon.svg"
                            favBtnMob.src = "images/icons/Non Fav Music Icon.svg"
                        } catch {}
                    }
                }

                audio.setAttribute("data-curr-song", JSON.stringify(musicDataToSave))
                recentPlayedArray.push(musicDataToSave)
                localStorage.setItem("recent-played", JSON.stringify(recentPlayedArray))            
                
                
                pushRecentPlayedToDB()
            }}>
                <Image src={isPlaying ? "images/icons/Play Music Icon.svg" : "images/icons/Pause Music Icon.svg"} w={"40px"} className="player-btn" rounded={29.5} alt="" />
            </Button>
        </Flex>
    )
}



export default SongInfoBar