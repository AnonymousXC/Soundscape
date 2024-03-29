import {
    Button,
    Flex,
    Text,
} from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import getTrending from '../actions/getTrending.server';
import Song from '@/components/SearchSongBar';

function TopMusic() {

    const [ trendingSongs, setTrendingSongs ] = useState<any>([])

    useEffect(() => {
        getTrending()
        .then((data : any) => {
            setTrendingSongs(data.data.trending.songs)
            console.log(data.data.trending.songs)
        })
    }, [trendingSongs])

    return (
        <Flex mt={"1rem"} flexDirection={'column'}>
            <Flex alignItems={'center'} justifyContent={'space-between'}>
                <Flex gap={'0.5rem'} alignItems={'center'}>
                    <Image src={'icons/Headphone icon.svg'} width={6} height={6} alt="music" />
                    <Text color={'primaryText'} fontWeight={'500'} fontSize={"1.2rem"}>
                        Top Music
                    </Text>
                </Flex>
                <Button variant={'unstyled'} fontSize={'0.8rem'} fontWeight={"400"} className='gradient-text'>
                    Show more &gt;&gt;
                </Button>
            </Flex>
            <Flex width={'100%'} mt={'1.5rem'} height={'100%'} overflowY={'auto'} flexDirection={'column'} gap={'0.4rem'} overflowX={'hidden'} className='hide-scroll-bar'>
            {/* {
                trendingSongs.map((val : any, idx : number) => {
                    return <Song data={val} key={idx} />
                })
            } */}
        </Flex>
        </Flex>
    )
}

export default TopMusic;