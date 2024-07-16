'use server'
import { Flex, Text } from "@chakra-ui/react";
import AddPlaylistComp from "./AddPlaylistComp";
import getPlaylists from "@/database/getUserPlaylists";
import PlaylistBox from "./PlaylistBox";
import { cache } from "react";

const cachePlaylist = cache(getPlaylists)

async function Playlist() {

    const playlists = await cachePlaylist()

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