import { 
    Flex,
    Text,
    Button,
    Img,
} from "@chakra-ui/react";

function Artist(props : { id : string, visible? : boolean }) {

    return (
        <Flex backgroundColor={'rgba(35,35,35,0.3)'} width={'100%'} justifyContent={'space-around'} alignItems={'center'} py={'0.375rem'} px={'0.75rem'} display={props.visible ? 'flex' : 'none'}>
            <Flex className="border-image-gradient" rounded={'full'} width={'2.938rem'} height={'2.938rem'} justifyContent={'center'} alignItems={'center'}>
                <Img src={'https://bit.ly/kent-c-dodds'} width={'2.813rem'} height={'2.813rem'} rounded={'full'} />
            </Flex>
            <Flex flexDirection={'column'}>
                <Text fontWeight={500} color={'#fff'} fontSize={'1rem'}>Jackie Burhan</Text>
                <Text color={'primaryText'} fontSize={'0.75rem'}>500 Play Album</Text>
            </Flex>
            <Button variant={'unstyled'} width={'1.25rem'} display={'flex'} justifyContent={'flex-end'}>
                <Img src={'/icons/Three Dots.svg'} width={'auto'} height={'20px'} />
            </Button>
        </Flex>
    )
}

export default Artist;