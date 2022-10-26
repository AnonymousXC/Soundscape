import type { NextComponentType } from "next";
import {
    Flex,
    Image,
} from "@chakra-ui/react"
import SearchBar from "./Search";
import HomeTab from "./HomeTab";


const HomeTabMain : NextComponentType = () => {

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
            justifyContent="flex-start"
            direction={"column"}> 
                <SearchBar />
                <HomeTab />
            </Flex>
        </Flex>
    )
}




export default HomeTabMain