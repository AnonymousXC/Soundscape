import { 
    Flex,
    Text,
    Divider,
    useBreakpoint,
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
        recentPlayedArray.forEach((el, idx) => {
                var val = fetchSong(el.songID)
                nextJSCardsComp.push(
                <SongInfoBar 
                    songImage={val.image[2].link}
                    songTitle={val.name}
                    songPlayURL={val.downloadUrl[4].link}
                    artistName={val.primaryArtists}
                    songDuration={444}
                    songID={val.id}
                    card={true}/>
                )
                setCardsMetaArray(nextJSCardsComp)
            })
    }

    // useEffect(() => {

    //     if(localStorage.getItem("userID"))
    //     {
    //         addRecentPlayFromDatabase().then(data => {
    //             addCards(data.favSongs)
    //             localStorage.setItem("Fav-Arr", JSON.stringify(data.favSongs))
    //         })
            
    //         return
    //     }

    //     let favArr = JSON.parse(localStorage.getItem("Fav-Arr") || '[]')       
    //     addCards(favArr)
    // }, [])



    return (
        <Flex 
        direction={"column"}
        h={isMobile ? "calc(var(--mobile-height) - (90px + 48px + 50px))" : "calc(100% - 35px)"}
        py={4}
        pb={0}
        pl={4}>
            <Text fontSize={"1.2rem"} fontWeight="500" pb={2}>Liked Songs</Text>
            <Divider />
            <Flex
            w={"100%"}
            h={"100%"}
            flexWrap="wrap"
            overflowY={"auto"}
            id="liked-cards-el">
                { <Loading /> }
            </Flex>
        </Flex>
    )
}

const Loading = () => {
    return (
        <Flex h={"60vh"} w={"full"} justifyContent={"center"} alignItems={"center"}>
            <Text fontSize={"1.6rem"}>Loading...</Text>
        </Flex>
    )
}

function fetchSong(id) {
    const rawData = fetch(`${window.location.origin}/api/fetchSongData`, {
        body: JSON.stringify({
            songDataID : id,
        }),
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
    })
    .then((val) => {
        val.json()
        .then((value) => {
            return value
        })
    })
}


export default LikedTab