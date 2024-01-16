import { 
    Flex,
    Text,
    Button,
    Img,
    Skeleton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import getSongDetails from "@/app/actions/getSongDetails.server";
import { SongResponse } from "@/interfaces/song.interface";

interface Props {
    id: string,
    visible?: boolean,
}

function RecentlyPlayedSong(props : Props) {

    const [ data, setData ] = useState<SongResponse>()
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ error, setError ] = useState<boolean>(false)

    useEffect(() => {
        getSongDetails(props.id)
        .then((val) => {
            if(val.status == 'SUCCESS')
            {
                setLoading(true)
                setData(val.data[0])
            }
            else
                setError(true)
            console.log(val)
        })
    }, [])

    if(error)
        return (
            <Flex backgroundColor={'rgba(35,35,35,0.3)'} width={'100%'} justifyContent={'space-around'} alignItems={'center'} py={'0.375rem'} px={'0.75rem'} display={props.visible ?'flex' : 'none'}>
                Song Not Found
            </Flex>
    )

    return (
        <Skeleton isLoaded={loading}>
            <Flex backgroundColor={'rgba(35,35,35,0.3)'} width={'100%'} justifyContent={'space-around'} alignItems={'center'} py={'0.375rem'} px={'0.75rem'} display={props.visible ?'flex' : 'none'}>
                    <Flex className="border-image-gradient" rounded={'full'} width={'2.938rem'} height={'2.938rem'} justifyContent={'center'} alignItems={'center'}>
                        <Img src={data?.image[0].link} width={'2.813rem'} height={'2.813rem'} rounded={'full'} />
                    </Flex>
                    <Flex flexDirection={'column'} width={'100%'} maxWidth={'6.25rem'}>
                        <Text fontWeight={500} color={'#fff'} fontSize={'1rem'}>{data?.name}</Text>
                    </Flex>
                    <Button variant={'unstyled'} width={'1.25rem'} display={'flex'} justifyContent={'flex-end'}>
                        <Img src={'/icons/Play Button.svg'} width={'auto'} height={'1.25rem'} />
                    </Button>
            </Flex>
        </Skeleton>
    )
}

export default RecentlyPlayedSong;