import getSongDetailsMulti from "@/app/server/getSongDetailsMulti.server";
import Song from "@/components/global/SongBar";
import getPlaylistSongs from "@/database/getPlaylistSongs";
import { Flex, Text } from "@chakra-ui/react";
import MenuBTN from "../Menu";


async function Playlist({ params, searchParams }: { params: any, searchParams: any }) {

    const playlistData = (await getPlaylistSongs(params.id))
    const songs = playlistData![0].songs
    const songData = await getSongDetailsMulti(songs)

    return (
        <Flex position={'relative'} top={0} left={0} width={'100%'} maxW={'100%'} background={'background'} height={'100%'} px={'1.25rem'} pt={'1rem'} flexDir={'column'} overflowY={'auto'} overflowX={'hidden'} pb={4} gap={2}>
            <Text color={'primaryText'} fontWeight={'500'} fontSize={"1.2rem"} my={4}>
                Playlist : {playlistData![0].details.name}
            </Text>
            {
                songData.map((el: any, idx: number) => {
                    return (
                        <Flex alignItems={'center'} gap={4} key={idx}>
                            <Song data={el} key={idx} />
                            <MenuBTN id={el.id} playlist_id={params.id} key={idx} />
                        </Flex>
                    )
                })
            }
        </Flex>
    )
}

export default Playlist;