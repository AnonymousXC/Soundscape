import { NextComponentType } from "next";
import { useState } from "react";
import SongInfoBar from "./songInfoBar";
import { useRouter } from "next/router";
import  {
    Flex,
    Input,
    Avatar,
    Button,
    Image
} from "@chakra-ui/react"



const SearchBar : NextComponentType = () => {

    let [ searchQuery, setSearchQuery ] = useState("")
    let [ searchHeight, setSearchHeight ] = useState("0px")
    let [ searchResultNext, setSearchResultNext] = useState([])
    let router = useRouter()

    async function searchSongApi(queryStr : String)  {
        if(queryStr === "" || queryStr === " " || queryStr === undefined || queryStr === null) return;
        let componentArray : any = []
        queryStr = queryStr.replace(' ', "%20")    
        let queryed = await fetch("api/searchSong", {
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
        console.log(data);
        
        searchResultNext = []
        data.results.map(async(element : any, key: number) => {
            let currSongRes = await fetch("api/songInfo", {
                body: JSON.stringify({
                    song_url : element.api_url!.song
                }),
                headers: {
                    "Content-Type" : "application/json"
                },
                method: "POST"
            })    
            let currSongData = await currSongRes.json()

            if(!currSongData) return;

            componentArray.push(
                <SongInfoBar 
                key={key}
                songImage={currSongData.image}
                songTitle={currSongData.song}
                songDuration={currSongData.duration}
                artistName={currSongData.singers ? currSongData.singers : "Unknown"}
                songPlayURL={currSongData.media_url}
                card={false} />
            )
        })
        setSearchResultNext(componentArray)
        setTimeout(() => {
            if(router.query.tab === "Search")
                router.push("/?tab=Search", undefined, {shallow: true})
        } , 1500)
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
                className="player-btn"
                rounded={29.5}
                onClick={() => {
                    setSearchHeight("0px")
                    router.push("/?tab=Home", undefined, {shallow: true})
                }}> <Image src="images/icons/Back Button.svg" alt="Back" w={"40px"} /> </Button>
                <Input
                w={"85%"}
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
                    setSearchHeight("calc(100vh - (90px + 48px + 8px))")
                }}

                />
                <Avatar name="Hello World" bg={"#737373"} mt={2} size="sm"/>
            </Flex>
            <Flex
            display={router.query.tab === "Search" ? "flex" : "none"}
            h={searchHeight}
            width={"100%"}
            mt={2}
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