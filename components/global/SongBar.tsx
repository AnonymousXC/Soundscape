'use client'
import { SongResponse } from '@/interfaces/song';
import { Image } from '@chakra-ui/next-js';
import {
    Button,
    Flex,
    Text,
    Box,
    Skeleton
} from '@chakra-ui/react'
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { startLoading } from './TopLoadingBar';

interface Props {
    data?: SongResponse | null
}

function Song(props: Props) {

    let data = props.data
    data!.name = data!.name.replaceAll('&amp;', "") || ''
    let songBarID = data?.id
    let router = useRouter()
    let paused: number | null = parseInt(useSearchParams().get('paused') || '0')
    let id = useSearchParams().get('id')
    let playing = data?.id === id && paused === 0
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {


        return () => {
            data = null
            paused = null
        }

    }, [])


    const handlePlay = (e: any) => {
        e.stopPropagation()
        const url = new URL(location.href)

        if (url.searchParams.get('id') == data?.id) {
            if(window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                    eventType: "togglePlay"
                }))
                if(url.searchParams.get('paused'))
                    window.playSongRN()
                else
                    window.pauseSongRN()
                return;
            }
            const audio = document.querySelector('audio')
            if (audio?.paused == true)
                audio?.play()
            else
                audio?.pause()
            return
        }

        if (url.searchParams.has('id'))
            url.searchParams.set('id', songBarID || '')
        else
            url.searchParams.append('id', songBarID || '')
        router.replace(url.toString())
    }


    const handleRouteChange = (path: string) => {
        const url = new URL(window.location.href)
        if (url.toString().includes(id || '') && url.toString().includes('song'))
            return
        startLoading()
        router.push(path + '?' + url.searchParams.toString())
    }

    return (
        <Flex width={'100%'} maxHeight={'80px'} height={'4rem'} py={'0.5rem'} alignItems={'center'} justifyContent={'space-around'} background={'rgba(35,35,35,0.3)'} transition={'200ms'} fontWeight={500} cursor={'pointer'}
            onClick={() => { handleRouteChange('/song/' + props.data?.id) }}
            _hover={{ transform: 'scale(1.02)' }} rounded={6} className='song-bar'>
            <Flex gap={'1rem'} alignItems={'center'} maxWidth={'25rem'} width={'100%'}>
                <Skeleton isLoaded={loaded} rounded={'full'} height={'3.5rem'} width={'3.5rem'} >
                    <Flex height={'3.5rem'} width={'3.5rem'} justifyContent={'center'} alignItems={'center'} rounded={'full'} background={'linear-gradient(to right, #B5179E , #7209B7)'}
                        animation={'rotating 4s linear infinite'} style={{
                            animationPlayState: data?.id === id && paused === 0 ? 'running' : 'paused'
                        }}>

                        <Image alt='Song picture' src={data?.image[2].link || ''} loader={() => data?.image[2].link + "?w=3.4rem&h=auto" || ''} height={54} width={54} minWidth={'3.4rem'} h={'auto'} rounded={'full'} onLoadingComplete={() => setLoaded(true)} />
                    </Flex>
                </Skeleton>
                <Text className='song-bar' noOfLines={2} background={data?.id == id ? 'linear-gradient(to right, #B5179E , #7209B7)' : '#B8B8B8'} textColor={'transparent'} backgroundClip={'text'} dangerouslySetInnerHTML={{ __html : data?.name + ' - ' + (typeof data?.primaryArtists == 'string' ? data?.primaryArtists : data?.primaryArtists[0].name) }}></Text>
            </Flex>
            <Text className='song-bar' display={['none', 'none', 'block']} background={data?.id == id ? 'linear-gradient(to right, #B5179E , #7209B7)' : '#B8B8B8'} textColor={'transparent'} backgroundClip={'text'}>{calculateTime(parseInt(data?.duration || '0'))}</Text>
            <Box></Box>
            <Button className='song-bar' variant={'unstyled'} alignItems={'center'} display={'flex'} onClick={handlePlay} zIndex={1000}>
                <Image loader={() => playing == false ? '/icons/player/Play.svg' : '/icons/player/Pause.svg?'} src={playing == false ? '/icons/player/Play.svg' : '/icons/player/Pause.svg '} width={20} height={20} h={'1.25rem'} w={'auto'} alt='play-pause-btn' />
            </Button>
        </Flex>
    )
}

function calculateTime(secs: number) {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
}

export default Song;