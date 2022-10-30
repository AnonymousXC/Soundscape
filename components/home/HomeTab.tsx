import type { NextComponentType } from "next";
import { 
    Flex,
    Text,
    useBreakpoint
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import SongInfoBar from "./songInfoBar";
import { useEffect, useState } from "react";



const HomeTab : NextComponentType = () => {

    const currBR = useBreakpoint()
    const isMobile = currBR === "sm" || currBR === "base" ? true : false  

    const [ cardsMetaArray, setCardsMetaArray ] = useState([])
    const router = useRouter()


    useEffect(() => {
        let recentPlayedArray = JSON.parse(localStorage.getItem("recent-played") || '[]')
        
        let nextJSCardsComp : any = []
        recentPlayedArray.reverse().forEach((ele : any, idx : number) => {
            nextJSCardsComp.push(
                <SongInfoBar 
                key={idx}
                songImage={ele.songImgUrl}
                songTitle={ele.songTitle}
                songPlayURL={ele.playURL}
                artistName={ele.songArtist}
                songDuration={ele.songDuration}
                card={true} />
            )
        })
        setCardsMetaArray(nextJSCardsComp)

    }, [])


    return (
        <Flex 
        h={isMobile === true ? "calc(100vh - (90px + 48px + 50px))" : "100%"}
        px={3}
        py={3}
        display={router.query.tab === "Home" || router.query.tab === undefined ? "flex" : "none"}
        direction={"column"}
        overflowY="auto">
            <Text fontSize={"1.2rem"} fontWeight="500">Recently Played</Text>
            <Flex wrap={"wrap"} height="100%">
                {cardsMetaArray}
            </Flex>
        </Flex>
    )
}

export default HomeTab