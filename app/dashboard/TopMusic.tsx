import {
    Button,
    Flex,
    Text,
} from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import getTrending from '../server/getTrending.server';
import Song from '@/components/search/SearchSongBar';
import { SongResponse } from '@/interfaces/song.interface';
import { useRouter } from 'next/navigation';

function TopMusic() {

    const [trendingSongs, setTrendingSongs] = useState<Array<SongResponse>>([])
    const router = useRouter()

    const handleRouteChange = (path : string) => {
        const url = new URL(window.location.href)
        router.push(path + '?' + url.searchParams.toString())
    }

    useEffect(() => {

        (async () => {
            const data = await getTrending()
            setTrendingSongs(data.data.trending.songs)
        })()

    }, [])

    return (
        <Flex mt={"1rem"} flexDirection={'column'} height={'calc(100% - 9rem)'}>
            <Flex alignItems={'center'} justifyContent={'space-between'}>
                <Flex gap={'0.5rem'} alignItems={'center'}>
                    <Image src={'icons/Headphone icon.svg'} width={6} height={6} alt="music" />
                    <Text color={'primaryText'} fontWeight={'500'} fontSize={"1.2rem"}>
                        Top Music
                    </Text>
                </Flex>
                <Button variant={'unstyled'} fontSize={'0.8rem'} fontWeight={"400"} className='gradient-text' 
                onClick={() => {
                    handleRouteChange('/trending')
                }}>
                    Show more &gt;&gt;
                </Button>
            </Flex>
            <Flex width={'100%'} mt={'1.5rem'} height={'100%'} overflowY={'auto'} flexDirection={'column'} gap={'0.4rem'} overflowX={'hidden'} className='hide-scroll-bar' px={1}>
                {
                    trendingSongs.length > 0 &&
                    trendingSongs.map((val: SongResponse, idx: number) => {
                        return (<Song data={val} key={idx} />)
                    })
                }
            </Flex>
        </Flex>
    )
}

export default TopMusic;