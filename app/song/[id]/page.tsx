import getSongDetails from "@/app/server/getSongDetails.server";
import {
    Flex,
    Img,
    Text,
} from "@chakra-ui/react";
import { AddToPlaylist, FavouriteButton, PlayButton, ShareButton } from "../Buttons";
import getPlaylists from "@/database/getUserPlaylists";


async function SongPage({ params, searchParams }: any) {

    const id = params.id
    const data = (await getSongDetails(id)).data[0]

    const PlaylistNames = await (await getPlaylists()).data

    return (
        <Flex position={'relative'} top={0} left={0} width={'100%'} maxW={'100%'} background={'background'} height={['calc(100vh - 3.875rem - 8.2rem - 3rem)', 'calc(100vh - 6.25rem)', 'calc(100vh - 6.25rem)']} px={'1.25rem'} pt={'1rem'} flexDir={'column'} overflowY={'auto'} overflowX={'hidden'} pb={4} gap={8}>
            <Flex gap={5} alignItems={'center'}>
                <Img src={data.image[2].link} alt="cover image" width={300} height={300} rounded={8} />
                <Flex flexDirection={'column'} gap={4}>
                    <Text fontSize={'1.5rem'} fontWeight={'600'}> {data.name} </Text>
                    <Flex flexDirection={'column'} gap={2} flex={1}>
                        <Text> Artist : {data.primaryArtists} </Text>
                        <Text> Album : {data.album.name} </Text>
                        <Text> Release Date : {data.releaseDate} </Text>
                        <Text> Play Count : {data.playCount} </Text>
                    </Flex>
                    <Flex mt={5} alignItems={'center'} gap={5}>
                        <PlayButton searchParams={searchParams} id={id} />
                        <FavouriteButton />
                        <ShareButton />
                        <AddToPlaylist id={id} playlist={PlaylistNames} />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}



export default SongPage;