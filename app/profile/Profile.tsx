import { createClient } from "@/database/supabase";
import {
    Avatar,
    Flex,
    Text,
} from "@chakra-ui/react";


async function Profile() {

    const supabase = createClient()
    const userdata = (await supabase.auth.getUser()).data.user

    return (
        <>
            <Flex width={'full'} flexDir={'column'} gap={6} px={'1.25rem'}>
                <Text color={'primaryText'} fontWeight={'500'} fontSize={"1.2rem"}>
                    User Details
                </Text>
                <Flex gap={6}>
                    <Avatar name={userdata?.user_metadata.username} size={'2xl'} />
                    <Flex flex={1} flexDir={'column'} justifyContent={'center'}>
                        <Text fontSize={'1.2rem'}>
                            {userdata?.user_metadata.username}
                        </Text>
                        <Text fontSize={'0.8rem'}>
                            Time Listened
                        </Text>
                        <Text fontSize={'0.8rem'}>
                            {userdata?.email}
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
            {/* <Favorit    e /> */}
        </>
    )
}

export default Profile;