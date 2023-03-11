import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from '@chakra-ui/react';
import {
    createUserWithEmailAndPassword
} from "firebase/auth"
import {
    setDoc,
    doc
} from "firebase/firestore"

import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { AuthInstance, Database } from '../../../.firebase/firebaseMain';
import Router from 'next/router';

function SignupCard() {
    const [showPassword, setShowPassword] = useState(false);
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ name, setName ] = useState("")

    return (
        <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
                Sign up
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
                to enjoy all of our cool features ✌️
            </Text>
            </Stack>
            <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
                <Box >
                    <FormControl id="firstName" isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input type="text" onChange={(e) => { setName(e.currentTarget.value )}} />
                    </FormControl>
                </Box>
                <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" onChange={(e) => {setEmail(e.currentTarget.value)}} />
                </FormControl>
                <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input type={showPassword ? 'text' : 'password'} onChange={(e) => {setPassword(e.currentTarget.value)}} />
                    <InputRightElement h={'full'}>
                    <Button
                        variant={'ghost'}
                        onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                        }>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                    </InputRightElement>
                </InputGroup>
                </FormControl>
                <Stack spacing={10} pt={2}>
                <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                    bg: 'blue.500',
                    }}
                    onClick={() => {
                        signUpUser(email, password, name)
                    }}>
                    Sign up
                </Button>
                </Stack>
                <Stack pt={4}>
                <Text align={'center'}>
                    Already a user? <Link color={'blue.400'}>Login</Link>
                </Text>
                </Stack>
            </Stack>
                <Text id='signup-status' textAlign={"center"} pt={4} textTransform="capitalize"></Text>
            </Box>
        </Stack>
        </Flex>
    );
}


function signUpUser(em, pass, name) {
    createUserWithEmailAndPassword(AuthInstance, em, pass)
    .then(e => {
        makeUserDatabaseID(e.user.uid, name)
        document.getElementById("signup-status").innerText = "Account Made Successfully."
        setTimeout(() => {
            Router.push("/login")
        }, 1500)
    })
    .catch(err => {
        try {
        let formattedErrMsg = err.toString().replace(/.* /, /\(.*\)/).replace(/\/\\\(.*\\\)\//, "").replace("(", "").replace(")", "").replace("/", "").replace("auth", "").replaceAll("-", " ")
        document.getElementById("signup-status").innerText = formattedErrMsg
        } catch {}
    })
}

async function makeUserDatabaseID(userId, name) {
    const docRef = await setDoc(doc(Database, `userData`, userId), {
        name: name,
        recentPlays : [],
        favSongs : [],
    })
}

export default SignupCard