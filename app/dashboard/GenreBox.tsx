import { 
    Button,
    Flex, Img, Text,
} from "@chakra-ui/react";


function GenreBox() {
    return (
        <Flex minW={240} minH={270} flexDir={'column'} position={'relative'} float={'left'}>
            <Img objectFit={'cover'} rounded={20} position={'absolute'} width={250} height={270} src={"https://images.unsplash.com/photo-1543945696-4f1116f30c03?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
            <Flex roundedBottom={20} zIndex={5} backgroundColor={'rgba(69,69,69,0.7)'} bottom={0} position={'absolute'} w={'100%'} py={'0.8rem'} px={'1rem'} justifyContent={'space-between'}>
                <Flex flexDirection={'column'}>
                    <Text letterSpacing={'0.2rem'}>Acoustic</Text>
                    <Text fontSize={'0.75rem'}>120 tracks</Text>
                </Flex>
                <Button variant={'unstyled'}>
                    <Img src="./icons/Playlist Play.svg" width={'35px'} height={'auto'} /> 
                </Button>
            </Flex>
        </Flex>
    )
}

export default GenreBox;