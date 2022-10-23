import type { NextComponentType } from "next";
import {
    Flex,
} from "@chakra-ui/react"



const HomeTab : NextComponentType = () => {
    return (
        <Flex
        id="main"
        className="main-cl"
        w={"calc(100vw - 23%)"}
        h={"100%"}
        backgroundImage="https://wallpapercave.com/wp/wp4129396.jpg">
            
        </Flex>
    )
}


export default HomeTab