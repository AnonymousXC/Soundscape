import {
    Box,
    Flex,
    Image,
    Heading,
    Text,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"


const SongDetailDesk = () => {

    const [ songData, setSongData ] = useState({})

    useEffect(() => {
        const audioData = document.getElementsByTagName("audio")[0].getAttribute("data-curr-song")
        setSongData(JSON.parse(audioData))
    }, [])

    return (
        <Flex
        h={"100%"}
        pt={4}
        direction="column">
            <Flex 
            p={8}
            w={"100%"}
            h={"50%"}
            alignItems={"center"}>
                <Image src={songData.songImgUrl} h={"250px"} w="auto" rounded={6} />
                <Box
                px={4}>
                    <Heading>{songData.songTitle}</Heading>
                    <Text color="#B0B0B0" pt={2}> <span style={{ color: "#747474" }}>Artist</span> {songData.songArtist}</Text>
                </Box>
            </Flex>
            <Flex
            pt={4}
            px={8}
            h={"100%"}
            w={"100%"}>
                <Flex justifyContent={"space-between"} w={"100%"} h="25px">
                    <Text>Name</Text>
                    <Text>Artist</Text>
                    <Text>Album</Text>
                    <Text>Added Date</Text>
                    <Text>Duration</Text>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default SongDetailDesk;