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
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, createRef, useEffect, useState } from "react";
import getSongDetails from "@/app/server/getSongDetails.server";
import { SongResponse } from "@/interfaces/song.interface";
import Love from "@/assets/icons/Love";
import Loop from "@/assets/icons/Loop";
import Shuffle from "@/assets/icons/Shuffle";
import Share from "@/assets/icons/Share";
import addToFavourites from "@/database/addToFavourites";
import { toast } from "react-toastify";
import getFavouriteSongs from "@/database/getFavouriteSongs";


function Player() {

    const params = useSearchParams()
    const id = params.get('id') || ''
    const router = useRouter()
    const [data, setData] = useState<SongResponse | null | undefined>()
    const [loaded, setLoaded] = useState<boolean>(false)
    const [isPlaying, setPlaying] = useState<boolean>(false)
    const [loop, setLoop] = useState<boolean>(false)
    const [isFavourite, setIsFavourite] = useState<boolean>(false)
    const audio = createRef<HTMLAudioElement>()
    var [currentTime, setCurrentTime] = useState<number>(0)

    useEffect(() => {

        // get song
        getSongDetails(id)
            .then((val) => {
                if (val.status == 'SUCCESS') {
                    setData(val.data[0])
                    updateNavigator(val.data[0])
                }
                setLoaded(true)
                if (!id)
                    setLoaded(false)
            })

        // loop handler
        if (localStorage.getItem("loop")) {
            if (JSON.parse(localStorage.getItem("loop") || "") == true)
                setLoop(true)
            else
                setLoop(false)
        }
        else
            localStorage.setItem("loop", "false")

        // favourite handler
        getFavouriteSongs()
            .then((data: any) => {
                if (data) { 
                    const songs = data[0].songs
                    if (songs.indexOf(id) !== -1)
                        setIsFavourite(true)
                    else
                        setIsFavourite(false)
                }
            })

        // recent played handler
        if (id) {
            let recentData: Array<string> = JSON.parse(localStorage.getItem('recents') || '[]')
            recentData = [id, ...recentData]
            if (recentData.length > 11)
                recentData.pop()
            localStorage.setItem('recents', JSON.stringify(recentData))
        }

        console.log(data)

        return () => {
            setData(null)
        }

    }, [id])

    return (
        <Flex display={['flex', 'flex', 'flex']} width={'100%'} height={['8.2rem', '8.2rem', '6.25rem']} position={['fixed', 'fixed', 'absolute']} backgroundColor={'background'} bottom={["3.875rem", "3.875rem", "0"]} left={0} zIndex={10000} justifyContent={'space-evenly'} boxShadow={['' , '' , '1px 3px 25px rgb(0 0 0 / 0.8)']} flexDirection={['column-reverse', 'column-reverse', 'row']} pt={[1, 1, 0]} gap={[1, 1, 0]} px={[4, 4, 0]}>
            <Flex display={['none', 'none', 'flex']} className="song-details" width={'100%'} maxWidth={'15rem'} justifyContent={'space-around'} alignItems={'center'}>
                <Skeleton isLoaded={loaded} rounded={'full'}>
                    <Flex width={'4.4rem'} height={"4.4rem"} rounded={'full'} className="border-image-gradient" justifyContent={'center'} alignItems={'center'} animation={'rotating 4s linear infinite'} style={{
                        animationPlayState: isPlaying ? 'running' : 'paused'
                    }}>
                        <Img src={data?.image[2].link} width={"4.1rem"} height={"4.1rem"} rounded={"full"} />
                    </Flex>
                </Skeleton>
                <Flex flexDirection={'column'} maxW={'7.5rem'} width={'100%'}>
                    <SkeletonText isLoaded={loaded} height={'3rem'}>
                        <Text color={'primaryTextRe'} fontSize={'1.2rem'} fontWeight={500} maxHeight={'1.875rem'} overflow={'hidden'} textOverflow={'ellipsis'} whiteSpace={'nowrap'} width={'100%'}>{data?.name}</Text>
                        <Text color={'primaryText'} fontWeight={400} fontSize={'0.75rem'} maxHeight={'1.125rem'} overflow={'hidden'} textOverflow={'ellipsis'} whiteSpace={'nowrap'}>{typeof data?.primaryArtists == 'string' ? data?.primaryArtists : data?.primaryArtists[0].name}</Text>
                    </SkeletonText>
                </Flex>
            </Flex>
            {/* Control buttons */}
            <Flex maxWidth={['100%', '100%', '270px']} w={'100%'} justifyContent={'space-between'} alignItems={'center'} ml={[0, 0, '30px']}>
                <Button variant={'unstyled'} textAlign={'center'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Img src={'icons/player/Play Previous.svg'} height={'1rem'} width={'auto'} />
                </Button>
                <Button variant={'unstyled'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Img src={'icons/player/Backward.svg'} height={'1.18rem'} width={'auto'} />
                </Button>
                <Button variant={'unstyled'} width={'40px'} height={'40px'} rounded={'full'} backgroundImage={'var(--var-main-dark-gradient)'} display={'flex'} justifyContent={'center'} alignItems={'center'} onClick={() => {
                    if (audio.current?.paused === true)
                        audio.current?.play()
                    else
                        audio.current?.pause()
                }}>
                    <Img src={isPlaying ? '/icons/player/Pause.svg' : '/icons/player/Play.svg'} height={'1rem'} width={'auto'} />
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
                    const url = new URL(window.location.href)
                    if (url.searchParams.get('paused')) {
                        url.searchParams.delete('paused')
                        router.replace(url.toString())
                    }

                }}
                onPause={() => {
                    setPlaying(false)
                    const url = new URL(window.location.href)
                    if (!url.searchParams.get('paused')) {
                        url.searchParams.append('paused', '1')
                        router.replace(url.toString())
                    }
                }}
                autoPlay={true}
                onTimeUpdate={(e) => {
                    setCurrentTime(Math.floor(audio.current?.currentTime || 0))
                }}
                loop={loop}></audio>
            {/* Control slider */}
            <Stack width={'100%'} maxWidth={['100%', '100%', '27rem']} ml={[0, 0, '1.8rem']} justifyContent={'center'} gap={'2px'}>
                <Skeleton isLoaded={loaded} height={'12px'} display={'flex'}>
                    <Slider max={parseInt(data?.duration || '0')} value={currentTime} defaultValue={0} focusThumbOnChange={false}
                        onChange={(e) => {
                            if (audio.current?.currentTime)
                                audio.current.currentTime = e
                        }}>
                        <SliderTrack backgroundColor={'#464646'}>
                            <SliderFilledTrack background={'linear-gradient(to right, #B5179E , #7209B7)'} />
                        </SliderTrack>
                        <SliderThumb background={'linear-gradient(to right, #B5179E , #7209B7)'} width={'12px'} height={'12px'} boxShadow={'none !important'} />
                    </Slider>
                </Skeleton>
                <Flex justifyContent={'space-between'}>
                    <Text fontSize={'0.625rem'} color={'primaryText'}>{calculateTime(parseInt(data?.duration ?? '0'))}</Text>
                    <Text fontSize={'0.625rem'} color={'primaryText'}>{calculateTime(currentTime || 0)}</Text>
                </Flex>
            </Stack>
            <Flex alignItems={'center'} pl={'20px'} maxWidth={'8rem'} width={'100%'} gap={'0.1rem'} display={['none', 'none', "flex"]}>
                <Button variant={'unstyled'} size={'sm'}>
                    <Img src={'icons/player/Volume.svg'} height={'auto'} width={'24px'} />
                </Button>
                <Slider defaultValue={100} max={100} min={1}
                    onChangeEnd={(e) => {
                        if (audio.current?.volume)
                            audio.current.volume = e / 100
                    }}>
                    <SliderTrack backgroundColor={'#464646'}>
                        <SliderFilledTrack background={'linear-gradient(to right, #B5179E , #7209B7)'} />
                    </SliderTrack>
                    <SliderThumb background={'linear-gradient(to right, #B5179E , #7209B7)'} width={'12px'} height={'12px'} boxShadow={'none !important'} />
                </Slider>
            </Flex>
            {/* extra buttons */}
            <Flex ml={[0, 0, '1.875rem']} w={['100%', '100%', 'unset']} justifyContent={'center'} alignItems={'center'} gap={'1rem'}>
                <Flex display={['flex', 'flex', 'none']} className="song-details" width={'100%'} maxWidth={'15rem'} alignItems={'center'} gap={3}>
                    <Skeleton isLoaded={loaded} rounded={'full'}>
                        <Flex width={'2rem'} height={"2rem"} rounded={'full'} className="border-image-gradient" justifyContent={'center'} alignItems={'center'} animation={'rotating 4s linear infinite'} style={{
                            animationPlayState: isPlaying ? 'running' : 'paused'
                        }}>
                            <Img src={data?.image[2].link} width={"1.9rem"} height={"1.9rem"} rounded={"full"} />
                        </Flex>
                    </Skeleton>
                    <Flex flexDirection={'column'} width={'100%'} maxW={'130px'}>
                        <SkeletonText isLoaded={loaded} noOfLines={2}>
                            <Text color={'primaryTextRe'} fontSize={'1rem'} fontWeight={500} maxHeight={'1.875rem'} overflow={'hidden'} textOverflow={'ellipsis'} whiteSpace={'nowrap'} width={'100%'}>{data?.name}</Text>
                            <Text color={'primaryText'} fontWeight={400} fontSize={'0.6rem'} maxHeight={'1.125rem'} overflow={'hidden'} textOverflow={'ellipsis'} whiteSpace={'nowrap'}>{typeof data?.primaryArtists == 'string' ? data?.primaryArtists : data?.primaryArtists[0].name}</Text>
                        </SkeletonText>
                    </Flex>
                </Flex>
                <Button variant={'unstyled'} size={'sm'} display={['none', 'none', 'flex']}>
                    <Shuffle />
                </Button>
                <Button variant={'unstyled'} size={'sm'} onClick={() => {
                    setLoop(!loop)
                    localStorage.setItem("loop", !loop + "")
                }}>
                    <Loop isActive={loop} />
                </Button>
                <Button variant={'unstyled'} size={'sm'} onClick={async () => {
                    // addToFavouriteLocal(id, setIsFavourite)
                    const status = await addToFavourites(id)
                    if (status!.status === 200) {
                        setIsFavourite(true)
                        toast.success("Successfull added song to favourites")
                    }
                    else if (status.status === 300) {
                        setIsFavourite(false)
                        toast.warn("Successfully removed from favourites")
                    }
                    else
                        toast.error("Error occured while performing action")
                }}>
                    <Love isActive={isFavourite} />
                </Button>
                <Button variant={'unstyled'} size={'sm'} onClick={() => { shareSong(data || undefined) }}>
                    <Share />
                </Button>
            </Flex>
        </Flex>
    )
}

