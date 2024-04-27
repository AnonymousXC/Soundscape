import { createClient } from '@/database/supabase';
import {
    Flex,
} from '@chakra-ui/react'
import SignUpPage from './SignUp';
import * as UserProfile from './Profile';


async function Profile() {

    const supabase = createClient()
    const { data, error } = await supabase.auth.getUser()

    return (
        <Flex position={'relative'} top={0} left={0} width={'100%'} maxW={'100%'} background={'background'} height={'calc(100vh - 6.25rem)'} px={'1.25rem'} pt={'3rem'} flexDir={'column'}>
            {
                data.user === null ? <SignUpPage /> : <UserProfile.default />
            }
        </Flex>
    )
}


export default Profile;