'use client'
import {
    Button,
    Divider,
    Flex,
    Text
} from '@chakra-ui/react'
import { Img } from '@chakra-ui/react'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'

function Sidebar() {

    const router = useRouter()
    const pathname = usePathname()
    const [ isVisible, setVisibility ] = useState<boolean>(true)

    const handleRouteChange = (path : string) => {
        const url = new URL(window.location.href)
        router.push(path + '?id=' + url.searchParams.get('id'))
    }

    return (
        <Flex bgColor={'background'} width={isVisible ? '100%' : '0px'} maxWidth={'18.75rem'} height={'calc(100vh - 6.25rem)'} flexDirection={'column'} px={isVisible ? '2.375rem' : '0px'} pt={'1.875rem'} position={'relative'} top={0} left={0} boxShadow={'1px 3px 25px rgb(0 0 0 / 0.8)'} zIndex={1000}>
            <Button position={'absolute'} rounded={0} top={'0%'} left={'0px'} px={0} height={'100%'} opacity={0} onClick={() => {
                setVisibility(!isVisible)
            }} _hover={{ opacity : 1 }}>
                {isVisible ? '←' : '→'}
            </Button>
            <Img src={'/SidebarLogo.svg'} alt='logo' width={'90%'} height={'auto'} pb={'2.5rem'} />
            <Flex flexDirection={'column'} overflowY={'auto'} className='hide-scroll-bar'>
                <Flex className='menu' flexDirection={'column'} mb={'2.5rem'}>
                    <Text color={'primaryText'} letterSpacing={'0.2px'} fontWeight={'500'} mb={'8px'} fontSize={'1.1875rem'}>
                        Menu
                    </Text> 
                    <Divider variant={'primary'} />
                    <Flex flexDirection={'column'} alignItems={'center'} mt={'1.875rem'} gap={'1rem'}>
                        <Button variant={'sidebar'} fontSize={'1rem'} leftIcon={<Img src={'/icons/User.svg'} alt='logo' width={'20px'} height={'auto'}/>} onClick={() => {
                            handleRouteChange('/profile')
                            }} className={pathname.indexOf('/profile') != -1 || pathname === '/' ? 'sidebar-active-tab' : ''}>
                            Profile
                        </Button>
                        <Button variant={'sidebar'} fontSize={'1rem'} leftIcon={<Img src={'/icons/Dashboard.svg'} alt='logo' width={'20px'}  height={'auto'}/>} onClick={() => {
                            handleRouteChange('/dashboard')
                        }} className={pathname.indexOf('/dashboard') != -1  ? 'sidebar-active-tab' : ''}>
                            Dashboard
                        </Button>
                        <Button variant={'sidebar'} fontSize={'1rem'} leftIcon={<Img src={'/icons/Love.svg'} alt='logo' width={'20px'} height={'auto'}/>} onClick={() => {
                            handleRouteChange('/favorite')
                        }} className={pathname.includes('/favorite') ? 'sidebar-active-tab' : ''}>
                            Favorite
                        </Button>
                        <Button variant={'sidebar'} fontSize={'1rem'} leftIcon={<Img src={'/icons/Chat.svg'} alt='logo' width={'20px'} height={'auto'}/>} onClick={() => {
                            handleRouteChange('/chat')
                        }} className={pathname === '/chat' ? 'sidebar-active-tab' : ''}>
                            Live Chat
                        </Button>
                        <Button variant={'sidebar'} fontSize={'1rem'} leftIcon={<Img src={'/icons/Friends.svg'} alt='logo' width={'20px'} height={'auto'}/>} onClick={()  => {
                            handleRouteChange('/friend')
                        }} className={pathname === '/friend' ? 'sidebar-active-tab' : ''}>
                            Friends
                        </Button>
                    </Flex>
                </Flex>
                <Flex className='menu' flexDirection={'column'} pb={'2rem'}>
                    <Text color={'primaryText'} letterSpacing={'0.2px'} fontWeight={'500'} mb={'0.5rem'} fontSize={'1.1875rem'}>
                        Help
                    </Text> 
                    <Divider variant={'primary'} />
                    <Flex flexDirection={'column'} alignItems={'center'} mt={'1.563rem'} gap={'1rem'}>
                        <Button variant={'sidebar'} fontSize={'1rem'} leftIcon={<Img src={'/icons/Settings.svg'} alt='logo' width={'20px'} height={'auto'}/>} onClick={() => {
                            handleRouteChange('/setting')
                        }} className={pathname === '/setting' ? 'sidebar-active-tab' : ''}>
                            Settings
                        </Button>
                        <Button variant={'sidebar'} fontSize={'1rem'} leftIcon={<Img src={'/icons/FAQs.svg'} alt='logo' width={'20px'} height={'auto'}/>} onClick={() => {
                            handleRouteChange('faq')
                        }} className={pathname === '/faq' ? 'sidebar-active-tab' : ''}>
                            FAQs
                        </Button>
                    </Flex>
                </Flex>
            </Flex>

        </Flex>
    )
}

export default Sidebar