function addToFavouriteLocal(id: string, setFavouriteButton: Dispatch<SetStateAction<boolean>>) {
    if (localStorage.getItem('favourite')) {
        let favArray: Array<string> = JSON.parse(localStorage.getItem('favourite') || '[]')
        if (favArray.indexOf(id) != -1) {
            favArray.splice(favArray.indexOf(id), 1)
            localStorage.setItem('favourite', JSON.stringify(favArray))
            setFavouriteButton(false)
        }
        else {
            favArray.push(id)
            favArray.sort()
            localStorage.setItem('favourite', JSON.stringify(favArray))
            setFavouriteButton(true)
        }
    }
    else
        localStorage.setItem('favourite', `["${id}"]`)
}

function updateNavigator(data: SongResponse) {
    if ('mediaSession' in navigator)
        navigator.mediaSession.metadata = new MediaMetadata({
            title: data.name,
            artist: typeof data?.primaryArtists == 'string' ? data?.primaryArtists : data?.primaryArtists[0].name,
            artwork: [
                {
                    src: data.image[0].link,
                    sizes: data.image[0].quality
                },
                {
                    src: data.image[1].link,
                    sizes: data.image[1].quality
                },
                {
                    src: data.image[2].link,
                    sizes: data.image[2].quality
                }
            ]
        })
}

function calculateTime(secs: number) {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
}

function shareSong(data: SongResponse | undefined) {
    const url = location.toString()
    navigator.share({
        url: url,
        text: 'Listen to song.',
        title: data?.name,
    })
}

export default Player;