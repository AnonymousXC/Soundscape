import type { NextComponentType } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
    Flex,
    Image,
    Box,
    Tab,
    TabList,
    Tabs,
    Button,
} from "@chakra-ui/react"
import {
    ChevronRightIcon,
    ChevronDownIcon
} from "@chakra-ui/icons"


const SideBar : NextComponentType = () => {

    const [ isPlaylistDropDown, setPlaylistDropDown ] = useState(false)
    let [ songImgUrl, setSongImgURL] = useState("")
    const router = useRouter()

    useEffect(() => {
        let lastSession : any = JSON.parse(localStorage.getItem("recent-played") || '{}')
        if(!lastSession[lastSession.length - 1]) return;
        setSongImgURL(lastSession[0].songImgUrl)
        document.getElementsByTagName("audio")[0].setAttribute("data-curr-song", JSON.stringify(lastSession[0]))
    }, [])

    return (
        <Flex
        id="sidebar"
        className="sidebar-cl"
        w={"23%"}
        h={"100%"}
        backgroundColor={"#10141F"}
        flexDirection="column"
        justifyContent={"space-between"}>
            <Flex flexDir={"column"}>
                <Image 
                src="images/final icon.png"
                w={"210px"}
                alt=""
                pt={2}
                pl={2} />
                <Box>
                    <Tabs orientation="vertical" variant={"unstyled"}>
                        <TabList w={"100%"} alignItems="flex-start" ml={"10"} mt={2} gap={0}>
                            <Tab fontWeight={"bold"} fontSize="0.9rem" _hover={{color: "#909090"}}
                            onClick={() => {
                                router.push("/?tab=Home", undefined, {shallow: true})
                            }}> <Image src="images/icons/Home Icon.svg" pr={"5"} w="38px" alt="" /> Home </Tab>
                            <Tab fontWeight={"bold"} fontSize="0.9rem" _hover={{color: "#909090"}}
                            onClick={() => {
                                router.push("/?tab=LikedSong", undefined, {shallow: true})
                            }}><Image src="images/icons/Liked Icon.svg" pr={"5"} w="38px" alt="" /> Liked Songs</Tab>
                        </TabList>
                    </Tabs>
                </Box>
                <Button variant={"unstyled"} textAlign="start" mt={"3"} pl={"8"} fontSize="0.9rem"
                fontWeight="bold"
                _hover={{color: "#909090"}}>Library <ChevronRightIcon fontSize={"23px"} /> </Button>

                <Box 
                id="playlist-box" pl={"8"} >
                    <Button variant={"unstyled"} textAlign="start"
                    fontWeight="bold" 
                    _hover={{color: "#909090"}} w="100%" fontSize={"0.9rem"}
                    onClick={() => { isPlaylistDropDown == true ? setPlaylistDropDown(false) : setPlaylistDropDown(true)}}>Playlists {isPlaylistDropDown ?  <ChevronDownIcon fontSize={"23px"} /> :  <ChevronRightIcon fontSize={"23px"} />} </Button>
                    <Box id="playlist-names" 
                    display={isPlaylistDropDown ? "block" : "none"}
                    pl="4" h={"80px"} overflowY="auto">
                        <Button className="playlist-btn">Hello</Button>
                        <Button className="playlist-btn">Hello</Button>
                        <Button className="playlist-btn">Hello</Button>
                        <Button className="playlist-btn">Hello</Button>
                    </Box>
                </Box>
            </Flex>

            <Flex 
            w={"100%"}
            justifyContent="center"
            alignContent={"center"}
            >
                <Image 
                id="song-image"
                src={songImgUrl ? songImgUrl : "https://media.istockphoto.com/vectors/flag-ribbon-welcome-old-school-flag-banner-vector-id1223088904?k=20&m=1223088904&s=612x612&w=0&h=b_ilJpFTSQbZeCrZusHRLEskmfiONWH0hFASAJbgz9g="}
                width={"80%"}
                rounded={12}
                loading={"lazy"}
                alt=""
                className="songBarImage" />
            </Flex>

        </Flex>
    )
}

export default SideBar;