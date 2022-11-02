import { Avatar, Box, Button, Center, chakra, Flex, FormControl, FormHelperText, Heading, Input, InputGroup, InputLeftElement, InputRightElement, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {LockIcon} from '@chakra-ui/icons'
import { EmailIcon } from '@chakra-ui/icons';
import { useToast } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import  AuthService from "../../services/AuthService";
import Header from '../frontend/Header';
import Footer from '../frontend/Footer';
const Login = () => {
  const toast = useToast()
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const[email,setEmail]=useState();
  const[password,setPassword]=useState();
  const[message,setMessage]= useState()

  const handleShowClick = () => setShowPassword(!showPassword);
  const loginHandle = async(e)=>{

    e.preventDefault();
    if(!email || !password){
      toast({
        title: 'Enter email address and Password',
        position:'top-right',
        status: 'error',
        duration: 1000,
       
      })
    }else{
      const userloginData = {
        email,
        password
      }
      const loginUser = await AuthService.loginUser(userloginData);
      if(loginUser.status === 200){
           console.log(loginUser.data.message)
           setMessage(loginUser.data?.message)
           if(loginUser.data.user && loginUser.data.token){
               localStorage.setItem('loginToken',JSON.stringify(loginUser.data));
                    // console.log(loginUser.data.user.user_type.user_type)
               if(loginUser.data.user.user_type.user_type === 'admin'){
                   navigate("/adminhome", { replace: true });
               }else{
                   navigate("/userhome", { replace: true });
                 
               }
               
           }else{
              navigate("/login", { replace: true });
  
           }
      }
      toast({
        title: loginUser.data.message,
        position:'top-right',
        status: 'success',
        duration: 1000,
       
      })
    }


  }
  return (

    <>
    <Header/>
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup >
                  <InputLeftElement
                    pointerEvents="none"
                    children={<EmailIcon></EmailIcon>}
                  />
                  <Input isRequired type="email" placeholder="email address" onChange={(e)=>{setEmail(e.target.value)}} />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<LockIcon></LockIcon>}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e)=>{setPassword(e.target.value)}}
                    isRequired
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {/* <FormHelperText textAlign="right">
                  <Link to='/login' href="#">forgot password?</Link>
                </FormHelperText> */}
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={(e)=>{loginHandle(e)}}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
        
      </Stack>
       
      <Stack pt={6}>
           
           <Box >
  New to us?{" "}
  <Link  style={{color:"teal",textDecoration:'revert'}}  to="/signup" href="#">
    Sign Up
  </Link>
  
</Box>
        
      </Stack>
   
    </Flex>
  <Footer/>

    </>
    
    
  );
}

export default Login