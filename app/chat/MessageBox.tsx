import { Button, Flex, Img, Input } from "@chakra-ui/react";


function MessageInputBox() { 
    return (
        <Flex backgroundColor={'#111111'} w={'100%'} height={'4.5rem'} px={'1.5rem'} gap={6} boxShadow={'1px 3px 25px rgb(0 0 0 / 0.8)'} py={'1rem'}>
            <Input rounded={'full'} backgroundColor={'rgba(65,65,65,0.65)'} border={'none'} placeholder="Type Message" boxShadow={'none !important'} fontWeight={'400'} _placeholder={{ color: '#B8B8B' }} />
            <Flex gap={3}>
                <Button variant={'unstyled'}>
                    <Img src="/icons/smiley.svg" w={'23px'} />
                </Button>
                <Button variant={'unstyled'}>
                    <Img src="/icons/share.svg" w={'23px'} />
                </Button>
                <Button variant={'unstyled'}>
                    <Img src="/icons/send.svg" w={'23px'} />
                </Button>
            </Flex>
        </Flex>
    )
}

export default MessageInputBox;