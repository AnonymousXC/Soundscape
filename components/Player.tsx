'use client'
import { 
    Flex, 
    Img,
    Skeleton,
    SkeletonText,
    Text,
    Button,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Stack,
} from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { createRef, useEffect, useState } from "react";
import getSongDetails from "@/app/actions/getSongDetails.server";
import { SongResponse } from "@/interfaces/song.interface";

const audio = createRef<HTMLAudioElement>()

function Player() {

    const params = useSearchParams()
    const id = params.get('id') || ''
    const [ data, setData ] = useState<SongResponse>()
    const [ loaded, setLoaded ] = useState<boolean>(false)
    const [ isPlaying, setPlaying ] = useState<boolean>(false)
    var [ currentTime, setCurrentTime ] = useState<number>(0)
    
    useEffect(() => {
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
            {/* Control buttons */}
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
            <audio src={data?.downloadUrl[4].link} ref={audio} 
            onPlay={() => {
                setPlaying(true)
            }} 
            onPause={() => {
                setPlaying(false)
            }} 
            autoPlay={true}
            onTimeUpdate={(e) => {
                setCurrentTime(audio.current?.currentTime || 0)
            }}></audio>
            {/* Control slider */}
            <Stack width={'100%'} maxWidth={'27rem'} ml={'1.8rem'} justifyContent={'center'} gap={'2px'}>
                <Slider max={parseInt(data?.duration || '0')}
                onChangeEnd={(e) => {
                    if(audio.current?.currentTime)
                        audio.current.currentTime = e
                }}>
                    <SliderTrack backgroundColor={'#464646'}>
                        <SliderFilledTrack background={'linear-gradient(to right, #B5179E , #7209B7)'} />
                    </SliderTrack>
                    <SliderThumb background={'linear-gradient(to right, #B5179E , #7209B7)'} width={'12px'} height={'12px'} />
                </Slider>
                <Flex justifyContent={'space-between'}>
                    <Text fontSize={'0.625rem'} color={'primaryText'}>{calculateTime(parseInt(data?.duration ?? '0'))}</Text>
                    <Text fontSize={'0.625rem'} color={'primaryText'}>{calculateTime(currentTime || 0)}</Text>
                </Flex>
            </Stack>
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

const calculateTime = (secs : number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
}

export default Player;
export { audio }