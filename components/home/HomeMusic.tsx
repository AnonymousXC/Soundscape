import type { NextComponentType } from "next";
import {
    Flex,
    Image,
    useBreakpoint,
} from "@chakra-ui/react"
import SearchBar from "./Search";
import HomeTab from "./HomeTab";


const HomeTabMain : NextComponentType = () => {

    const currBR = useBreakpoint()
    const isMobile = currBR === "sm" || currBR === "base" ? true : false


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