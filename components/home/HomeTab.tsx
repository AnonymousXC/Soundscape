import type { NextComponentType } from "next";
import { 
    Flex,
    Text,
    useBreakpoint,
    Divider,
    Box,
    Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import SongInfoBar from "./songInfoBar";
import { 
    useEffect, 
    useState 
} from "react";
import {
    doc,
    getDoc,
} from "firebase/firestore"
import { Database } from "../../.firebase/firebaseMain"
import { getSongDataServer } from '../songDetail/songDetail'



const HomeTab : NextComponentType = () => {

    const currBR = useBreakpoint()
    const isMobile = currBR === "sm" || currBR === "base" ? true : false  

    const [ cardsMetaArray, setCardsMetaArray ] = useState([])
    const [ trendingTodayCards, setTrendingTodayCards ] = useState([])
    // const [ showRecent, setShowRecent ] = useState(false)
    const router = useRouter()


    function addCards(recentPlayedArray : any, trending : boolean) {
        let nextJSCardsComp : any = []
        recentPlayedArray.reverse().forEach((ele : any, idx : number) => {
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
        if(trending === false)
            setCardsMetaArray(nextJSCardsComp)
        else
            setTrendingTodayCards(nextJSCardsComp)
    }

    async function addTrendingToday() {
        let songDataRes = await fetch("api/fetchTopSongs", {method: "GET"})
        let songData = (await songDataRes.json())
        let noOFSongs = songData.length > 20 ? 20 : songData.length;
        
        let newSongArr = []
        for (let i = 0; i < noOFSongs; i++) {
            const el = songData[i];
            newSongArr.push({
                "songImgUrl" : el.image[2].link,
                "songTitle" : el.name.replace(/\(.+\)/, ""),
                "songDuration" : el.duration,
                "songArtist" : el.primaryArtists,
                "playURL" : el.downloadUrl[4].link,
                "songID" : el.id
            })
        }
        addCards(newSongArr, true)
    }

    useEffect(() => {
        addTrendingToday()

    }, [])


    return (
        <Flex 
        h={isMobile === true ? `calc(var(--mobile-height) - (90px + 48px + 50px))` : "calc(100% - 35px)"}
        px={3}
        py={3}
        pb={0}
        pr={0}
        display={router.query.tab === "Home" || router.query.tab === undefined ? "flex" : "none"}
        direction={"column"}
        overflowY="auto">
            { /*
                showRecent &&
                <Box height="max-content" pt={1}>
                    <Text fontSize={"1.2rem"} fontWeight="400">Recently Played</Text>
                    <Divider />
                    <Flex wrap={"wrap"} id="recent-played-cards-el" pt={2}>
                        {cardsMetaArray}
                    </Flex>
                </Box> */
            }
            <Box height="max-content" pb={2}>
                <Text fontSize={"1.2rem"} fontWeight="400">Trending Today</Text>
                <Divider />
                <Flex wrap={"wrap"} pt={2} id="trending-today-cards" overflowX={'hidden'}>
                    { trendingTodayCards }
                </Flex>
                <Button left={'50%'} transform={'translateX(-50%)'}>
                    Load More
                </Button>
            </Box>
        </Flex>
    )
    
}


async function addRecentPlayFromDatabase() {
    let userID = localStorage.getItem("userID") || ""
    let docSnap = await getDoc(doc(Database, "userData", userID))
    if(docSnap.exists())
        return docSnap.data()
}

function storeSongForRandomPlay() {
    let songsArray : any = {
        recent: [],
        trending: []
    }
    songsArray.recent.push(document.getElementById("recent-played-cards-el")!.childNodes)
    songsArray.trending.push(document.getElementById("trending-today-cards")!.childNodes)
    localStorage.setItem("song-dom-el", JSON.stringify(songsArray))
}


export default HomeTab
export { addRecentPlayFromDatabase }