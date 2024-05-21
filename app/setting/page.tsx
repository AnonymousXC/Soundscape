'use client'
import Logout from '@/database/logout';
import {
    Button,
    Flex,
} from '@chakra-ui/react'
import { useEffect } from 'react';

function Setting() {

    useEffect(() => {
        const audioContext = window.audioContext
        console.log(audioContext)
    }, [])

    return (
        <Flex position={'relative'} top={0} left={0} width={'100%'} background={'background'} height={'calc(100vh - 6.25rem)'}>
            Setting
            <Button onClick={() => { Logout() }}>
                Logout
            </Button>
            <Button onClick={() => { localStorage.removeItem('recents');localStorage.removeItem('favourite') }}>
                Clear Data
            </Button>
        </Flex>
    )
}

export default Setting;