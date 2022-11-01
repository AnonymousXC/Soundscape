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
    collection,
    addDoc
} from "firebase/firestore"

import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { AuthInstance, Database } from '../../../.firebase/firebaseMain';

function SignupCard() {
    const [showPassword, setShowPassword] = useState(false);
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

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
                <HStack>
                <Box>
                    <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" />
                    </FormControl>
                </Box>
                <Box>
                    <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" />
                    </FormControl>
                </Box>
                </HStack>
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
                        signUpUser(email, password)
                    }}>
                    Sign up
                </Button>
                </Stack>
                <Stack pt={6}>
                <Text align={'center'}>
                    Already a user? <Link color={'blue.400'}>Login</Link>
                </Text>
                </Stack>
            </Stack>
                <Text id='signup-status'></Text>
            </Box>
        </Stack>
        </Flex>
    );
}


function signUpUser(em, pass) {
    createUserWithEmailAndPassword(AuthInstance, em, pass)
    .then(e => {
        console.log(e.user.uid);
        document.getElementById("signup-status").innerText = "Account Made Successfully."
    })
    .catch(err => {
        document.getElementById("signup-status").innerText = err.toString().replace(/.* /, /\(.*\)/)
        // makeUserDatabaseID()
    })
}

async function makeUserDatabaseID() {
    const docRef = await addDoc(collection(Database, "userData"), {
        first : "asdasd"
    })
    console.log(docRef.id);

}

export default SignupCard