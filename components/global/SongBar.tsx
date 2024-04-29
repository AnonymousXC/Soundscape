'use client'
import { SongResponse } from '@/interfaces/song.interface';
import {
    Button,
    Flex, 
    Img, 
    Text,
    Box
} from '@chakra-ui/react'
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props {
    data? : SongResponse | null
}

function Song(props : Props) {

    let data = props.data
    let router = useRouter()
    let paused = useSearchParams().get('paused')
    let id = useSearchParams().get('id')
    let [ playing, setPlaying ] = useState<boolean | null>(false)

    useEffect(() => {
        if(parseInt(paused || '0') == 0 && data?.id == id)
            setPlaying(true)
        else
            setPlaying(false)

        return () => {
            data = null
            paused = null
            // id = null
            playing = null
        }

    }, [paused, id, props])


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
                    animationPlayState: playing ? 'running' : 'paused'
                }}>
                    <Img src={data?.image[2].link} height={'3.4rem'} minWidth={'3.4rem'} rounded={'full'}  />
                </Flex>
                <Text background={data?.id == id ? 'linear-gradient(to right, #B5179E , #7209B7)'  : '#B8B8B8'} textColor={'transparent'} backgroundClip={'text'}>{data?.name + ' - ' + (typeof data?.primaryArtists == 'string' ? data?.primaryArtists : data?.primaryArtists[0].name)}</Text>
            </Flex>
            <Text background={data?.id == id ? 'linear-gradient(to right, #B5179E , #7209B7)'  : '#B8B8B8'} textColor={'transparent'} backgroundClip={'text'}>{calculateTime(parseInt(data?.duration || '0'))}</Text>
            <Box></Box>
            <Button variant={'unstyled'} alignItems={'center'} display={'flex'} onClick={handlePlay} >
                <Img src={playing == false ? '/icons/player/Play.svg' : '/icons/player/Pause.svg '} height={'1.25rem'} width={'auto'} />
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