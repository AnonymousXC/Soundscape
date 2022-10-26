import type { NextComponentType } from "next";
import { 
    Flex,
    Text
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import SongInfoBar from "./songInfoBar";
import { useEffect, useState } from "react";



const HomeTab : NextComponentType = () => {

    const [ card1SongURL, setCard1SongURL ] = useState("")
    const [ card1SongDur, setCard1SongDur ] = useState("")
    const [ card1SongTitle, setCard1SongTitle ] = useState("")
    const [ card1SongImg, setCard1SongImg ] = useState("")
    const [ card1SongArtist, setCard1SongArtist ] = useState("")
    const [ renderCards, setRenderCards ] = useState(false)
    const router = useRouter()


    useEffect(() => {
        setCard1SongDur(JSON.parse(localStorage.getItem("last-played") || '{}').songDuration)
        setCard1SongURL(JSON.parse(localStorage.getItem("last-played") || '{}').playURL)
        setCard1SongTitle(JSON.parse(localStorage.getItem("last-played") || '{}').songTitle)
        setCard1SongImg(JSON.parse(localStorage.getItem("last-played") || '{}').songImgUrl)
        setCard1SongArtist(JSON.parse(localStorage.getItem("last-played") || '{}').songArtist)        
        setRenderCards(true)
    }, [])


    return (
        <Flex 
        h={"100%"}
        px={3}
        py={3}
        display={router.query.tab === "Home" || router.query.tab === undefined ? "flex" : "none"}
        direction={"column"}>
            <Text fontSize={"1.2rem"} fontWeight="500">Recently Played</Text>
            <Flex>
            { renderCards &&
            <SongInfoBar 
                key={"key"}
                songImage={card1SongImg}
                songTitle={card1SongTitle}
                songPlayURL={card1SongURL}
                artistName={card1SongArtist}
                songDuration={card1SongDur}
                card={true} />
            }
            </Flex>
        </Flex>
    )
}

export default HomeTab