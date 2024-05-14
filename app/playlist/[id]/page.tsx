import getSongDetailsMulti from "@/app/server/getSongDetailsMulti.server";
import Song from "@/components/global/SongBar";
import getPlaylistSongs from "@/database/getPlaylistSongs";
import { Flex, Text } from "@chakra-ui/react";


async function Playlist({ params, searchParams } : { params: any, searchParams: any }) {

    const playlistData = (await getPlaylistSongs(params.id))
    const songs = playlistData![0].songs
    const songData = await getSongDetailsMulti(songs)

    return (
        <Flex position={'relative'} top={0} left={0} width={'100%'} maxW={'100%'} background={'background'} height={['calc(100vh - 3.875rem - 8.2rem - 3rem)','calc(100vh - 6.25rem)','calc(100vh - 6.25rem)']} px={'1.25rem'} pt={'1rem'} flexDir={'column'} overflowY={'auto'} overflowX={'hidden'} pb={4} gap={2}>
            <Text fontSize={'1.5rem'} fontWeight={'500'} my={4}>
                Playlist : {playlistData![0].details.name}
            </Text>
            {
                songData.map((el : any, idx : number) => {
                    return <Song data={el} key={idx} />
                })
            }
        </Flex>
    )
}

export default Playlist;