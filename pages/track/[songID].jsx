import {
    Flex,
    Heading,
    Progress
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { pushRecentPlayedToDBWithPromiseReturn } from "../../.firebase/miscellaneous"

const SharePage = () => {

    const router = useRouter()
    const currSongID = router.query.songID

    useEffect(() => {
        (async () => {
            let queryed = await fetch(`${window.location.origin}/api/fetchSongData`, {
                body: JSON.stringify({
                    songDataID : currSongID,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
            })

            let data = await queryed.json()
            if(data.results) {
                let last =  JSON.parse(localStorage.getItem("recent-played") || '[]')

                if(last.length === 0) {
                    localStorage.setItem("recent-played", JSON.stringify([{
                        playURL: data.results.downloadUrl[4].link,
                        songArtist: data.results.artist,
                        songDuration: data.results.duration,
                        songID: data.results.id,
                        songImgUrl: data.results.image[2].link,
                        songTitle: data.results.name,
                    }]))
                    localStorage.setItem("auto-play", true)
                    window.location = window.location.origin + "/?tab=Home"
                    return;
                }

                last.forEach((ele, idx) => {
                    if(ele.songID === data.results.id)
                        {
                            last.splice(idx, 1)
                            localStorage.setItem("auto-play", true)
                            return
                        }
                })

                last.push({
                    playURL: data.results.downloadUrl[4].link,
                    songArtist: data.results.artist,
                    songDuration: data.results.duration,
                    songID: data.results.id,
                    songImgUrl: data.results.image[2].link,
                    songTitle: data.results.name,
                })
                localStorage.setItem("recent-played", JSON.stringify(last))
                localStorage.setItem("auto-play", true)
                pushRecentPlayedToDBWithPromiseReturn().then(() => {
                    window.location = window.location.origin + "/?tab=Home"
                }).finally(e => {
                    document.getElementById("msg").innerText = "Internal Server Error."
                })
            }

        })()
    })

    return (
        <Flex justifyContent={"center"} alignItems="center" height={"100vh"} direction="column">
            <Heading id="msg">Getting Your Song Ready.</Heading>
            <Progress size='lg' isIndeterminate  w="80%" mt={8} colorScheme="teal"/>
        </Flex>
    )
}





export default SharePage