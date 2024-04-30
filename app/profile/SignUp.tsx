'use client'
import loginFunc from '@/database/login';
import signUpFunc from '@/database/signUp';
import {
    Flex,
    Text,
    Input,
    Button
} from '@chakra-ui/react'
import { AuthResponse } from '@supabase/supabase-js';
import { useState } from 'react';

function SignUpPage() {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [creationStatus, setCreationStatus] = useState(false)
    const [isLogin, setIsLogin] = useState(false)

    return (
        <Flex w={'100%'} height={'100%'} flexDir={'column'}>
            <Text color={'primaryText'} fontWeight={'500'} fontSize={"1.2rem"}>
                Sign Up / Log in
            </Text>
            <Flex flex={1} justifyContent={'center'} alignItems={'center'} flexDir={'column'}>
                <Flex gap={'1rem'} flexDir={'column'} w={'100%'} maxW={'25rem'}>
                    {
                        isLogin ? "" :
                            <Input placeholder='Enter username' onChange={(e) => setUsername(e.currentTarget.value)} />
                    }
                    <Input placeholder='Enter Email' onChange={(e) => setEmail(e.currentTarget.value)} />
                    <Input placeholder='Enter Password' type='password' onChange={(e) => setPassword(e.currentTarget.value)} />
                    <Button variant={'sidebar'} className={creationStatus ? 'auth-success-gradient' : 'sidebar-active-tab'} justifyContent={'center'} isLoading={loading} w={'100%'}
                        onClick={() => {
                            setLoading(true)
                            if (isLogin === false)
                                signUpFunc(email, password, username)
                                    .then((AUTH: string) => {
                                        const data: AuthResponse = JSON.parse(AUTH || '{}')
                                        if (data.error != null) {
                                            setErrorMessage(data.error.code || '')
                                            setError(true)
                                        }
                                        else {
                                            setCreationStatus(true)
                                        }
                                        setLoading(false)
                                    })
                            else
                                loginFunc(email, password, username)
                                    .then((AUTH: string) => {
                                        const data: AuthResponse = JSON.parse(AUTH || '{}')
                                        if (data.error != null) {
                                            setErrorMessage('Invalid Credentials')
                                            setError(true)
                                        }
                                        else {
                                            setCreationStatus(true)
                                        }
                                        setLoading(false)
                                    })
                        }}>
                        {creationStatus == true ? isLogin == true ? 'Logged in' : 'Account Created Successfully' : error === false ? isLogin ? 'Login' : 'Create Account' : errorMessage}
                    </Button>
                </Flex>
                <Button onClick={() => { setIsLogin(!isLogin) }} variant={'unstyled'} fontSize={'0.8rem'} fontWeight={"400"} className='gradient-text' textAlign={'end'} w={'100%'} maxW={'25rem'} >
                    {isLogin ? 'Sign Up' : 'Login'}
                </Button>
            </Flex>
        </Flex>
    )
}

export default SignUpPage;