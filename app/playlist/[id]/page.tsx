'use client'
import getAlbum from "@/app/server/getAlbum.server";
import Song from "@/components/global/SongBar";
import { AlbumResponse } from "@/interfaces/album.interface";
import { SongResponse } from "@/interfaces/song.interface";
import { Image } from "@chakra-ui/next-js";
import { Flex, Text } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


function Playlist() {

    const id = useParams().id
    let [ data, setData ] = useState<AlbumResponse | null>()

    useEffect(() => {
        if(data) return () => {}
        getAlbum(id)
        .then((data : AlbumResponse) => {
            setData(data)
            sessionStorage.setItem('current-playlist', JSON.stringify(data))
        })
        return () => {
            data = null
        }
    }, [id])

    return (
        <Flex position={'relative'} top={0} left={0} width={'100%'} maxW={'100%'} background={'background'} height={'calc(100vh - 6.25rem)'} px={'1.25rem'} pt={'1rem'} flexDir={'column'} overflowY={'auto'} overflowX={'hidden'} pb={4}>
            <Flex gap={8} alignItems={'center'} flexDirection={['column', 'column', 'row']}>
                <Image src={data?.image[2].link + ""} loader={() => data?.image[2].link + "?w=auto&h=auto"} w={['150px', '150px' ,'250px']} h={['150px', '150px' ,'250px']} width={250} height={250} alt="playlist icons" rounded={20} priority />
                <Flex flexDirection={'column'}>
                    <Text fontSize={['1.2rem', '1.2rem', '2rem']}> {data?.name} </Text>
                    <Text fontSize={['0.8rem', '1rem', '1rem']}>Song Count : {data?.songCount} </Text>
                    <Text fontSize={['0.8rem', '1rem', '1rem']}>Artists : {typeof data?.primaryArtists == 'string' ? data?.primaryArtists : ""} </Text>
                    <Text fontSize={['0.8rem', '1rem', '1rem']}>Released : {data?.releaseDate} </Text>
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