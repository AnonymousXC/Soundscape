import type { NextComponentType } from "next";
import { 
    Flex,
    Text,
    useBreakpoint
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
    // const [ dbData, setDBData ] = useState()
    const router = useRouter()


    function addCards(recentPlayedArray : any) {
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
        setCardsMetaArray(nextJSCardsComp)

    }

    useEffect(() => {

        if(localStorage.getItem("userID"))
        {
            addRecentPlayFromDatabase().then(data => {
                addCards(data!.recentPlays);
                localStorage.setItem("recent-played", JSON.stringify(data?.recentPlays))
            })
            
            return
        }

        let recentPlayedArray = JSON.parse(localStorage.getItem("recent-played") || '[]')       
        addCards(recentPlayedArray)
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


async function addRecentPlayFromDatabase() {
    let userID = localStorage.getItem("userID") || ""
    let docSnap = await getDoc(doc(Database, "userData", userID))
    if(docSnap.exists())
        return docSnap.data()
}



export default HomeTab
export { addRecentPlayFromDatabase }