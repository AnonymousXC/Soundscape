import type { NextComponentType } from "next";
import {
    Flex,
    Image
} from "@chakra-ui/react"

const SideBar : NextComponentType = () => {
    return (
        <Flex
        id="sidebar"
        className="sidebar-cl"
        w={"23%"}
        h={"100%"}
        backgroundColor={"#10141F"}
        flexDirection="column">
            <Image 
            src="images/final icon.png"></Image>
        </Flex>
    )
}

export default SideBar;