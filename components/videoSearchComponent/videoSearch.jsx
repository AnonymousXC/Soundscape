import {
    Flex,
    Image,
    Text
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const VideoComponent = ({videoID}) => {

    const [ videoTitle, setVideoTitle ] = useState("")
    const router = useRouter()

    useEffect(() => {
        fetchVideoData(videoID)
        .then(data => {
            setVideoTitle(data.snippet.title)
        })
    }, [])

    return (
        <Flex 
        direction={"column"}
        onClick={() => {
            sessionStorage.setItem("videoId", videoID)
            router.push("/?tab=video", undefined, { shallow : true})
        }}
        w={"250px"}
        cursor="pointer"
        rounded={4}
        _hover={{
            transform: "scale(1.05)",
            backgroundColor: "rgba(0,0,0,0.5)"
        }}
        transition="all 150ms"
        backgroundColor="rgba(0,0,0,0.2)">
            <Image src={`https://i.ytimg.com/vi/${videoID}/hqdefault.jpg`} w={"250px"} height="140px" objectFit={"cover"} roundedTop={4} />
            <Text
            px={2}
            py={1}
            className="youtube-video-search"
            css={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
            }}>{videoTitle}</Text>
        </Flex>
    )
}


async function fetchVideoData(videoID) {
    const fetchData = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoID}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`)
    const data = await fetchData.json()
    return data.items[0]
}


export default VideoComponent