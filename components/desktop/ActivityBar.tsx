'use client'
import {
    Avatar,
    Button,
    Flex,
    Skeleton,
    Text,
} from '@chakra-ui/react'
import { Img } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Artist from '../global/Artist'
import RecentlyPlayedSong from './RecentlyPlayedSideBar'
import getSession from '@/database/session'
import { UserResponse } from '@supabase/supabase-js'
import getFavouriteSongs from '@/database/getFavouriteSongs'

function ActivityBar() {

    const [isVisible, setVisibility] = useState<boolean>(true)
    const [recents, setRecents] = useState<Array<string>>([])
    const [user, setUser] = useState<UserResponse | null>(null)

    useEffect(() => {
        getSession()
            .then((data: UserResponse) => {
                if(user?.data.user != null)
                setUser(data)
            })
        getFavouriteSongs()
            .then((data) => {
                if(data)
                    setRecents(data![0].songs || [])
            })
    }, [])

    return (
        <Flex display={['none', 'none', 'flex']} bgColor={'background'} width={isVisible ? '100%' : '0px'} maxWidth={'21.875rem'} height={'calc(100vh - 6.25rem)'} flexDirection={'column'} px={isVisible ? '1.75rem' : '0px'} pt={'1.875rem'} position={'relative'} top={0} left={0} boxShadow={'1px 3px 25px rgb(0 0 0 / 0.8)'} zIndex={1000} transition={'all 200ms'}>
            <Button position={'absolute'} rounded={0} top={'0%'} right={'0px'} px={0} height={'100%'} opacity={0} onClick={() => {
                setVisibility(!isVisible)
            }} _hover={{ opacity: 1 }}>
                {isVisible ? '→' : '←'}
            </Button>
            <Flex justifyContent={'space-between'} alignItems={'center'} mb={'1.875rem'}>
                <Flex gap={'0.625rem'}>
                    <Avatar name={user?.data.user?.user_metadata.username} />
                    <Flex flexDirection={'column'}>
                        <Text color={'primaryTextRe'} fontSize={'1.188rem'} fontWeight={500}> {user?.data.user?.user_metadata.username || 'Loading...'} </Text>
                        <Text color={'primaryText'} fontSize={'0.75rem'} > {user?.data.user?.email || 'Loading...'} </Text>
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
                {
                    recents.length > 0 &&


                    <Flex flexDirection={'column'} mt={'1.875rem'} pb={'2.5rem'}>
                        <Text color={'primaryText'} fontSize={'1.188rem'} fontWeight={500}>Favourite Songs</Text>
                        <Flex flexDirection={'column'} gap={'0.75rem'} mt={'1.25rem'}>
                            {
                                recents.map((el: string, idx: number) => {
                                    console.log(el)
                                    return <RecentlyPlayedSong id={el} visible={isVisible} key={idx} />
                                })
                            }
                        </Flex>
                    </Flex>
                }
            </Flex>
        </Flex>
    )
}

export default ActivityBar;