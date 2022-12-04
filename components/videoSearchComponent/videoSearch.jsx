import {
    Flex,
    Image,
    Text,
    Button,
    useBreakpoint
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const VideoComponent = ({videoID}) => {

    const [ videoTitle, setVideoTitle ] = useState("")
    const router = useRouter()
    const currBR = useBreakpoint()
    const isMobile = currBR === "sm" || currBR === "base" ? true : false

    useEffect(() => {
        fetchVideoData(videoID)
        .then(data => {
            setVideoTitle(data.snippet.title)
        })
    }, [videoID])

    return (
        <Flex 
        direction={"row"}
        onClick={() => {
            sessionStorage.setItem("videoId", videoID)
            router.push("/?tab=video", undefined, { shallow : true})
            document.getElementsByTagName("audio")[0].pause()
        }}
        w={isMobile === false ? "98%" : "95%"}
        h={"50px"}
        py={2}
        mt={2}
        justifyContent="space-around"
        alignItems={"center"}
        cursor="pointer"
        rounded={8}
        // _hover={{
        //     transform: "scale(1.05)",
        //     backgroundColor: "rgba(0,0,0,0.5)"
        // }}
        transition="all 150ms"
        backgroundColor="rgba(0,0,0,0.2)">
            <Image src={`https://i.ytimg.com/vi/${videoID}/hqdefault.jpg`} w={"71px"} height="40px" objectFit={"cover"} rounded={4} />
            <Text
            h={"max-content"}
            className="one-line-overflow"
            w={"60%"}>{videoTitle}</Text>
            <Button variant={"unstyled"}
            onClick={() => {
                sessionStorage.setItem("videoId", videoID)
                router.push("/?tab=video", undefined, { shallow : true})
                document.getElementsByTagName("audio")[0].pause()
            }}>Play</Button>
        </Flex>
    )
}


async function fetchVideoData(videoID) {
    const fetchData = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoID}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`)
    const data = await fetchData.json()
    return data.items[0]
}


export default VideoComponent