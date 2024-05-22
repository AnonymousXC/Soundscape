'use client'
import PlaylistDetails from "@/@types/PlaylistDetail";
import { startLoading } from "@/components/global/TopLoadingBar";
import { 
    Button,
    Flex, Img, Text, Tooltip,
} from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";

interface PlaylistDetailsSongCount extends PlaylistDetails
{
   songCount: number,
   playlistId: string,
}

function PlaylistBox({ name, imageURL, author, songCount, playlistId }: PlaylistDetailsSongCount) {
    
    const router = useRouter()
    const params = useSearchParams()

    return (
        <Flex minW={[240]} minH={[270]} flexDir={'column'} position={'relative'} float={'left'} _hover={{ transform: 'scale(1.02)'}} transition={'transform 200ms'}>
            <Img objectFit={'cover'} rounded={20} position={'absolute'} width={250} height={270} src={imageURL} />
            <Flex roundedBottom={20} zIndex={5} backgroundColor={'rgba(69,69,69,0.7)'} bottom={0} position={'absolute'} w={'100%'} py={'0.8rem'} px={'1rem'} justifyContent={'space-between'} maxH={'85px'}>
                <Flex flexDirection={'column'}>
                    <Tooltip label={name} hasArrow>
                        <Text cursor={'default'} letterSpacing={'0.2rem'} height={'25px'} textOverflow={'ellipsis'} overflow={'hidden'} w={'calc(100%)'}> {name} </Text>
                    </Tooltip>
                    <Text fontSize={'0.75rem'}>{typeof songCount === 'undefined' ? 0 : songCount} tracks</Text>
                </Flex>
                <Button variant={'unstyled'} onClick={() => {
                    startLoading()
                    router.replace('/playlist/' + playlistId + "?" + params.toString())
                }}>
                    <Img src="./icons/Playlist Play.svg" width={'35px'} height={'auto'} /> 
                </Button>
            </Flex>
        </Flex>
    )
}

export default PlaylistBox;