'use client'
import getAlbum from "@/app/server/getAlbum.server";
import Song from "@/components/global/SongBar";
import { AlbumResponse } from "@/interfaces/album.interface";
import { SongResponse } from "@/interfaces/song.interface";
import { Flex, Img, Text } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


function Playlist() {

    const id = useParams().id
    const [ data, setData ] = useState<AlbumResponse>()

    useEffect(() => {
        getAlbum(id)
        .then((data : AlbumResponse) => {
            setData(data)
        })
    }, [id])

    return (
        <Flex position={'relative'} top={0} left={0} width={'100%'} maxW={'100%'} background={'background'} height={'calc(100vh - 6.25rem)'} px={'1.25rem'} pt={'1rem'} flexDir={'column'} overflowY={'auto'} overflowX={'hidden'} pb={4}>
            <Flex gap={8} alignItems={'center'}>
                <Img src={data?.image[2].link} w={'250px'} height={'250px'} rounded={20} />
                <Flex flexDirection={'column'}>
                    <Text fontSize={'2rem'}> {data?.name} </Text>
                    <Text>Song Count : {data?.songCount} </Text>
                    <Text>Artists : {typeof data?.primaryArtists == 'string' ? data?.primaryArtists : ""} </Text>
                    <Text>Released : {data?.releaseDate} </Text>
                </Flex>
            </Flex>
            <Flex width={'100%'} mt={'1.5rem'} height={'100%'} overflowY={'auto'} flexDirection={'column'} gap={'0.4rem'} overflowX={'hidden'} className='hide-scroll-bar' px={1}>
                {
                    data?.songs.map((val: SongResponse, idx: number) => {
                        return (<Song data={val} key={idx} />)
                    })
                }
            </Flex>
        </Flex>
    )
}

export default Playlist;