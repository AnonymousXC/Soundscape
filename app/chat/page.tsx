import {
    Flex,
} from '@chakra-ui/react'
import TopBar from './TopBar';
import MessageInputBox from './MessageBox';

function Chat() {
    return (
        <Flex position={'relative'} top={0} left={0} width={'100%'} background={'background'} height={[ 'calc(100vh - 3.875rem - 8.2rem - 3rem)', 'calc(100vh - 3.875rem - 8.2rem - 3rem)', 'calc(100vh - 6.25rem)']} flexDir={'column'}>
            <TopBar />
            <Flex flex={'1'}>
                ad
            </Flex>
            <MessageInputBox />
        </Flex>
    )
}

export default Chat;