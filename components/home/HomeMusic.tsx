import type { NextComponentType } from "next";
import {
    Flex,
    Input,
    Image,
    Avatar
} from "@chakra-ui/react"
import { useState } from "react";



const HomeTab : NextComponentType = () => {

    let [ searchQuery, setSearchQuery] = useState("")

    return (
        <Flex
        id="main"
        className="main-cl"
        w={"calc(100vw - 23%)"}
        h={"100%"}
        direction={"column"}>
            <Image 
            id="full-bg-image"
            className="full-bg-image-cl"
            src="https://wallpapercave.com/wp/wp4129396.jpg" 
            w={"57%"}
            h={"57%"}
            position="absolute"
            left="60%"
            top={"40%"}
            transform="translate(-50%, -50%)"
            zIndex={-1} />
            <Flex 
            w={"100%"}
            h={"100%"}
            zIndex={2}
            justifyContent="center"> 
                <Flex w={"100%"} justifyContent="space-around" h={"min-content"} align="center">
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

                    />
                    <Avatar name="Hello World" bg={"#737373"} mt={1} size="sm"/>
                </Flex>
            </Flex>
        </Flex>
    )
}

async function searchSongApi(queryStr : String)  {
    let queryed = await fetch("api/searchSong")
    let data = await queryed.json();
    console.log(data);
}


export default HomeTab