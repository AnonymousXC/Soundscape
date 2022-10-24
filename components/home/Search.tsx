import { NextComponentType } from "next";
import { useState } from "react";
import  {
    Flex,
    Box,
    Input,
    Avatar,
} from "@chakra-ui/react"


const SearchBar : NextComponentType = () => {

    let [ searchQuery, setSearchQuery ] = useState("")
    let [ searchHeight, setSearchHeight ] = useState("48px")
    let [ bgColor, setBgColor ] = useState("transparent")

    return (
        <Flex 
        id="searchbar-main"
        className="searchbar-main-cl"
        w={"100%"} 
        justifyContent="space-around" 
        alignItems={"end"}
        h={searchHeight} 
        direction={"column"}
        backgroundColor={bgColor}
        transition="all 200ms">

            <Flex className="Bar-Wrapper" w={"100%"} align="center" justifyContent="space-around" h={"48px"}>
                <Input
                w={"80%"}
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
                    setBgColor("#1A101F")
                    setSearchHeight("100%")
                }}

                onBlur={() => {
                    setBgColor("transparent")
                    setSearchHeight("48px")
                }}

                />
                <Avatar name="Hello World" bg={"#737373"} mt={1} size="sm"/>
            </Flex>
        </Flex>
    )
}

async function searchSongApi(queryStr : String)  {
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
    let data = await queryed.json();
    console.log(data);
}

export default SearchBar