'use client'
import {
    Avatar,
    Button,
    Flex,
    Text,
} from '@chakra-ui/react'
import { Img } from '@chakra-ui/react'
import { useState } from 'react'
import Artist from '../Artist'
import RecentlyPlayedSong from '../RecentlyPlayedSideBar'

function ActivityBar() {

    const [ isVisible, setVisibility ] = useState<boolean>(true)

    return (
        <Flex bgColor={'sidebarBG'} width={isVisible ? '100%' : '0px'} maxWidth={'21.875rem'} height={'calc(100vh - 6.25rem)'} flexDirection={'column'} px={isVisible ? '1.75rem' : '0px'} pt={'1.875rem'} position={'relative'} top={0} left={0} boxShadow={'1px 3px 25px rgb(0 0 0 / 0.8)'} zIndex={1000}>
            <Button position={'absolute'} rounded={0} top={'0%'} right={'0px'} px={0} height={'100%'} opacity={0} onClick={() => {
                setVisibility(!isVisible)
            }} _hover={{ opacity : 1 }}>
                {isVisible ? '→' : '←'}
            </Button>
            <Flex justifyContent={'space-between'} alignItems={'center'} mb={'1.875rem'}>
                <Flex gap={'0.625rem'}>
                    <Avatar name='Thearcane' src='https://bit.ly/dan-abramov' />
                    <Flex flexDirection={'column'}>
                        <Text color={'#fff'} fontSize={'1.188rem'} fontWeight={500}> Thearcane </Text>
                        <Text color={'primaryText'} fontSize={'0.75rem'} > premium blog </Text>
                    </Flex>
                </Flex>
                <Button variant={'unstyled'} justifyContent={'flex-end'} display={'flex'}>
                    <Img src='/icons/Notification.svg' width={'25px'} height={'auto'} />
                </Button>
            </Flex>
            <Flex flexDirection={'column'} overflow={'auto'} className='hide-scroll-bar'>
                <Flex flexDirection={'column'}>
                    <Text color={'primaryText'} fontSize={'1.188rem'} fontWeight={500}>Top Artist</Text>
                    <Flex flexDirection={'column'} gap={'0.75rem'} mt={'1.25rem'}>
                        <Artist id={'568707'} visible={isVisible} />
                        <Artist id={'599452'} visible={isVisible} />
                        <Artist id={'755042'} visible={isVisible} />
                        <Artist id={'1274170'} visible={isVisible} />
                        <Artist id={'615155'} visible={isVisible} />
                    </Flex>
                </Flex>
                <Flex flexDirection={'column'} mt={'1.875rem'} pb={'2.5rem'}>
                    <Text color={'primaryText'} fontSize={'1.188rem'} fontWeight={500}>Recently Played</Text>
                    <Flex flexDirection={'column'} gap={'0.75rem'} mt={'1.25rem'}>
                        <RecentlyPlayedSong id={'R35H6BI-'} visible={isVisible} />
                        <RecentlyPlayedSong id={'OsolMgGF'} visible={isVisible} />
                        <RecentlyPlayedSong id={'4rsc10Q0'} visible={isVisible} />
                        <RecentlyPlayedSong id={'bovWQRQP'} visible={isVisible} />
                        <RecentlyPlayedSong id={'cRU9XgwN'} visible={isVisible} />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default ActivityBar;