import type { NextComponentType } from "next";
import {
    Flex,
    Image,
    useBreakpoint,
} from "@chakra-ui/react"
import SearchBar from "./Search";
import HomeTab from "./HomeTab";
import LikedTab from "../home/FavTab"
import LyricsTab from "../home/LyricsTab"
import SongDetailDesk from "../songDetail/songDetail"
import { useRouter } from "next/router";
import YouTube from 'react-youtube';
import RecentPlayed from '../home/Recent Played';

const HomeTabMain : NextComponentType = () => {

    const currBR = useBreakpoint()
    const isMobile = currBR === "sm" || currBR === "base" ? true : false
    const router = useRouter()
    let videoSize = isMobile ?  "calc(var(--mobile-height) - 187px)" : "100%"


    return (
        <Flex
        id="main"
        className="main-cl"
        w={isMobile === true ? "100%" : "calc(100vw - 23%)"}
        h={isMobile === true ? "80%" : "100%"}
        direction={"column"}>
            <Image 
            id="full-bg-image"
            className="full-bg-image-cl"
            src="https://wallpapercave.com/wp/wp4129396.jpg" 
            w={"60%"} // 57%
            h={"60%"} // 57%
            position="absolute"
            left="60%"
            top={"40%"}
            transform="translate(-50%, -50%)"
            zIndex={-1}
            alt="" />
            <Flex 
            w={"100%"}
            h={"100%"}
            zIndex={2}
            justifyContent="flex-start"
            direction={"column"}> 
                <SearchBar />
                <HomeTab />
                {/*
                    (router.query.tab === "Home" || router.query.tab === undefined) &&
                */}
                {
                    router.query.tab === "LikedSong" &&
                    <LikedTab />
                }
                {
                    router.query.tab === "Lyrics" &&
                    <LyricsTab />
                }
                {
                    router.query.tab === "Detail" &&
                    <SongDetailDesk />
                }
                {
                    router.query.tab === "RecentSongs" &&
                    <RecentPlayed />
                }
                {
                    router.query.tab === "video" &&
                    <YouTube videoId={sessionStorage.getItem("videoId") || ""} 
                    style={{
                        maxWidth : "100%",
                        height: videoSize,
                        width: "100vw"
                    }}
                    opts={{
                        width : "100%",
                        height : "100%",
                        playerVars : {
                            controls : 1,
                            showinfo : 0,
                            autohide : 1,
                            autoplay : 1,
                        }
                    }} />
                }
            </Flex>
        </Flex>
    )
}




export default HomeTabMain