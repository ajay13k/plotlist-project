import { Button, Flex, FormControl, FormLabel, Heading, Input, Stack, useColorModeValue, useToast } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import  AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
const ChangePassword = ({onClose}) => {

  const[user,setUser]=useState();
 
  const passwordRef = useRef();
  const conformPasswordRef = useRef()
   const [oldPassword,setOldPassword]=useState();
   const[password,setPassword]=useState();
   const[conformPassword,setConformPassword]=useState();
   const[loginToken ,setLoginToken]=useState();
   
   const toast = useToast();
   const navigate = useNavigate();

  useEffect(()=>{
        const loginData = JSON.parse(localStorage.getItem('loginToken'));
        setUser(loginData.user)
        setLoginToken(loginData.token)
        // emailRef.current.value = loginData?.user.email
   },[]);

   const submitHandel = async(e)=>{
      e.preventDefault();
      if(!oldPassword || !password || !conformPassword){
        toast({
          position: 'top-right',
           title: 'all fields are required !',
            status: 'error',
           duration: 1000,
           isClosable: true,
         });
      }else{
        const data = {
          old_password:oldPassword,
          new_password: password,
          conform_password:conformPassword
        }
        const passwordChanged = await AuthService.changePassword(loginToken,data,user._id);
        console.log(passwordChanged)
        if(passwordChanged.status === 200){
          toast({
            position: 'top-right',
             title: passwordChanged.data.message,
              status: 'error',
             duration: 1000,
             isClosable: true,
           });
           passwordRef.current.value = null ;
           conformPasswordRef.current.value = null;
          onClose()
          localStorage.removeItem('loginToken');
          navigate('/login',{replace:true})
        }else{
          toast({
            position: 'top-right',
             title: passwordChanged.data.message,
              status: 'error',
             duration: 1000,
             isClosable: true,
           });
            passwordRef.current.value = null ;
            conformPasswordRef.current.value = null;
      
        }
 
      }
  
   }
  return (
   <>
     <Flex>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
            value={user?.email}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel> old Password</FormLabel>
          <Input type="password" onChange={(e)=>{setOldPassword(e.target.value)}} />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input ref={passwordRef} type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel> conform Password</FormLabel>
          <Input ref={conformPasswordRef}  type="password" onChange={(e)=>{setConformPassword(e.target.value)}} />
        </FormControl>
        <Stack spacing={6}>
          <Button
          onClick={(e)=>{submitHandel(e)}}
            bg={'teal.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}>
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
   </>
  )
}

export default ChangePassword