import { SongResponse } from '@/interfaces/song';
import {
    Flex,
    Heading,
    Text,
} from '@chakra-ui/react'
import getSongDetailsMulti from '../server/getSongDetailsMulti.server';
import Song from '@/components/global/SongBar';
import Love from '@/assets/icons/Love';
import getFavouriteSongs from '@/database/getFavouriteSongs';
import Link from 'next/link';
import { Suspense, cache } from 'react';

const getFavCache = cache(getFavouriteSongs)

async function Favorite() {

    let getFavSongs = await getFavCache()
    if (!getFavSongs)
        return (
            <Flex position={'relative'} top={0} left={0} width={'100%'} maxW={'100%'} background={'background'} height={'calc(100vh - 6.25rem)'} px={'1.25rem'} pt={'1rem'} flexDir={'column'} justifyContent={'center'} alignItems={'center'}>
                <Heading display={'flex'} gap={3}>
                    <Link href={'/login'}>
                        <Heading className='gradient-text'>
                            Sign in
                        </Heading>
                    </Link> to see your songs
                </Heading>
            </Flex>
        )
    else if (getFavSongs.length != 0) {
        getFavSongs = getFavSongs![0].songs
        const songsData = await getSongDetailsMulti(getFavSongs)

        return (
            <Flex position={'relative'} top={0} left={0} width={'100%'} maxW={'100%'} background={'background'} height={'100%'} px={'1.25rem'} pt={'1rem'} flexDir={'column'}>
                <Flex alignItems={'center'} gap={"0.5rem"}>
                    <Love isActive={true} />
                    <Text color={'primaryText'} fontWeight={'500'} fontSize={"1.2rem"}>
                        Favourites
                    </Text>
                </Flex>
                <Flex width={'100%'} mt={'1.5rem'} height={'100%'} overflowY={'auto'} flexDirection={'column'} gap={'0.4rem'} overflowX={'hidden'} className='hide-scroll-bar' px={1} pb={'1rem'}>
                    <Suspense>

                    {
                        songsData &&
                        songsData.map((val: SongResponse, idx: number) => {
                            return (<Song data={val} key={idx} />)
                        })
                    }
                    </Suspense>
                </Flex>
            </Flex>
        )
    }
    else {
        return (
            <Flex position={'relative'} top={0} left={0} width={'100%'} maxW={'100%'} background={'background'} height={'100%'} px={'1.25rem'} pt={'1rem'} flexDir={'column'} justifyContent={'center'} alignItems={'center'}>
                <Heading display={'flex'} gap={3}>
                        <Heading className='gradient-text'>
                            Add songs
                        </Heading>
                         to your favourites
                </Heading>
            </Flex>
        )
    }
}

export default Favorite;