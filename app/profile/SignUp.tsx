'use client'
import signUpFunc from '@/database/signUp';
import {
    Flex,
    Text,
    Input,
    Button
} from '@chakra-ui/react'
import { useState } from 'react';

function SignUpPage() {

    const [ email, setEmail ] = useState<string>("")
    const [ password, setPassword ] = useState<string>("")

    return (
        <Flex w={'100%'} height={'100%'} flexDir={'column'}>
            <Text color={'primaryText'} fontWeight={'500'} fontSize={"1.2rem"}>
                Sign Up
            </Text>
            <Flex flex={1} justifyContent={'center'} alignItems={'center'}>
                <Flex gap={'1rem'} flexDir={'column'} w={'100%'} maxW={'25rem'}>
                    <Input placeholder='Enter Email' onChange={(e) => setEmail(e.currentTarget.value)} />
                    <Input placeholder='Enter Password'  type='password' onChange={(e) => setPassword(e.currentTarget.value)} />
                    <Button variant={'sidebar'} className='sidebar-active-tab' justifyContent={'center'}
                    onClick={() => {
                        signUpFunc(email, password)
                    }}>
                        Create Account
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default SignUpPage;