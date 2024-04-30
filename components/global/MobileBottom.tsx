'use client'
import { Button, Flex, Img } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";



function BottomBar() { 

    const pathname = usePathname()
    const router = useRouter()

    
    const handleRouteChange = (path : string) => {
        const url = new URL(window.location.href)
        router.push(path + '?' + url.searchParams.toString())
    }

    return (
        <Flex display={['flex', 'flex', 'none']} position={'fixed'} bottom={0} left={0} height={'3.875rem'} backgroundColor={'Background'} w={'100%'} boxShadow={'1px 3px 25px rgb(0 0 0 / 0.8)'} px={'2rem'} alignItems={'center'} justifyContent={'space-around'}>
            
            <Button variant={'unstyled'} justifyContent={'center'} alignItems={'center'} display={'flex'} className={pathname.indexOf('/dashboard') != -1  ? 'sidebar-active-tab' : ''}
            onClick={() => { handleRouteChange('/dashboard')}} >
                <Img src="/icons/Dashboard.svg" />
            </Button>
            <Button variant={'unstyled'} justifyContent={'center'} alignItems={'center'} display={'flex'} className={pathname.includes('/favorite') ? 'sidebar-active-tab' : ''}
            onClick={() => { handleRouteChange('/favorite')}} >
                <Img src="/icons/Love.svg" />
            </Button>
            <Button variant={'unstyled'} justifyContent={'center'} alignItems={'center'} display={'flex'}  className={pathname === '/chat' ? 'sidebar-active-tab' : ''}
            onClick={() => { handleRouteChange('/chat')}} >
                <Img src="/icons/Chat.svg" />
            </Button>
            <Button variant={'unstyled'} justifyContent={'center'} alignItems={'center'} display={'flex'}  className={pathname === '/friend' ? 'sidebar-active-tab' : ''}
            onClick={() => { handleRouteChange('/friend')}} >
                <Img src="/icons/Friends.svg" />
            </Button>

        </Flex>
    )
}

export default BottomBar