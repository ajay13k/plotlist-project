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
  Center,
  useToast,
  Select
} from "@chakra-ui/react";
import { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import  AuthService from "../../services/AuthService";
import Header from "../frontend/Header";
import Footer from "../frontend/Footer";


const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const Signup = () => {
  const toast = useToast()
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
     const[webToken,setWebToken]=useState();
     const[allUserType,setAllUserType]=useState([]);
     const[message,setMessage]= useState();
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
  const[user_type,setUserType]=useState();
  const[profile,setProfile]=useState();

  const signupHandel = async(e)=>{
    e.preventDefault();
   

     if(!firstName || !lastName || !zipCode || !state || !country || !city || !street || !email || !password || !contact || !user_type || !profile){
      toast({
        title: `All feilds are required !`,
        position: "top-right",
        isClosable: true,
        });
     }else{
      if(contact.length > 10 || contact.length < 10){
        
        toast({
          title: '10 digit accept mobile number ',
          position: "top-right",
          isClosable: true,
        });
       }else if(!validateEmail(email)){
         
        toast({
          title: ' email should be unique and proper ',
          description:'example12@gmail.com',
          position: "top-right",
          isClosable: true,
        });
       }else{
        const formdata = new FormData();
        formdata.append('first_name',firstName);
        formdata.append('last_name',lastName);
        formdata.append('zip_code',zipCode);
        formdata.append('state',state);
        formdata.append('country',country);
        formdata.append('city',city);
        formdata.append('street',street);
        formdata.append('email',email);
        formdata.append('password',password);
        formdata.append('contact',contact);
        formdata.append('profile',profile);
        formdata.append('user_type',user_type);
   
 
        
           const signupUser =  await AuthService.signupUser(webToken,formdata);
           console.log(signupUser.data.message)
           console.log(signupUser.data)
           
         toast({
           title: signupUser.data.message,
           position: "top-right",
           isClosable: true,
         });
 
         navigate('/login',{replace:true});
       }
         
     }
   
    // navigate("/admin", { replace: true });
  }
  const getAllUserType = async()=>{
    const userType = await AuthService.getAllUserType(webToken);
         const user = userType.data.filter((u)=>{
              if(u.user_type !== 'admin')
              return u
         });
         console.log(user);
        setAllUserType(user)

  }

  useEffect(()=>{
      const authToken = JSON.parse(localStorage.getItem('webToken'));
      setWebToken(authToken.authToken);
      getAllUserType();
  },[webToken]);


  return (
    <>
    <Header/>
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      backgroundColor="gray.200"
    >
      <Stack spacing={4} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading color="teal.400" fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text color="teal.400" fontSize={"lg"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={2}>
           
           
                <FormControl id="userType" isRequired>
                 <FormLabel>Reg As</FormLabel>
                   <Select onChange={(e)=>{setUserType(e.target.value)}} style={{ height: "40px" }} placeholder="Role">
                   <option default value={'630c5109d6385bd82ad2d859'}>user</option>

               {allUserType?.map((user)=>{
                <option value={user?._id}>{user?.user_type}</option>
              })}
               </Select>
                </FormControl>
           
                <FormControl id="profile" isRequired>
                 <FormLabel>Profile</FormLabel>
                  <Input type="file" onChange={(e)=>{setProfile(e.target.files[0])}} />
                </FormControl>
              
          
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" onChange={(e)=>{setFirstName(e.target.value)}} />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName" isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" onChange={(e)=>{setLastName(e.target.value)}} />
                </FormControl>
              </Box>
            </HStack>
            <HStack>
              <Box>
                <FormControl id="state" isRequired>
                  <FormLabel>State</FormLabel>
                  <Input type="text" onChange={(e)=>{setState(e.target.value)}}/>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="Country" isRequired>
                  <FormLabel>Country</FormLabel>
                  <Input type="text" onChange={(e)=>{setCountry(e.target.value)}} />
                </FormControl>
              </Box>
            </HStack>
            <HStack>
              <Box>
                <FormControl id="zipCode" isRequired>
                  <FormLabel>Zip Code</FormLabel>
                  <Input type="text" onChange={(e)=>{setZipCode(e.target.value)}}/>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="City" isRequired>
                  <FormLabel>city</FormLabel>
                  <Input type="text" onChange={(e)=>{setCity(e.target.value)}}/>
                </FormControl>
              </Box>
            </HStack>
            <HStack>
              <Box>
                <FormControl id="Street" isRequired>
                  <FormLabel>Street</FormLabel>
                  <Input type="text" onChange={(e)=>{setStreet(e.target.value)}}/>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="Contact" isRequired>
                  <FormLabel>Contact</FormLabel>
                  <Input  type="number" onChange={(e)=>{ setContact(e.target.value)}} />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(e)=>{setEmail(e.target.value)}} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? "text" : "password"} onChange={(e)=>{setPassword(e.target.value)}} />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={(e)=>{signupHandel(e)}}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Center>
                <Box>
                  Already a user?{" "}
                  <Link color="teal.500" to="/login" href="/login">
                    Login
                  </Link>
                </Box>
              </Center>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    <Footer/>
    </>
    
  );
};

export default Signup;
