import type { NextComponentType } from "next";
import {
    Flex,
    Text,
    Image,
    Button
} from "@chakra-ui/react"

// interface songProps {
//     songImage: string,
//     songTitle: string,
//     songDuration: string,
// }

const SongInfoBar : NextComponentType<any> = ({songImage, songTitle, artistName, songDuration, songPlayURL} : any)  => {
    return (
        <Flex
        w={"98%"}
        h={"50px"}
        rounded={8}
        justifyContent="space-between"
        mt={2}
        px={2}
        py={3}
        alignItems="center"
        backgroundColor={"rgba(0,0,0,0.2)"}
        color="rgba(255,255,255,0.8)">
            <Image src={songImage} alt="songicon" width={"40px"} height="40px" rounded={6} mx={4} my="auto" loading="lazy" />
            <Flex justifyContent={"space-between"} h={"100%"} w={"70%"} alignItems="center">
                <Text w={"50%"}>{songTitle}</Text>
                <Text>{artistName}</Text>
                <Text>{songDuration}</Text>
            </Flex>
            <Button variant={"unstyled"}
            onClick={() => {
                let audio = document.getElementsByTagName("audio")[0]
                let imageSong = document.getElementById("song-image")
                let songName = document.getElementById("song-name")
                let artistNameEl = document.getElementById("artist-name")
                let titleElement = document.getElementsByTagName("title")[0]
                audio.src = songPlayURL
                audio.play()
                imageSong.src! = songImage
                songName!.innerText = songTitle
                artistNameEl!.innerText = artistName
                titleElement.innerText = songTitle
            }}>
                <Image src="images/icons/Pause Music Icon.svg" w={"40px"} className="player-btn" rounded={29.5} />
            </Button>
        </Flex>
    )
}


export default SongInfoBar