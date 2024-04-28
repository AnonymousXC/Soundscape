'use client'
import { Flex } from "@chakra-ui/react";
import { useParams } from "next/navigation";


function Playlist() {

    const id = useParams().id

    return (
        <Flex position={'relative'} top={0} left={0} width={'100%'} maxW={'100%'} background={'background'} height={'calc(100vh - 6.25rem)'} px={'1.25rem'} pt={'1rem'} flexDir={'column'} overflowY={'auto'} overflowX={'hidden'} pb={4}>
            Playlist {id}
        </Flex>
    )
}

export default Playlist;