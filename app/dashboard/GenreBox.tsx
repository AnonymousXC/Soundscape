import { 
    Button,
    Flex, Img, Text, Tooltip,
} from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";


function GenreBox({ props }: any) {
    
    const router = useRouter()
    const params = useSearchParams()

    return (
        <Flex minW={240} minH={270} flexDir={'column'} position={'relative'} float={'left'} _hover={{ transform: 'scale(1.02)'}} transition={'transform 200ms'}>
            <Img objectFit={'cover'} rounded={20} position={'absolute'} width={250} height={270} src={props.image[2].link} />
            <Flex roundedBottom={20} zIndex={5} backgroundColor={'rgba(69,69,69,0.7)'} bottom={0} position={'absolute'} w={'100%'} py={'0.8rem'} px={'1rem'} justifyContent={'space-between'} maxH={'85px'}>
                <Flex flexDirection={'column'}>
                    <Tooltip label={props.name} hasArrow>
                        <Text cursor={'default'} letterSpacing={'0.2rem'} height={'25px'} textOverflow={'ellipsis'} overflow={'hidden'} w={'calc(100%)'}> {props.name} </Text>
                    </Tooltip>
                    <Text fontSize={'0.75rem'}>{props.songCount} tracks</Text>
                </Flex>
                <Button variant={'unstyled'} onClick={() => {
                    router.replace('/playlist/' + props.id + "?" + params.toString())
                }}>
                    <Img src="./icons/Playlist Play.svg" width={'35px'} height={'auto'} /> 
                </Button>
            </Flex>
        </Flex>
    )
}

export default GenreBox;