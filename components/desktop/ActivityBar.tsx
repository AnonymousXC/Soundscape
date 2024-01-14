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

function ActivityBar() {

    const [ isVisible, setVisibility ] = useState<boolean>(true)

    return (
        <Flex bgColor={'sidebarBG'} width={isVisible ? '100%' : '0px'} maxWidth={'350px'} height={'100vh'} flexDirection={'column'} px={isVisible ? '28px' : '0px'} pt={'30px'} position={'relative'} top={0} left={0} boxShadow={'1px 3px 25px rgb(0 0 0 / 0.8)'} zIndex={1000}>
            <Button position={'absolute'} rounded={0} top={'0%'} right={'0px'} px={0} height={'100%'} opacity={0} onClick={() => {
                setVisibility(!isVisible)
            }} _hover={{ opacity : 1 }}>
                {isVisible ? '→' : '←'}
            </Button>
            <Flex justifyContent={'space-between'} alignItems={'center'} mb={'30px'}>
                <Flex gap={'10px'}>
                    <Avatar name='Thearcane' src='https://bit.ly/dan-abramov' />
                    <Flex flexDirection={'column'}>
                        <Text color={'#fff'} fontSize={'19px'} fontWeight={500}> Thearcane </Text>
                        <Text color={'primaryText'} fontSize={'12px'} > premium blog </Text>
                    </Flex>
                </Flex>
                <Button variant={'unstyled'} justifyContent={'flex-end'} display={'flex'}>
                    <Img src='/icons/Notification.svg' width={'25px'} height={'auto'} />
                </Button>
            </Flex>
            <Flex flexDirection={'column'}>
                <Text color={'primaryText'} fontSize={'19px'} fontWeight={500}>Top Artist</Text>
                <Flex flexDirection={'column'} gap={'12px'} mt={'20px'}>
                    <Artist id={'sad'} visible={isVisible} />
                    <Artist id={'sad'} visible={isVisible} />
                    <Artist id={'sad'} visible={isVisible} />
                    <Artist id={'sad'} visible={isVisible} />
                    <Artist id={'sad'} visible={isVisible} />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default ActivityBar;