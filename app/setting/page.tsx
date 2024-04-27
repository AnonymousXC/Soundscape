'use client'
import Logout from '@/database/logout';
import {
    Button,
    Flex,
} from '@chakra-ui/react'

function Setting() {

    return (
        <Flex position={'relative'} top={0} left={0} width={'100%'} background={'background'} height={'calc(100vh - 6.25rem)'}>
            Setting
            <Button onClick={() => { Logout() }}>
                Logout
            </Button>
        </Flex>
    )
}

export default Setting;