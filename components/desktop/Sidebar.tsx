import {
    Box,
    Button,
    Divider,
    Flex,
    Text
} from '@chakra-ui/react'
import { Img } from '@chakra-ui/react'

function Sidebar() {
    return (
        <Flex bgColor={'sidebarBG'} width={'100%'} maxWidth={'300px'} height={'100vh'} flexDirection={'column'} px={'38px'} pt={'30px'} position={'relative'} boxShadow={'1px 3px 25px rgb(0 0 0 / 0.8)'} zIndex={1000}>
            <Img src={'/SidebarLogo.svg'} alt='logo' width={'90%'} height={'auto'} pb={'40px'} />
            <Flex flexDirection={'column'} overflowY={'auto'}>
                <Flex className='menu' flexDirection={'column'} mb={'40px'}>
                    <Text color={'primaryText'} letterSpacing={'0.2px'} fontWeight={'500'} mb={'8px'} fontSize={'19px'}>
                        Menu
                    </Text> 
                    <Divider variant={'primary'} />
                    <Flex flexDirection={'column'} alignItems={'center'} mt={'30px'} gap={'16px'}>
                        <Button variant={'sidebar'} leftIcon={<Img src={'/icons/User.svg'} alt='logo' width={'20px'} height={'auto'}/>}>
                            Profile
                        </Button>
                        <Button variant={'sidebar'} leftIcon={<Img src={'/icons/Dashboard.svg'} alt='logo' width={'20px'} height={'auto'}/>}>
                            Dashboard
                        </Button>
                        <Button variant={'sidebar'} leftIcon={<Img src={'/icons/Love.svg'} alt='logo' width={'20px'} height={'auto'}/>}>
                            Favorite
                        </Button>
                        <Button variant={'sidebar'} leftIcon={<Img src={'/icons/Chat.svg'} alt='logo' width={'20px'} height={'auto'}/>}>
                            Live Chat
                        </Button>
                        <Button variant={'sidebar'} leftIcon={<Img src={'/icons/Friends.svg'} alt='logo' width={'20px'} height={'auto'}/>}>
                            Friends
                        </Button>
                    </Flex>
                </Flex>
                <Flex className='menu' flexDirection={'column'}>
                    <Text color={'primaryText'} letterSpacing={'0.2px'} fontWeight={'500'} mb={'8px'} fontSize={'19px'}>
                        Help
                    </Text> 
                    <Divider variant={'primary'} />
                    <Flex flexDirection={'column'} alignItems={'center'} mt={'25px'} gap={'16px'}>
                        <Button variant={'sidebar'} leftIcon={<Img src={'/icons/Settings.svg'} alt='logo' width={'20px'} height={'auto'}/>}>
                            Settings
                        </Button>
                        <Button variant={'sidebar'} leftIcon={<Img src={'/icons/FAQs.svg'} alt='logo' width={'20px'} height={'auto'}/>}>
                            FAQs
                        </Button>
                    </Flex>
                </Flex>
            </Flex>

        </Flex>
    )
}

export default Sidebar