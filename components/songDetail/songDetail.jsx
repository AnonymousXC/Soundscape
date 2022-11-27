import {
    Box,
    Flex,
    Image,
    Heading,
    Text,
    useBreakpoint,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"


const SongDetailDesk = () => {

    const [ songData, setSongData ] = useState({})
    const currBR = useBreakpoint()
    const isMobile = currBR === "sm" || currBR === "base" ? true : false  


    useEffect(() => {
        
        (async () => {
            const audioData = sessionStorage.getItem("songClicked")
            setSongData(JSON.parse(audioData))

            let queryed = await fetch(`${window.location.origin}/api/fetchSongData`, {
                body: JSON.stringify({
                    songDataID : songData.songID,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
            })

            let data = await queryed.json()
            console.log(data);

        })()
        

    }, [])

    return (
        <Flex
        h={isMobile ? "var(--mobile-height)" : "100%"}
        pt={4}
        direction="column">
            <Flex 
            p={isMobile ? 4 : 8}
            w={"100%"}
            h={"50%"}
            alignItems={"center"}
            direction={isMobile === true ? "column" : "row"}>
                <Image src={songData.songImage} h={"250px"} w="auto" rounded={6} />
                <Box
                pt={isMobile ? 2 : 0}
                px={4}>
                    <Heading>{songData.songTitle}</Heading>
                    <Text color="#B0B0B0" pt={2}> <span style={{ color: "#747474" }}>Artist</span> {songData.artistName}</Text>
                </Box>
            </Flex>
            <Flex
            pt={4}
            px={8}
            h={"100%"}
            w={"100%"}>
                <Flex justifyContent={"space-between"} w={"100%"} h="25px">
                    {
                        isMobile === false &&
                        <>
                            <Text>Name</Text>
                            <Text>Artist</Text>
                            <Text>Album</Text>
                            <Text>Added Date</Text>
                            <Text>Duration</Text>
                        </>
                    }
                </Flex>
            </Flex>
        </Flex>
    )
}

export default SongDetailDesk;