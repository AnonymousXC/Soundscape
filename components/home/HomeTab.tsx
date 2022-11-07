import type { NextComponentType } from "next";
import { 
    Flex,
    Text,
    useBreakpoint,
    Divider
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



const HomeTab : NextComponentType = () => {

    const currBR = useBreakpoint()
    const isMobile = currBR === "sm" || currBR === "base" ? true : false  

    const [ cardsMetaArray, setCardsMetaArray ] = useState([])
    const [ trendingTodayCards, setTrendingTodayCards ] = useState([])
    const [ mobileHeight, setMobileHeight ] = useState(0)
    // const [ dbData, setDBData ] = useState()
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
        let songData = await songDataRes.json()
    }

    useEffect(() => {

        setMobileHeight(window.innerHeight)

        if(localStorage.getItem("userID"))
        {
            addRecentPlayFromDatabase().then(data => {
                addCards(data!.recentPlays, false);
                localStorage.setItem("recent-played", JSON.stringify(data?.recentPlays))
            })
            return
        }

        let recentPlayedArray = JSON.parse(localStorage.getItem("recent-played") || '[]')       
        addCards(recentPlayedArray, false)
    }, [])


    return (
        <Flex 
        h={isMobile === true ? `calc(${mobileHeight} - (90px + 48px + 50px))` : "calc(100% - 35px)"}
        px={3}
        py={3}
        pb={0}
        pr={0}
        display={router.query.tab === "Home" || router.query.tab === undefined ? "flex" : "none"}
        direction={"column"}
        overflowY="auto">
            <Text fontSize={"1.2rem"} fontWeight="500">Recently Played</Text>
            <Divider />
            <Flex wrap={"wrap"} height="max-content" mb={12}>
                {cardsMetaArray}
            </Flex>
            <Text fontSize={"1.2rem"} fontWeight="500">Trending Today</Text>
            <Divider />
            <Flex>
                { trendingTodayCards }
            </Flex>
        </Flex>
    )
}


async function addRecentPlayFromDatabase() {
    let userID = localStorage.getItem("userID") || ""
    let docSnap = await getDoc(doc(Database, "userData", userID))
    if(docSnap.exists())
        return docSnap.data()
}



export default HomeTab
export { addRecentPlayFromDatabase }