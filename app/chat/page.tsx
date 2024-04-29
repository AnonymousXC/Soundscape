import {
    Flex,
} from '@chakra-ui/react'
import TopBar from './TopBar';

function Chat() {
    return (
        <Flex position={'relative'} top={0} left={0} width={'100%'} background={'background'} height={'calc(100vh - 6.25rem)'}>
            <TopBar />
        </Flex>
    )
}

export default Chat;