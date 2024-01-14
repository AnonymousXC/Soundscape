'use client'
import {
    Avatar,
    Button,
    Flex,
    Box,
    Text,
} from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

function ActivityBar() {

    const [ isVisible, setVisibility ] = useState<boolean>(true)

    return (
        <Flex bgColor={'sidebarBG'} width={isVisible ? '100%' : '0px'} maxWidth={'300px'} height={'100vh'} flexDirection={'column'} px={isVisible ? '38px' : '0px'} pt={'30px'} position={'relative'} top={0} left={0} boxShadow={'1px 3px 25px rgb(0 0 0 / 0.8)'} zIndex={1000}>
            <Button position={'absolute'} rounded={0} top={'0%'} right={'0px'} px={0} height={'100%'} opacity={0} onClick={() => {
                setVisibility(!isVisible)
            }} _hover={{ opacity : 1 }}>
                {isVisible ? '→' : '←'}
            </Button>
            <Flex gap={'10px'}>
                <Avatar name='Thearcane' src='https://bit.ly/dan-abramov' />
                <Flex flexDirection={'column'}>
                    <Text color={'#fff'} fontSize={'19px'} fontWeight={500}> Thearcane </Text>
                    <Text color={'primaryText'} fontSize={'12px'} > premium blog </Text>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default ActivityBar;