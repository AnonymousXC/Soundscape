import type { NextComponentType } from "next";
import {
    Flex,
} from "@chakra-ui/react"


const Player : NextComponentType = () => {
    return (
        <Flex
        id="player"
        className="music-player"
        w={"100vw"}
        h={"80px"}
        backgroundColor="#10141F">

        </Flex>
    )
}


export default Player;