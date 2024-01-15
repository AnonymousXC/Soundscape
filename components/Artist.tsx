import { 
    Flex,
    Text,
    Button,
    Img,
    Skeleton,
} from "@chakra-ui/react";
import getArtistDetails from "@/app/actions/getArtistDetails.server";
import { useEffect, useState } from "react";
import { ArtistRequest } from "@/interfaces/artist.interface";

interface Props {
    id: string,
    visible?: boolean,
}

function Artist(props : Props) {

    const [ data, setData ] = useState<ArtistRequest>()
    const [ loading, setLoading ] = useState<boolean>(false)

    useEffect(() => {
        getArtistDetails(props.id)
        .then((val) => {
            setData(val.data)
            console.log(val)
            setLoading(true)
        })
    }, [])

    return (
        <Skeleton isLoaded={loading}>
            <Flex backgroundColor={'rgba(35,35,35,0.3)'} width={'100%'} justifyContent={'space-around'} alignItems={'center'} py={'0.375rem'} px={'0.75rem'} display={props.visible ?'flex' : 'none'}>
                    <Flex className="border-image-gradient" rounded={'full'} width={'2.938rem'} height={'2.938rem'} justifyContent={'center'} alignItems={'center'}>
                        <Img src={data?.image[1].link + ''} width={'2.813rem'} height={'2.813rem'} rounded={'full'} />
                    </Flex>
                    <Flex flexDirection={'column'}>
                        <Text fontWeight={500} color={'#fff'} fontSize={'1rem'}>{data?.name}</Text>
                        <Text color={'primaryText'} fontSize={'0.75rem'}>{data?.followerCount} followers</Text>
                    </Flex>
                    <Button variant={'unstyled'} width={'1.25rem'} display={'flex'} justifyContent={'flex-end'}>
                        <Img src={'/icons/Three Dots.svg'} width={'auto'} height={'20px'} />
                    </Button>
            </Flex>
        </Skeleton>
    )
}

export default Artist;