import {
    Box,
    Flex,
    Image,
    Heading,
    Text,
    useBreakpoint,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"


const defaultSongServerObj = {
    album : {
        name : "Loading..."
    },
    releaseDate : "Loading...",
    playCount : "Loading...",
    duration : "Loading..."
}


const SongDetailDesk = () => {

    const [ songData, setSongData ] = useState({})
    const [ serverSongData, setServerSongData ] = useState(defaultSongServerObj)
    const currBR = useBreakpoint()
    const isMobile = currBR === "sm" || currBR === "base" ? true : false 
    let intl = Intl


    useEffect(() => {
        const audioData = sessionStorage.getItem("songClicked")
        setSongData(JSON.parse(audioData))
        getSongDataServer(JSON.parse(audioData).songID)
        .then((e) => {
            setServerSongData(e)
        })

    }, [])

    return (
        <Flex
        h={isMobile ? "calc(var(--mobile-height) - 188px)" : "100%"}
        pt={4}
        overflowY="auto"
        direction="column">
            <Flex 
            p={isMobile ? 4 : 8}
            w={"100%"}
            h={isMobile ? "unset" : "50%"}
            alignItems={"center"}
            direction={isMobile === true ? "column" : "row"}>
                <Image src={songData.songImage} h={"250px"} w="auto" rounded={6} />
                <Box
                pt={isMobile ? 2 : 0}
                w={isMobile ? "250px" : "initial"}
                px={isMobile ? 0 : 4}>
                    <Heading>{songData.songTitle}</Heading>
                    <Text color="#B0B0B0" pt={2}> <span style={{ color: "#747474" }}>Artist</span> {songData.artistName}</Text>
                    {
                        isMobile === true && 
                        <>
                            <Text color="#B0B0B0" pt={0}> <span style={{ color: "#747474" }}>Album</span> {serverSongData.album.name ? serverSongData.album.name : "Loading..."}</Text>
                            <Text color="#B0B0B0" pt={0}> <span style={{ color: "#747474" }}>Date Added</span> {serverSongData.releaseDate}</Text>
                            <Text color="#B0B0B0" pt={0}> <span style={{ color: "#747474" }}>Duration</span> {serverSongData.duration}</Text>
                            <Text color="#B0B0B0" pt={0}> <span style={{ color: "#747474" }}>Play Count</span> {intl.NumberFormat().format(serverSongData.playCount)}</Text>
                        </>
                    }
                </Box>
            </Flex>
            <Flex
            pt={4}
            px={8}
            h={"500px"}
            w={"100%"}>
                <Flex justifyContent={"space-between"} w={"100%"} h="25px" direction={"column"}>
                    {
                        isMobile === false &&
                        <>
                            <Flex justifyContent={"space-between"}>
                                <Text>Name</Text>
                                <Text>Artist</Text>
                                <Text>Album</Text>
                                <Text>Added Date</Text>
                                <Text>Duration</Text>
                            </Flex>
                            <Flex justifyContent={"space-between"}>
                                <Text color="#B0B0B0" pt={0}> {serverSongData.album.name ? serverSongData.album.name : "Loading..."}</Text>
                                <Text color="#B0B0B0" pt={0}>{serverSongData.releaseDate}</Text>
                                <Text color="#B0B0B0" pt={0}>{serverSongData.duration}</Text>
                                <Text color="#B0B0B0" pt={0}>{intl.NumberFormat().format(serverSongData.playCount)}</Text>
                            </Flex>
                        </>
                    }
                </Flex>
            </Flex>
        </Flex>
    )
}


async function getSongDataServer(songID) {
    let queryed = await fetch(`${window.location.origin}/api/fetchSongData`, {
        body: JSON.stringify({
            songDataID : songID,
        }),
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
    })

    let data = await queryed.json()
    return data.results

}

export default SongDetailDesk;