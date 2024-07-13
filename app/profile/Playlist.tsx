'use client'
import { Flex, Text } from "@chakra-ui/react";
import AddPlaylistComp from "./AddPlaylistComp";
import getPlaylists from "@/database/getUserPlaylists";
import PlaylistBox from "./PlaylistBox";
import { useEffect, useState } from "react";


function Playlist() {

    const [playlists, setPlaylists] = useState<any>(undefined)

    useEffect(() => {
        (async () => {
            let playlist = await getPlaylists()
            setPlaylists(playlist)
        })()

    }, [])

    return (
        <Flex flexDir={'column'}>
            <Text color={'primaryText'} fontWeight={'500'} fontSize={"1.2rem"}>
                Your playlists
            </Text>
            <Flex gap={4} overflowX={'auto'} className="hide-scroll-bar" py={3}>
                {
                    playlists?.data &&
                    playlists.data.map((el: any, idx: number) => {
                        return <PlaylistBox
                            access={el.access}
                            author={el.author}
                            folder={el.details.folder}
                            imageURL={el.details.imageURL}
                            name={el.details.name}
                            playlistId={el.playlist_id}
                            songCount={el.songs.length}
                            key={idx} />
                    })
                }
                {
                    playlists === undefined &&
                    <Flex gap={4} overflowX={'auto'} justifyContent={'center'} alignItems={'center'} className="hide-scroll-bar" py={3} w={'100%'} height={270}>
                        <Text>fetching playlists...</Text>
                    </Flex>
                }
                {
                    playlists?.data &&
                    <AddPlaylistComp />
                }
            </Flex>
        </Flex>
    )
}

export default Playlist;