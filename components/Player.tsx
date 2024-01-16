'use client'
import { 
    Flex, 
    Img,
    Skeleton,
    SkeletonCircle,
    SkeletonText,
    Text,
} from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import getSongDetails from "@/app/actions/getSongDetails.server";
import { SongResponse } from "@/interfaces/song.interface";

function Player() {

    const params = useSearchParams()
    const id = params.get('id') || ''
    const [ data, setData ] = useState<SongResponse>()
    const [ loaded, setLoaded ] = useState<boolean>(false)
    
    useEffect(() => {
        getSongDetails(id)
        .then((val) => {
            if(val.status == 'SUCCESS')
                setData(val.data[0])
            setLoaded(true)
            if(!id) 
                setLoaded(false)
        })  
    }, [id])

    return (
        <Flex width={'100vw'} height={'6.25rem'} position={'absolute'} backgroundColor={'sidebarBG'} bottom={0} left={0} zIndex={10000}>
            <Flex className="song-details" width={'100%'} maxWidth={'15rem'} justifyContent={'space-around'} alignItems={'center'}>
                <Skeleton isLoaded={loaded} rounded={'full'}>
                    <Flex width={'4.4rem'} height={"4.4rem"} rounded={'full'} className="border-image-gradient" justifyContent={'center'} alignItems={'center'} animation={'rotating 4s linear infinite'}>
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
        </Flex>
    )
}

export default Player;