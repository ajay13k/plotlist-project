import {
  AspectRatio,
  Box,
  Button,
  Checkbox,
  Container,
  createIcon,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { BsPerson } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import CategoryService from "../../services/CategoryService";
import SiteMengmentService from "../../services/SiteMengmentService";
import Banner from "./Banner";
import Footer from "./Footer";
import Header from "./Header";

const Contact = () => {
  const [categories, setCategories] = useState();
  const [webToken, setWebToken] = useState();
  const [name, setName] = useState();
  const [surName, setSurName] = useState();
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();
  const [category, setCategory] = useState([]);
  const [iscategory, setIsCategory] = useState(false);

  const nameRef = useRef(null);
  const surNameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const toast = useToast();
  const navigate =useNavigate();
  const getAllCategory = async () => {
    const categoriesArray = await CategoryService.getAllCategory(webToken);
    setCategories(categoriesArray.data.categories);
  };

  useEffect(() => {
    const websiteToken = JSON.parse(localStorage.getItem("webToken"));
    setWebToken(websiteToken.authToken);
    getAllCategory();
  }, [webToken,category]);

  const handleChangeCategory = (checkboxValue) => {
    
    if (!category.includes(checkboxValue)) {
      category.push(checkboxValue);
    } else {
    
      const index = category.indexOf(checkboxValue);
      if (index > -1) {
        category.splice(index, 1); 
      }
    }
  if(category.length > 0 ){
    setIsCategory(true)
  }else{
    setIsCategory(false)
  }
  };
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const contactData = {
      name,
      surName,
      email,
      message,
      category,
    };
    if(!validateEmail(email)){
      toast({
        title: 'email should be proper with domain!',
        position:'top-right',
        status: 'success',
        duration: 1000, 
       
      });
    }else{
    
      const contact = await SiteMengmentService.saveContactor(contactData,webToken);
      if(contact.status === 200){
        toast({
          title: 'we will reach to you !',
          position:'top-right',
          status: 'success',
          duration: 1000,
         
        });
       
      }
      nameRef.current.value = null
      surNameRef.current.value = null
      emailRef.current.value = null
      messageRef.current.value = null
      setName();
      setSurName();
      setEmail();
      setMessage();
      setCategory([])
    }

    
 
  };
  return (
    <>
      <Header />
      <Banner />

      <Container maxW={'7xl'}>
      <Stack
        align={'center'}
        spacing={{ base: 2, md: 5 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: 'column', md: 'row' }}>
        {/* <Stack flex={1} spacing={{ base: 5, md: 10 }}>
      
        <AspectRatio ratio={9 / 10}>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29379.76014064519!2d-43.402097660033114!3d-23.00650845889309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bdb695cd967b7%3A0x171cdd035a6a9d84!2sAv.%20L%C3%BAcio%20Costa%2C%20Rio%20de%20Janeiro%20-%20RJ%2C%20Brazil!5e0!3m2!1sen!2sin!4v1661148396905!5m2!1sen!2sin"></iframe>
            </AspectRatio>
        
        </Stack> */}
        <Flex
          flex={1}
          justify={'center'}
          align={'center'}
          position={'relative'}
          w={'full'}>

          <Box
            position={'relative'}
            height={'600px'}
             width={'full'}
            overflow={'hidden'}>
           
       <AspectRatio ratio={6 / 10}>
              <iframe  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29379.76014064519!2d-43.402097660033114!3d-23.00650845889309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bdb695cd967b7%3A0x171cdd035a6a9d84!2sAv.%20L%C3%BAcio%20Costa%2C%20Rio%20de%20Janeiro%20-%20RJ%2C%20Brazil!5e0!3m2!1sen!2sin!4v1661148396905!5m2!1sen!2sin"></iframe>
            </AspectRatio>
    
          </Box>
        </Flex>
        <Flex
          flex={1}
          justify={'center'}
          align={'center'}
          position={'relative'}
          w={'full'}>
       
          <Box
            position={'relative'}
            height={'600px'}
             width={'full'}
           >
           {/* <Image
              alt={'Hero Image'}
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={'100%'}
              src={
                'https://res.cloudinary.com/piyushproj/image/upload/v1661315561/hjxhwu2a8p0q5quaxsif.jpg'
              }
            /> */}
            <Heading>Contact us</Heading>
          
            <Box bg="white" w={{base:'100%'}} borderRadius="lg">
                  <Box m={8} color="#0B0E3F">
                    <VStack spacing={5}>
                      <FormControl id="name">
                        <FormLabel> Name</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement
                            pointerEvents="none"
                            children={<BsPerson color="gray.800" />}
                          />
                          <Input type="text" size="md"   onChange={(e) => {
                          setName(e.target.value);
                        }}
                       ref={nameRef}/>
                        </InputGroup>
                      </FormControl>
                      <FormControl id="name">
                        <FormLabel> SurName</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement
                            pointerEvents="none"
                            children={<BsPerson color="gray.800" />}
                          />
                          <Input type="text" size="md" onChange={(e) => {
                          setSurName(e.target.value);
                        }}
                        ref={surNameRef} />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="name">
                        <FormLabel>Mail</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement
                            pointerEvents="none"
                            children={<MdOutlineEmail color="gray.800" />}
                          />
                          <Input type="text" size="md"  onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    ref={emailRef}/>
                        </InputGroup>
                      </FormControl>
                      <FormControl id="name">
                        <FormLabel>Message</FormLabel>
                        <Textarea
                          borderColor="gray.300"
                          _hover={{
                            borderRadius: 'gray.300',
                          }}
                          placeholder="message"
                         
                          onChange={(e) => {
                            setMessage(e.target.value);
                          }}
                          ref={messageRef}
                        />
                      </FormControl>
                      <Stack spacing={{base:0,md:5}}  direction={{ base: 'column', md: 'row' }}>
                              {categories &&
                                categories?.map((cat) => {
                                  return (
                                    <Checkbox
                                    borderColor={'black'}
                                    colorScheme={'black'}
                                      value={cat._id}
                                      onChange={(e) => {
                                        handleChangeCategory(e.target.value);
                                      }}
                                      colorScheme="blue"
                                      color={"black"}
                                    >
                                      {cat?.category_name}
                                    </Checkbox>
                                  );
                                })}
              
                </Stack>
                     
                      <FormControl id="name" float="right">
                        <Button
                       
                          variant="solid"
                          bg="#0D74FF"
                          color="white"
                          _hover={{}}
                          onClick={(e) => {
                            handleSubmit(e);
                          }}
                          isDisabled={ !name||!surName || !email || !message || !iscategory ? true : false}
                    
                          >
                          Send Message
                        </Button>
                    
                      </FormControl>
                    </VStack>
                  </Box>
                </Box>

          </Box>
        </Flex>
      </Stack>
    </Container>

 <Divider />
      <Footer />
    </>
  );
};

export default Contact;


export const Blob = ({props}) => {
  return (
    <Icon
      width={'100%'}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </Icon>
  );
};