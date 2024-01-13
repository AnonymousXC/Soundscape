import {
    Flex,
    Text
} from '@chakra-ui/react'

function Sidebar() {
    return (
        <Flex bgColor={'#111111'} width={'25%'} maxWidth={'300px'} height={'100vh'} flexDirection={'column'}>
            <Flex>ICON</Flex>
            <Flex className='menu'>
                <Text color={'#B8B8B8'} fontWeight={'500'}>
                    Menu
                </Text> 
            </Flex>
        </Flex>
    )
}

export default Sidebar