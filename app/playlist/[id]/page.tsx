'use client'
import { Flex } from "@chakra-ui/react";
import { useParams } from "next/navigation";


function Playlist() {

    const playlistID = useParams().id

    return (
        <Flex position={'relative'} top={0} left={0} width={'100%'} maxW={'100%'} background={'background'} height={['calc(100vh - 3.875rem - 8.2rem - 3rem)','calc(100vh - 6.25rem)','calc(100vh - 6.25rem)']} px={'1.25rem'} pt={'1rem'} flexDir={'column'} overflowY={'auto'} overflowX={'hidden'} pb={4}>
            {playlistID}
        </Flex>
    )
}

export default Playlist;