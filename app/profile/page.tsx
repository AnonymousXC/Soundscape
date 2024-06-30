'use server'
import { createClient } from '@/database/supabase';
import {
    Flex,
} from '@chakra-ui/react'
import RecentlyPlayed from './RecentlyPlayed';
import Playlist from './Playlist';
import { redirect } from 'next/navigation';

async function Profile({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {

    const supabase = createClient()
    const { data, error } = await supabase.auth.getUser()

    if (data.user === null) {
        if(searchParams?.id)
            redirect('/auth?id=' + searchParams.id)
        else
            redirect('/auth')
    }

    return (
        <Flex position={'relative'} top={0} left={0} width={'100%'} maxW={'100%'} background={'background'} height={['calc(100vh - 3.875rem - 8.2rem - 3.2rem)', 'calc(100vh - 6.25rem)']} px={'1.25rem'} pt={['1rem', '3rem']} flexDir={'column'} overflowY={'auto'} pb={2}>
            <Flex flexDirection={'column'} gap={6}>
                <Playlist />
                <RecentlyPlayed />
            </Flex>
        </Flex>
    )
}


export default Profile;