import {
    Box,
    Flex,
    Image,
    Heading,
    Text,
    useBreakpoint,
    Button,
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
                {
                    isMobile === true &&
                    <Flex justifyContent={"center"} alignItems="center" direction={"column"} h={"315px"}>
                        <Image src={songData.songImage} h={"250px"} w="auto" rounded={6} />
                        <Button 
                        pt={1}
                        position={"relative"}
                        variant="unstyled">
                            <Image src="images/icons/Pause Music Icon.svg" w={"50px"} />
                        </Button>
                    </Flex>
                }
                {
                    isMobile === false &&
                    <Image src={songData.songImage} h={"250px"} w="auto" rounded={6} />
                }
                <Box
                minH={"max-content"}
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
                            <Text color="#B0B0B0" pt={0}> <span style={{ color: "#747474" }}>Duration</span> {(serverSongData.duration)}</Text>
                            <Text color="#B0B0B0" pt={0}> <span style={{ color: "#747474" }}>Play Count</span> {intl.NumberFormat().format(serverSongData.playCount)}</Text>
                        </>
                    }
                    {
                        isMobile === false &&
                        <Button 
                        // mt={1}
                        variant="unstyled">
                            <Image src="images/icons/Pause Music Icon.svg" w={"50px"} />
                        </Button>
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
                        <Flex justifyContent={"space-between"}>
                            <Box>
                                <Text>Name</Text>
                                <Text color="#B0B0B0" pt={1}>{serverSongData.name}</Text>
                            </Box>
                            <Box>
                                <Text>Artist</Text>
                                <Text color="#B0B0B0" pt={1}>{serverSongData.artist}</Text>
                            </Box>
                            <Box>
                                <Text>Album</Text>
                                <Text color="#B0B0B0" pt={1}> {serverSongData.album.name ? serverSongData.album.name : "Loading..."}</Text>
                            </Box>
                            {/* <Box>
                                <Text>Added Date</Text>
                                <Text color="#B0B0B0" pt={1}>{serverSongData.releaseDate}</Text>
                            </Box> */}
                            <Box>
                                <Text>Duration</Text>
                                <Text color="#B0B0B0" pt={1}>{serverSongData.duration}</Text>
                            </Box>
                            <Box>
                                <Text>Play Count</Text>
                                <Text color="#B0B0B0" pt={1}>{intl.NumberFormat().format(serverSongData.playCount)}</Text>
                            </Box>
                        </Flex>
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