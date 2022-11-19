import { NextComponentType } from "next";
import { useEffect, useState } from "react";
import SongInfoBar from "./songInfoBar";
import { useRouter } from "next/router";
import  {
    Flex,
    Input,
    Avatar,
    Button,
    Image,
    useBreakpoint,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Divider
} from "@chakra-ui/react"



const SearchBar : NextComponentType = () => {

    const currBR = useBreakpoint()
    const isMobile = currBR === "sm" || currBR === "base" ? true : false  

    let [ searchQuery, setSearchQuery ] = useState("")
    let [ searchHeight, setSearchHeight ] = useState("0px")
    let [ searchResultNext, setSearchResultNext] = useState([])
    let [ musicQuality, setMusicQuality ] = useState(4)
    let router = useRouter()


    useEffect(() => {
        let musicQuality = parseInt(localStorage.getItem("song-quality") || "4")
        setMusicQuality(musicQuality)
        if(isMobile === false)
            setSearchHeight("calc(100vh - (90px + 48px + 4px))")
        else
            setSearchHeight("calc(100vh - (90px + 48px + 8px + 50px))")
    }, [])

    async function searchSongApi(queryStr : String)  {
        if(queryStr === "" || queryStr === " " || queryStr === undefined || queryStr === null) return;
        let componentArray : any = []
        queryStr = queryStr.replace(' ', "+")    
        let queryed = await fetch("api/searchSongNew", {
            body: JSON.stringify({
                searchQuery : queryStr,
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        })

        if(!queryed) return
        let data = await queryed.json();
        if(!data) return;
        
        searchResultNext = []
        data.results.map(async(element : any, key: number) => {
            const dateObj = new Date(element.duration *1000)
            let durationStr = dateObj.getUTCMinutes() + ":" + dateObj.getSeconds()
            if(element.downloadUrl[4] === undefined)
                return
            if(element.artist === "" || element.artist === null)
                element.artist = "Unknown"                
            
            componentArray.push(
                <SongInfoBar 
                key={key}
                songImage={element.image[2].link}
                songTitle={element.name.length > 50 ? element.artist.substring(0,50) : element.name}
                songDuration={durationStr}
                artistName={element.artist.length >= 30 ? element.artist.substring(0,30) + "..." : element.artist}
                songPlayURL={element.downloadUrl[musicQuality].link || ""}
                songID={element.id}
                card={false} />
            )
        })
        setSearchResultNext(componentArray)
    }
    
    

    return (
        <Flex 
        id="searchbar-main"
        className="searchbar-main-cl"
        w={"100%"} 
        justifyContent="space-around" 
        alignItems={"end"}
        h={"min-content"} 
        direction={"column"}
        backgroundColor={"transparent"}
        transition="all 200ms">

            <Flex className="Bar-Wrapper" w={"100%"} align="center" justifyContent="space-around" h={"48px"} pb={1}>
                <Button 
                variant={"unstyled"}
                mt={2}
                display={isMobile === true ? "none" : "block"}
                className="player-btn"
                rounded={29.5}
                onClick={() => {
                    setSearchHeight("0px")
                    router.push("/?tab=Home", undefined, {shallow: true})
                }}> <Image src="images/icons/Back Button.svg" alt="Back" w={"40px"} /> </Button>
                <Input
                w={isMobile === true ? "95%" : "85%"}
                borderWidth="1px"
                rounded={32}
                mt={2}
                placeholder="Search..."

                onChange={(e) => {
                setSearchQuery(e.currentTarget.value)
                }}

                onKeyUp= {(e) => {
                    if(e.key === "Enter")
                        searchSongApi(searchQuery)
                }}

                onFocus={() => {
                    router.push("/?tab=Search", undefined, {shallow: true})
                }}

                />
                { isMobile === false &&
                    <Menu>
                        <MenuButton>
                            <Avatar name="Hello World" bg={"#737373"} mt={2} size="sm" />
                        </MenuButton>
                        <MenuList backgroundColor={"#10141f"}>
                            <MenuItem 
                            onClick={() => {
                                router.push("/signup", undefined, {shallow: true})
                            }}>Sign Up</MenuItem>
                            <MenuItem 
                            onClick={() => {
                                router.push("/login", undefined, { shallow : true })
                            }}>Login</MenuItem>
                            <Divider />
                            <MenuItem 
                            onClick={() => {
                                localStorage.removeItem("userID")
                            }}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                }
            </Flex>
            <Flex
            display={router.query.tab === "Search" ? "flex" : "none"}
            h={isMobile ? searchHeight : "calc(100vh - 145px)"}
            width={"100%"}
            mt={2}
            pb={"8px"}
            zIndex={5}
            overflowY="auto"
            alignItems="center"
            direction="column">
                {searchResultNext}
            </Flex>
        </Flex>
    )
}

export default SearchBar