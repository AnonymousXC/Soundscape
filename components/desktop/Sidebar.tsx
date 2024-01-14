import {
    Divider,
    Flex,
    Text
} from '@chakra-ui/react'
import { Img } from '@chakra-ui/react'

function Sidebar() {
    return (
        <Flex bgColor={'sidebarBG'} width={'100%'} maxWidth={'300px'} height={'100vh'} flexDirection={'column'} px={'38px'} pt={'30px'}>
            <Img src={'/SidebarLogo.svg'} alt='logo' width={'90%'} height={'auto'} pb={'40px'} />
            <Flex className='menu' flexDirection={'column'}>
                <Text color={'primaryText'} letterSpacing={'0.2px'} fontWeight={'500'} mb={'8px'}>
                    Menu
                </Text> 
                <Divider variant={'primary'} />
            </Flex>
        </Flex>
    )
}

export default Sidebar