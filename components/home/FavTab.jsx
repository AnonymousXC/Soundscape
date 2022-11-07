import { 
    Flex,
    Text,
    useBreakpoint
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { addRecentPlayFromDatabase } from "./HomeTab"
import SongInfoBar from "./songInfoBar"



const LikedTab = () => {

    const currBR = useBreakpoint()
    const isMobile = currBR === "sm" || currBR === "base" ? true : false  
    const [ cardsMetaArray, setCardsMetaArray ] = useState([])

    function addCards(recentPlayedArray) {
        let nextJSCardsComp = []
        recentPlayedArray.reverse().forEach((ele, idx) => {
            if(!ele.songID) return;
            nextJSCardsComp.push(
                <SongInfoBar 
                key={idx}
                songImage={ele.songImgUrl}
                songTitle={ele.songTitle}
                songPlayURL={ele.playURL}
                artistName={ele.songArtist}
                songDuration={ele.songDuration}
                songID={ele.songID}
                card={true} />
            )
        })
        setCardsMetaArray(nextJSCardsComp)
    }

    useEffect(() => {

        if(localStorage.getItem("userID"))
        {
            addRecentPlayFromDatabase().then(data => {
                addCards(data.favSongs)
                localStorage.setItem("Fav-Arr", JSON.stringify(data.favSongs))
            })
            
            return
        }

        let favArr = JSON.parse(localStorage.getItem("Fav-Arr") || '[]')       
        addCards(favArr)
    }, [])



    return (
        <Flex 
        direction={"column"}
        h={isMobile ? "calc(100vh - (90px + 48px + 50px))" : "calc(100% - 35px)"}
        py={4}
        pb={0}
        pl={4}>
            <Text fontSize={"1.2rem"} fontWeight="500" pb={2}>Liked Songs</Text>
            <Flex
            w={"100%"}
            h={"100%"}
            flexWrap="wrap"
            overflowY={"auto"}>
                { cardsMetaArray }
            </Flex>
        </Flex>
    )
}

export default LikedTab