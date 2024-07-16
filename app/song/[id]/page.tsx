import getSongDetails from "@/app/server/getSongDetails.server";
import {
    Flex,
    Img,
    Text,
} from "@chakra-ui/react";
import { AddToPlaylist, DownloadButton, FavouriteButton, PlayButton, ShareButton } from "../Buttons";
import getPlaylists from "@/database/getUserPlaylists";


async function SongPage({ params, searchParams }: any) {

    const id = params.id
    let data;
    if(id) {
        const dataDetails = await getSongDetails(id)
        if(dataDetails.data !== null)
            data = dataDetails.data[0]
    }

    const PlaylistNames = await (await getPlaylists()).data

    return (
        <Flex position={'relative'} top={0} left={0} width={'100%'} maxW={'100%'} background={'background'} height={'100%'} px={'1.25rem'} pt={'1rem'} flexDir={'column'} overflowY={'auto'} overflowX={'hidden'} pb={4} gap={8}>
            <Flex gap={5} alignItems={'center'} flexDirection={['column', 'column', 'column']}>
                <Img src={data?.image[2].link} alt="cover image" width={[270, 270, 300]} height={[270, 270, 300]} rounded={8} />
                <Flex flexDirection={'column'} gap={4}>
                    <Text fontSize={'1.5rem'} fontWeight={'600'}> {data?.name} </Text>
                    <Flex flexDirection={'column'} gap={2} flex={1}>
                        <Text> Artist : {data?.primaryArtists} </Text>
                        <Text> Album : {data?.album.name} </Text>
                        <Text> Release Date : {data?.releaseDate} </Text>
                        <Text> Play Count : {data?.playCount} </Text>
                    </Flex>
                    <Flex mt={5} alignItems={'center'} gap={5} justifyContent={'center'}>
                        <PlayButton id={id} />
                        <FavouriteButton />
                        <DownloadButton link={data?.downloadUrl[4].link} />
                        <ShareButton id={id} />
                        <AddToPlaylist id={id} playlist={PlaylistNames} />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}



export default SongPage;