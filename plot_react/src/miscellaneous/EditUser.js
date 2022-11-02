import { SmallCloseIcon } from '@chakra-ui/icons'
import { Avatar, AvatarBadge, Box, Button, Center, Flex, FormControl, FormLabel, Heading, IconButton, Input, Stack, useColorModeValue, useToast } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import AuthService from '../services/AuthService';

const EditUser = ({onClose}) => {


  const toast = useToast();
  const[loginToken ,setLoginToken]=useState();
  const[user,setUser]=useState();

  const[firstName,setFirstName]=useState();
  const[lastName,setLastName]=useState();
  const[zipCode,setZipCode]=useState();
  const[state,setState]=useState();
  const[country,setCountry]=useState();
  const[city,setCity]=useState();
  const[street,setStreet]=useState();
 const[email,setEmail]=useState();
  const[password,setPassword]=useState();
  const[contact,setContact]=useState();
  const[profile,setProfile]=useState();

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const zipCodeRef = useRef();
  const stateRef = useRef();
  const countryRef = useRef();
  const cityRef = useRef();
  const streetRef = useRef();
  const emailRef = useRef();
  const contactRef = useRef();
 const [showProfile,setShowProfile] = useState();
const [profileChange,setProfileChange]=useState(false);
const [tempuser,SetTempUser]=useState();
 useEffect(()=>{
       const loginData = JSON.parse(localStorage.getItem('loginToken'));

        setUser(loginData.user)
         var a= loginData.user
         setLoginToken(loginData.token)
      //  console.log(loginData.user)
      firstNameRef.current.value =loginData?.user.first_name;
      lastNameRef.current.value = loginData?.user.last_name;
       zipCodeRef.current.value = loginData?.user.zip_code;
       stateRef.current.value = loginData?.user.state;
       countryRef.current.value = loginData?.user.country;
       cityRef.current.value = loginData?.user.city;
       streetRef.current.value = loginData?.user.street;
       emailRef.current.value = loginData?.user.email;
       contactRef.current.value = loginData?.user.contact;  
   
  },[]);


  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const submitHandel= async(e)=>{
      e.preventDefault();
      var data = {};
     
      if(!profile){
       data={
        first_name:firstName?firstName :firstNameRef.current.value ,
        last_name : lastName ? lastName :lastNameRef.current.value ,
        state : state ?state :stateRef.current.value,
         zip_code :zipCode ? zipCode : zipCodeRef.current.value,
        country:country?country:countryRef.current.value,
        city:city?city:cityRef.current.value,
        street:street ? street:streetRef.current.value,
        contact:contact?contact:contactRef.current.value,
        email:email?email:emailRef.current.value
       }
      }else{
        data={
          profile:profile,
          first_name:firstName?firstName :firstNameRef.current.value ,
          last_name : lastName ? lastName :lastNameRef.current.value ,
          state : state ?state :stateRef.current.value,
           zip_code :zipCode ? zipCode : zipCodeRef.current.value,
          country:country?country:countryRef.current.value,
          city:city?city:cityRef.current.value,
          street:street ? street:streetRef.current.value,
          contact:contact?contact:contactRef.current.value,
          email:email?email:emailRef.current.value,
         
      }

    }
    var checkContact = contact?contact:contactRef.current.value
    var emailCheck = email?email:emailRef.current.value
    if(checkContact.length > 10 || checkContact.length < 10){
        
      toast({
        title: '10 digit accept mobile number ',
        position: "top-right",
        isClosable: true,
      });
     }else if(!validateEmail(emailCheck)){
       
      toast({
        title: ' email should be unique and proper ',
        description:'example12@gmail.com',
        position: "top-right",
        isClosable: true,
      });
    }else{
      const updateUser = await AuthService.updateProfile(loginToken,data,user._id);

      if(updateUser.status === 200){
        setProfileChange(true)
        setShowProfile(updateUser?.data.userInfo.profile)
        SetTempUser(updateUser?.data.userInfo);
        localStorage.removeItem('loginToken');
        localStorage.setItem('loginToken',JSON.stringify({user:updateUser?.data.userInfo,token:loginToken}))
        toast({
          position: 'top-right',
           title: updateUser.data.message,
            status: 'success',
           duration: 1000,
           isClosable: true,
         });
        //  profileRef.current.value = updateUser.data.userInfo.profile
         firstNameRef.current.value = updateUser?.data.userInfo.first_name;
         lastNameRef.current.value = null;
         zipCodeRef.current.value = null;
          stateRef.current.value = updateUser?.data.userInfo.state;
          countryRef.current.value = null;
         cityRef.current.value = null;
        streetRef.current.value = null;
        emailRef.current.value = null;
        contactRef.current.value = null;
        onClose()
      }else{
        toast({
          position: 'top-right',
           title: updateUser.data.message,
            status: 'error',
           duration: 1000,
           isClosable: true,
         });
         firstNameRef.current.value = null;
         lastNameRef.current.value = null;
         zipCodeRef.current.value = null;
          stateRef.current.value = null;
          countryRef.current.value = null;
         cityRef.current.value = null;
        streetRef.current.value = null;
        emailRef.current.value = null;
        contactRef.current.value = null;
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
        <FormControl id="userName">
         <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" src={ profileChange ?   showProfile :user?.profile }>
                {/* <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                /> */}
              </Avatar>
            </Center>
            <Center w="full">
              <Input type={'file'} onChange={(e)=>{setProfile(e.target.files[0])}}></Input>
             
            </Center>
          </Stack>
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
        <Box>
                <FormControl id="firstName" >
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" ref={firstNameRef} onChange={(e)=>{setFirstName(e.target.value)}}/>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName" >
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" ref={lastNameRef} onChange={(e)=>{setLastName(e.target.value)}}/>
                </FormControl>
              </Box>
        </Stack>
        <Stack spacing={6} direction={['column', 'row']}>
        <Box>
                <FormControl id="state" >
                  <FormLabel>State</FormLabel>
                  <Input type="text" ref={stateRef} onChange={(e)=>{setState(e.target.value)}}/>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="Country" >
                  <FormLabel>Country</FormLabel>
                  <Input type="text" ref={countryRef} onChange={(e)=>{setCountry(e.target.value)}}/>
                </FormControl>
              </Box>
        </Stack>

        <Stack spacing={6} direction={['column', 'row']}>
        <Box>
                <FormControl id="zipCode" >
                  <FormLabel>Zip Code</FormLabel>
                  <Input type="text" ref={zipCodeRef} onChange={(e)=>{setZipCode(e.target.value)}} />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="City" >
                  <FormLabel>city</FormLabel>
                  <Input type="text" ref={cityRef} onChange={(e)=>{setCity(e.target.value)}}/>
                </FormControl>
              </Box>
        </Stack>

        <Stack spacing={6} direction={['column', 'row']}>
        <Box>
                <FormControl id="Street" >
                  <FormLabel>Street</FormLabel>
                  <Input type="text" ref={streetRef} onChange={(e)=>{setStreet(e.target.value)}}/>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="Contact" >
                  <FormLabel>Contact</FormLabel>
                  <Input type="text" ref={contactRef} onChange={(e)=>{setContact(e.target.value)}} />
                </FormControl>
              </Box>
        </Stack>
        <FormControl id="email" >
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
            ref={emailRef}
            onChange={(e)=>{setEmail(e.target.value)}}
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          {/* <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}>
            Cancel
          </Button> */}
          <Button
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}
            onClick={(e)=>{submitHandel(e)}}
            >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
   </>
  )
}

export default EditUser