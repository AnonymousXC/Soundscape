'use client'
import {
    Button,
    Divider,
    Flex,
    Text
} from '@chakra-ui/react'
import { Img } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

function Sidebar() {

    const router = useRouter()
    const [ isVisible, setVisibility ] = useState<boolean>(true)
    const [ currentActive, setCurrentActive ] = useState<string>('')

    useEffect(() => {
        setCurrentActive(location.pathname.replace('/', '').trim())
    }, [])

    return (
        <Flex bgColor={'sidebarBG'} width={isVisible ? '100%' : '0px'} maxWidth={'300px'} height={'100vh'} flexDirection={'column'} px={isVisible ? '38px' : '0px'} pt={'30px'} position={'relative'} top={0} left={0} boxShadow={'1px 3px 25px rgb(0 0 0 / 0.8)'} zIndex={1000}>
            <Button position={'absolute'} rounded={0} top={'0%'} left={'0px'} px={0} height={'100%'} opacity={0} onClick={() => {
                setVisibility(!isVisible)
            }} _hover={{ opacity : 1 }}>
                {isVisible ? 'Hide' : 'Show'}
            </Button>
            <Img src={'/SidebarLogo.svg'} alt='logo' width={'90%'} height={'auto'} pb={'40px'} />
            <Flex flexDirection={'column'} overflowY={'auto'}>
                <Flex className='menu' flexDirection={'column'} mb={'40px'}>
                    <Text color={'primaryText'} letterSpacing={'0.2px'} fontWeight={'500'} mb={'8px'} fontSize={'19px'}>
                        Menu
                    </Text> 
                    <Divider variant={'primary'} />
                    <Flex flexDirection={'column'} alignItems={'center'} mt={'30px'} gap={'16px'}>
                        <Button variant={'sidebar'} leftIcon={<Img src={'/icons/User.svg'} alt='logo' width={'20px'} height={'auto'}/>} onClick={() => { 
                            router.push('/profile')
                            setCurrentActive('profile')
                            }} className={currentActive === 'profile' ? 'sidebar-active-tab' : ''}>
                            Profile
                        </Button>
                        <Button variant={'sidebar'} leftIcon={<Img src={'/icons/Dashboard.svg'} alt='logo' width={'20px'} height={'auto'}/>} onClick={() => {
                            router.push('/dashboard')
                            setCurrentActive('dashboard')
                        }} className={currentActive === 'dashboard' ? 'sidebar-active-tab' : ''}>
                            Dashboard
                        </Button>
                        <Button variant={'sidebar'} leftIcon={<Img src={'/icons/Love.svg'} alt='logo' width={'20px'} height={'auto'}/>} onClick={() => {
                            router.push('/favorite')
                            setCurrentActive('favorite')
                        }} className={currentActive === 'favorite' ? 'sidebar-active-tab' : ''}>
                            Favorite
                        </Button>
                        <Button variant={'sidebar'} leftIcon={<Img src={'/icons/Chat.svg'} alt='logo' width={'20px'} height={'auto'}/>} onClick={() => {
                            router.push('/chat')
                            setCurrentActive('chat')
                        }} className={currentActive === 'chat' ? 'sidebar-active-tab' : ''}>
                            Live Chat
                        </Button>
                        <Button variant={'sidebar'} leftIcon={<Img src={'/icons/Friends.svg'} alt='logo' width={'20px'} height={'auto'}/>} onClick={()  => {
                            router.push('/friend')
                            setCurrentActive('friend')
                        }} className={currentActive === 'friend' ? 'sidebar-active-tab' : ''}>
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
                        <Button variant={'sidebar'} leftIcon={<Img src={'/icons/Settings.svg'} alt='logo' width={'20px'} height={'auto'}/>} onClick={() => {
                            router.push('/setting')
                            setCurrentActive('setting')
                        }} className={currentActive === 'setting' ? 'sidebar-active-tab' : ''}>
                            Settings
                        </Button>
                        <Button variant={'sidebar'} leftIcon={<Img src={'/icons/FAQs.svg'} alt='logo' width={'20px'} height={'auto'}/>} onClick={() => {
                            router.push('/faq')
                            setCurrentActive('faq')
                        }} className={currentActive === 'faq' ? 'sidebar-active-tab' : ''}>
                            FAQs
                        </Button>
                    </Flex>
                </Flex>
            </Flex>

        </Flex>
    )
}

export default Sidebar