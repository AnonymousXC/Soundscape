import { 
    Avatar, 
    Flex,
    Text,
    Button,
    Img,
    Box,
} from "@chakra-ui/react";

function Artist(props : { id : string, visible? : boolean }) {
    return (
        <Flex backgroundColor={'rgba(35,35,35,0.3)'} width={'100%'} justifyContent={'space-around'} alignItems={'center'} py={'9px'} px={'12px'} display={props.visible ? 'flex' : 'none'}>
            <Flex className="border-image-gradient" rounded={'full'} width={'47px'} height={'47px'} justifyContent={'center'} alignItems={'center'}>
                <Img src={'https://bit.ly/kent-c-dodds'} width={'45px'} height={'45px'} rounded={'full'} />
            </Flex>
            <Flex flexDirection={'column'}>
                <Text fontWeight={500} color={'#fff'} fontSize={'16px'}>Jackie Burhan</Text>
                <Text color={'primaryText'} fontSize={'12px'}>500 Play Album</Text>
            </Flex>
            <Button variant={'unstyled'} width={'20px'} display={'flex'} justifyContent={'flex-end'}>
                <Img src={'/icons/Three Dots.svg'} width={'auto'} height={'20px'} />
            </Button>
        </Flex>
    )
}

export default Artist;