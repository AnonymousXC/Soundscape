'use client'
import { SongResponse } from '@/interfaces/song.interface';
import {
    Button,
    Flex, 
    Img, 
    Text,
    Box
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation';

interface Props {
    data? : SongResponse
}

function Song(props : Props) {

    const data = props.data
    const router = useRouter()

    const handlePlay = () => {
        const url = new URL(location.href)
        if(url.searchParams.get('id'))
            url.searchParams.set('id', data?.id || '')
        else
            url.searchParams.append('id', data?.id || '')
        router.replace(url.toString())
    }

    return (
        <Flex width={'100%'} backgroundColor={'#1D1D1D'} maxHeight={'80px'} height={'4rem'} py={'0.5rem'} alignItems={'center'} justifyContent={'space-around'}>
            <Flex gap={'1rem'} alignItems={'center'} maxWidth={'25rem'} width={'100%'}>
                <Flex height={'3.5rem'} width={'3.5rem'} justifyContent={'center'} alignItems={'center'} rounded={'full'} background={'linear-gradient(to right, #B5179E , #7209B7)'}>
                    <Img src={data?.image[2].link} height={'3.4rem'} width={'3.4rem'} rounded={'full'}  />
                </Flex>
                <Text fontWeight={500}>{data?.name} - {data?.primaryArtists}</Text>
            </Flex>
            <Text>{calculateTime(parseInt(data?.duration || '0'))}</Text>
            <Box></Box>
            <Button variant={'unstyled'} alignItems={'center'} display={'flex'} onClick={handlePlay}>
                <Img src={'icons/player/Play.svg'} />
            </Button>
        </Flex>
    )
}

function calculateTime(secs : number) {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
}

export default Song;