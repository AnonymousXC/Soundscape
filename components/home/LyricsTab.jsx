import {
    Flex,
    Text,
    Divider,
    Box,
    useBreakpoint
} from "@chakra-ui/react"
import { useEffect, useState } from "react"



const LyricsTab = () => {

    const [ songName, setSongName ] = useState("")
    const [ lyrics, setLyrics ] = useState("")
    const brPt = useBreakpoint()
    const isMobile = brPt === "sm" || brPt === "base" ? true : false  

    useEffect(() => {
        const currSongData = JSON.parse(document.getElementsByTagName("audio")[0].getAttribute("data-curr-song") || '{}')
        setSongName(currSongData.songTitle)
        
        getLyrics(currSongData.songID)
        .then(data => {
            if(data.results)
                setLyrics(data.results)
            else
                setLyrics("Lyrics Not Found.")
        })

    }, [])

    return (
        <Flex 
        mt={2} 
        pl={2}
        flexDir="column"
        height={isMobile ? "calc(var(--mobile-height) - (90px + 50px + 50px))" : "var(--mobile-height)"}>
            <Text fontSize={"1.2rem"} fontWeight="500">{songName} Lyrics</Text>
            <Divider />
            <Box 
            dangerouslySetInnerHTML={{__html : lyrics}}
            pt={2}
            overflowY="auto"
            pb={isMobile ?  2 : 0}
            mb={isMobile ? 0 : "48px"}
            textAlign="center"
            height={"100%"}
            verticalAlign={"middle"}
            fontSize="1.4rem">
            </Box>
        </Flex>
    )
}


async function getLyrics(sID) {
    const resData = await fetch("api/fetchSongLyrics", {
        body: JSON.stringify({
            songID: sID,
        }),
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const lyrics = await resData.json()
    return lyrics;
}


export default LyricsTab