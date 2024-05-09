'use server'
import { createClient } from '@/database/supabase';
import {
    Flex,
} from '@chakra-ui/react'
import SignUpPage from './SignUp';
import * as UserProfile from './Profile';
import RecentlyPlayed from './RecentlyPlayed';
import Playlist from './Playlist';


async function Profile() {

    const supabase = createClient()
    const { data, error } = await supabase.auth.getUser()

    return (
        <Flex position={'relative'} top={0} left={0} width={'100%'} maxW={'100%'} background={'background'} height={'calc(100vh - 6.25rem)'} px={'1.25rem'} pt={'3rem'} flexDir={'column'} overflowY={'auto'} pb={2}>
            {
                data.user === null ? <SignUpPage /> :

                    <Flex flexDirection={'column'} gap={6}>
                        <UserProfile.default />
                        <Playlist />
                        <RecentlyPlayed />
                    </Flex>
            }

        </Flex>
    )
}


export default Profile;