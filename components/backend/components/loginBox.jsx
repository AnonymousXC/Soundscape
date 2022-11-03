import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { AuthInstance } from '../../../.firebase/firebaseMain';
import {
  signInWithEmailAndPassword
} from "firebase/auth"


export default function LoginBox() {

  const [ email, setEmail ] = useState()
  const [ password, setPassword ] = useState()

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Log in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(e) => { setEmail(e.currentTarget.value) }} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" onChange={(e) => { setPassword(e.currentTarget.value) }} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={() => {
                  loginUser(email, password)
                }}>
                Log in
              </Button>
            </Stack>
            <Text id='login-status' textAlign={"center"}></Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}



function loginUser(email, password) {
  signInWithEmailAndPassword(AuthInstance, email, password)
  .then(e => {
    localStorage.setItem("userID", e.user.uid)
    document.getElementById("login-status").innerText = "Logged In Successfully."
    console.log(e.user.uid);
  })
  .catch(err => {
    document.getElementById("login-status").innerText = err
  })
}