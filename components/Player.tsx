'use client'
import { 
    Flex, 
    Img,
    Skeleton,
    SkeletonText,
    Text,
    Button,
} from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { createRef, useEffect, useState } from "react";
import getSongDetails from "@/app/actions/getSongDetails.server";
import { SongResponse } from "@/interfaces/song.interface";

function Player() {

    const params = useSearchParams()
    const id = params.get('id') || ''
    const [ data, setData ] = useState<SongResponse>()
    const [ loaded, setLoaded ] = useState<boolean>(false)
    const [ isPlaying, setPlaying ] = useState<boolean>(false)
    const audio = createRef<HTMLAudioElement>()
    
    useEffect(() => {
        audio.current?.pause()
        getSongDetails(id)
        .then((val) => {
            if(val.status == 'SUCCESS')
            {
                setData(val.data[0])
                updateNavigator(val.data[0])
            }
            setLoaded(true)
            if(!id) 
                setLoaded(false)
        })  
    }, [id])

    return (
        <Flex width={'100vw'} height={'6.25rem'} position={'absolute'} backgroundColor={'sidebarBG'} bottom={0} left={0} zIndex={10000}>
            <Flex className="song-details" width={'100%'} maxWidth={'15rem'} justifyContent={'space-around'} alignItems={'center'}>
                <Skeleton isLoaded={loaded} rounded={'full'}>
                    <Flex width={'4.4rem'} height={"4.4rem"} rounded={'full'} className="border-image-gradient" justifyContent={'center'} alignItems={'center'} animation={'rotating 4s linear infinite'} style={{
                        animationPlayState: isPlaying ? 'running' : 'paused'
                    }}>
                        <Img src={data?.image[2].link} width={"4.1rem"} height={"4.1rem"} rounded={"full"} />
                    </Flex>
                </Skeleton>
                <Flex flexDirection={'column'} maxW={'6.25rem'} width={'100%'}>
                    <SkeletonText isLoaded={loaded} height={'3rem'}>
                        <Text color={'#fff'} fontSize={'1.2rem'} fontWeight={500} maxHeight={'1.875rem'} overflow={'hidden'} textOverflow={'ellipsis'} whiteSpace={'nowrap'} width={'100%'}>{data?.name}</Text>
                        <Text color={'primaryText'} fontWeight={400} fontSize={'0.75rem'} maxHeight={'1.125rem'} overflow={'hidden'} textOverflow={'ellipsis'} whiteSpace={'nowrap'}>{data?.primaryArtists}</Text>
                    </SkeletonText>
                </Flex>
            </Flex>
            <Flex maxWidth={'270px'} w={'100%'} justifyContent={'space-between'} alignItems={'center'} ml={'30px'}>
                <Button variant={'unstyled'} textAlign={'center'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Img src={'icons/player/Play Previous.svg'} height={'1rem'} width={'auto'} />
                </Button>
                <Button variant={'unstyled'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Img src={'icons/player/Backward.svg'} height={'1.18rem'} width={'auto'} />
                </Button>
                <Button variant={'unstyled'} width={'40px'} height={'40px'} rounded={'full'} backgroundImage={'var(--var-main-dark-gradient)'} display={'flex'} justifyContent={'center'} alignItems={'center'} onClick={() => {
                    if(audio.current?.paused === true)
                        audio.current?.play()
                    else
                        audio.current?.pause()
                }}>
                    <Img src={isPlaying ? 'icons/player/Pause.svg' : 'icons/player/Play.svg'} height={'1rem'} width={'auto'} />
                </Button>
                <Button variant={'unstyled'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Img src={'icons/player/Forward.svg'} height={'1.18rem'} width={'auto'} />
                </Button>
                <Button variant={'unstyled'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Img src={'icons/player/Play Next.svg'} height={'1rem'} width={'auto'} />
                </Button>
            </Flex>
            <audio src={data?.downloadUrl[4].link} ref={audio} onPlay={() => {
                setPlaying(true)
            }} onPause={() => {
                setPlaying(false)
            }}></audio>
        </Flex>
    )
}

function updateNavigator(data : SongResponse) {
    if('mediaSession' in navigator)
        navigator.mediaSession.metadata = new MediaMetadata({
            title: data.name,
            artist: data.primaryArtists,
            artwork: [
                {
                    src : data.image[0].link,
                    sizes: data.image[0].quality
                },
                {
                    src : data.image[1].link,
                    sizes: data.image[1].quality
                },
                {
                    src : data.image[2].link,
                    sizes: data.image[2].quality
                }
            ]
        })
}

export default Player;