import type { NextComponentType } from "next";
import { 
    Flex,
    Text
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import SongInfoBar from "./songInfoBar";
import { useEffect, useState } from "react";



const HomeTab : NextComponentType = () => {

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
        h={"100%"}
        px={3}
        py={3}
        display={router.query.tab === "Home" || router.query.tab === undefined ? "flex" : "none"}
        direction={"column"}
        overflowY="auto">
            <Text fontSize={"1.2rem"} fontWeight="500">Recently Played</Text>
            <Flex wrap={"wrap"}>
                {cardsMetaArray}
            </Flex>
        </Flex>
    )
}

export default HomeTab