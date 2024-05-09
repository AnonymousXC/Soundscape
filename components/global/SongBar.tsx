'use client'
import { SongResponse } from '@/interfaces/song.interface';
import { Image } from '@chakra-ui/next-js';
import {
    Button,
    Flex, 
    Text,
    Box
} from '@chakra-ui/react'
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface Props {
    data? : SongResponse | null
}

function Song(props : Props) {

    let data = props.data
    let router = useRouter()
    let paused : number | null = parseInt(useSearchParams().get('paused') || '0')
    let id = useSearchParams().get('id')
    let playing = data?.id === id && paused === 0

    useEffect(() => {

        return () => {
            data = null
            paused = null
        }

    }, [])


    const handlePlay = () => {
        const url = new URL(location.href)
        
        if(url.searchParams.get('id') == data?.id)
        {
            const audio = document.querySelector('audio')
            if(audio?.paused == true)
                audio?.play()
            else
                audio?.pause()
            return
        }
        
        if(url.searchParams.get('id'))
            url.searchParams.set('id', data?.id || '')
        else
            url.searchParams.append('id', data?.id || '')
        router.replace(url.toString())
    }

    return (
        <Flex width={'100%'} maxHeight={'80px'} height={'4rem'} py={'0.5rem'} alignItems={'center'} justifyContent={'space-around'} background={'rgba(35,35,35,0.3)'} transition={'200ms'} fontWeight={500} 
        _hover={{ transform: 'scale(1.02)' }} rounded={6}>
            <Flex gap={'1rem'} alignItems={'center'} maxWidth={'25rem'} width={'100%'}>
                <Flex height={'3.5rem'} width={'3.5rem'} justifyContent={'center'} alignItems={'center'} rounded={'full'} background={'linear-gradient(to right, #B5179E , #7209B7)'}
                animation={'rotating 4s linear infinite'} style={{
                    animationPlayState: data?.id === id && paused === 0 ? 'running' : 'paused'
                }}>
                    <Image alt='Song picture' src={data?.image[2].link || ''} loader={() => data?.image[2].link + "?w=3.4rem&h=auto" || ''} height={54} width={54} minWidth={'3.4rem'} h={'auto'} rounded={'full'}  />
                </Flex>
                <Text noOfLines={2} background={data?.id == id ? 'linear-gradient(to right, #B5179E , #7209B7)'  : '#B8B8B8'} textColor={'transparent'} backgroundClip={'text'}>{data?.name + ' - ' + (typeof data?.primaryArtists == 'string' ? data?.primaryArtists : data?.primaryArtists[0].name)}</Text>
            </Flex>
            <Text display={['none', 'none', 'block']} background={data?.id == id ? 'linear-gradient(to right, #B5179E , #7209B7)'  : '#B8B8B8'} textColor={'transparent'} backgroundClip={'text'}>{calculateTime(parseInt(data?.duration || '0'))}</Text>
            <Box></Box>
            <Button variant={'unstyled'} alignItems={'center'} display={'flex'} onClick={handlePlay} >
                <Image loader={() => playing == false ? '/icons/player/Play.svg' : '/icons/player/Pause.svg?'} src={playing == false ? '/icons/player/Play.svg' : '/icons/player/Pause.svg '} width={20} height={20} h={'1.25rem'} w={'auto'} alt='play-pause-btn' />
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