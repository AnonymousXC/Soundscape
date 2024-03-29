import { 
    Flex,
    Text,
    Button,
    Img,
    Skeleton,
} from "@chakra-ui/react";
import getArtistDetails from "@/app/actions/getArtistDetails.server";
import { useEffect, useState } from "react";
import { ArtistResponse } from "@/interfaces/artist.interface";

interface Props {
    id: string,
    visible?: boolean,
}

function Artist(props : Props) {

    const [ data, setData ] = useState<ArtistResponse>()
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ error, setError ] = useState<boolean>(false)

    useEffect(() => {
        getArtistDetails(props.id)
        .then((val) => {
            console.log(val)
            if(val.status == 'SUCCESS')
            {
                setLoading(true)
                setData(val.data)
            }
            else
                setError(true)
        })
    }, [props.id])

    if(error)
        return (
            <Flex backgroundColor={'rgba(35,35,35,0.3)'} width={'100%'} justifyContent={'space-around'} alignItems={'center'} py={'0.375rem'} px={'0.75rem'} display={props.visible ?'flex' : 'none'}>
                Artist not found
            </Flex>
    )

    return (
        <Skeleton isLoaded={loading}>
            <Flex backgroundColor={'rgba(35,35,35,0.3)'} width={'100%'} justifyContent={'space-around'} alignItems={'center'} py={'0.375rem'} px={'0.75rem'} display={props.visible ?'flex' : 'none'}>
                    <Flex className="border-image-gradient" rounded={'full'} width={'2.938rem'} height={'2.938rem'} justifyContent={'center'} alignItems={'center'}>
                        <Img src={data?.image[1].link + ''} width={'2.813rem'} height={'2.813rem'} rounded={'full'} />
                    </Flex>
                    <Flex flexDirection={'column'} width={'100%'} maxWidth={'6.25rem'} gap={'0.4rem'}>
                        <Text fontWeight={500} color={'primaryTextRe'} fontSize={'1rem'} lineHeight={'1.1rem'} height={'1.1rem'} textOverflow={'ellipsis'} overflow={'hidden'} whiteSpace={'nowrap'}>{data?.name}</Text>
                        <Text color={'primaryText'} fontSize={'0.75rem'} lineHeight={'0.75rem'} height={'0.75rem'} overflow={'hidden'} textOverflow={'ellipsis'} whiteSpace={'nowrap'}>{data?.followerCount} followers</Text>
                    </Flex>
                    <Button variant={'unstyled'} width={'1.25rem'} display={'flex'} justifyContent={'flex-end'}>
                        <Img src={'/icons/Three Dots.svg'} width={'auto'} height={'20px'} />
                    </Button>
            </Flex>
        </Skeleton>
    )
}

export default Artist;