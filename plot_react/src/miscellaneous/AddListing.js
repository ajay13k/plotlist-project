import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  CloseButton,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Stack,
  Text,
  Textarea,
  Tooltip,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import CategoryService from "../services/CategoryService";
import ListingService from "../services/ListingService";
const AddListing = ({ children }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const[loginToken,setLoginToken]=useState();
  const [webToken,setWebToken]=useState();
  const [categories,setCategories]=useState();
  const [title,setTitle]=useState();
  const [image,setImage]=useState();
  const [discreption,setDiscreption]=useState();
  const [categroyid,setCategoryId]=useState();
  const[PostedUserid,setPostedUserId]=useState();
  const [metadataKey, setMetadataKey] = useState({});
  const [metadataValue, setMetadataValue] = useState({});
  const [spinner,setSpinner] = useState(false);
  const initialValues = {
    numberOfTickets: "",
    tickets: [],
  };

  useEffect(()=>{
    const loginuserToken = JSON.parse(localStorage.getItem('loginToken'));
    console.log(loginuserToken)
    setPostedUserId(loginuserToken?.user._id);
     setLoginToken(loginuserToken?.token);
     const websiteToken = JSON.parse(localStorage.getItem('webToken'));
     setWebToken(websiteToken.authToken);
     getAllCategory();
  },[webToken])

 const getAllCategory = async ()=>{
   const category = await CategoryService.getAllCategory(webToken);
  
   setCategories(category.data.categories)

 }
  function onChangeTickets(e, field, values, setValues) {
    // update dynamic form
    const tickets = [...values.tickets];
    const numberOfTickets = e.target.value || 1;
    const previousNumber = parseInt(field.value || "0");
    if (previousNumber < numberOfTickets) {
      for (let i = previousNumber; i < numberOfTickets; i++) {
        tickets.push({ keyName: "", value: "" });
      }
    } else {
      for (let i = previousNumber; i >= numberOfTickets; i--) {
        tickets.splice(i, 1);
      }
    }
    setValues({ ...values, tickets });
   field.onChange(e);
  }

  const onSubmit = async(e) =>{
    e.preventDefault();
    if(!title || !image || !categroyid || !discreption || !PostedUserid ){
      toast({
        position: 'top-right',
         title: 'all fields are required !',
       
         status: 'error',
         duration: 1000,
         isClosable: true,
       });
    }else{
      setSpinner(!spinner)
      var metadata ={}
      const keys =Object.keys(metadataKey);
       for(var i=0 ;i<keys.length;i++){
          var key = metadataKey[i];
          var value = metadataValue[i];
          metadata[key] = value
       }
    
      const listingData ={
        title:title,
        image:image,
        categroyid:categroyid,
        description:discreption,
        PostedUserid:PostedUserid,
       metadata:metadata
      }
     
      const listing = await ListingService.AddListing(loginToken,listingData);
      setSpinner(!spinner)
      toast({
        position: 'top-right',
         title: listing.data.message,
         description: "We've created your listing ",
         status: 'success',
         duration: 1000,
         isClosable: true,
       });
       setTitle(null);
       setDiscreption(null);
       setImage(null);
       setCategoryId(null);
       setPostedUserId(null);
       setMetadataValue({});
       setMetadataKey({});
       onClose()
    }
  
  }

  const onChangeKeys = (e)=>{
    setMetadataKey({ ...metadataKey, [e.target.id]: e.target.value });
 

  }
 const onChangeValue =(e)=>{
  setMetadataValue({ ...metadataValue, [e.target.id]: e.target.value });
 }
  function removefields(values,setValues ,index){
     
    console.log(values)
    console.log(setValues)
    console.log(index)
   const a =  values.tickets.splice(index, 1);
    // setValues(a.tickets);
  }
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  return (
    <>
      <Text onClick={onOpen}>{children}</Text>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your Listing</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={2}>
                <HStack>
                  <Box>
                    <FormControl id="name" isRequired>
                      <Select onChange={(e)=>{setCategoryId(e.target.value)}} placeholder="Select Category">
                        {categories?.map((cat)=>{
                          return(
                         <option value={cat._id}>{cat.category_name}</option>

                          )
                        })}
                      
                      </Select>
                    </FormControl>
                  </Box>
                </HStack>
              
                <FormControl id="name" isRequired>
                      <FormLabel>Listing Name</FormLabel>
                      <Input type="text" onChange={(e)=>{setTitle(e.target.value)}} />
                    </FormControl>
                <FormControl id="image" isRequired>
                      <FormLabel>Image</FormLabel>
                      <Input type="file" onChange={(e)=>{setImage(e.target.files[0])}}/>
                    </FormControl>
                <FormControl id="discreption" isRequired>
                  <FormLabel>Description</FormLabel>
                  <Textarea placeholder="Here is a description" onChange={(e)=>{setDiscreption(e.target.value)}} />
                </FormControl>

                <Formik initialValues={initialValues} >
                  {({ errors, values, touched, setValues }) => (
                    <Form>
                      <div className="card m-3">
                        <HStack>
                          <Box>
                            <FormControl id="image" isRequired>
                              <Field name="numberOfTickets">
                                {({ field }) => (
                                  <Button
                                    colorScheme="blue"
                                    mr={3}
                                    onClick={(e) =>
                                      onChangeTickets(
                                        e,
                                        field,
                                        values,
                                        setValues
                                      )
                                    }
                                  >
                                    {" "}
                                    Add Meta Info
                                  </Button>
                                )}
                              </Field>
                            </FormControl>
                          </Box>
                        </HStack>
                    
                        <FieldArray name="tickets">
                          {() =>
                            values.tickets.map((ticket, i) => {
                             return (
                                <HStack>
                                  <Box>
                                    <FormControl id="key">
                                      <FormLabel>Meta Key</FormLabel>
                                      <Input
                                        type="text"
                                        placeholder="your key"
                                        key={i} 
                                        id={i}
                                        onChange={(e)=>{onChangeKeys(e)}}
                                      />
                                    </FormControl>
                                  </Box>
                                  <Box>
                                    <FormControl id="value">
                                      <FormLabel>Meta Value</FormLabel>
                                      <Input type="text" placeholder="value" key={i} id={i}   onChange={(e)=>{onChangeValue(e)}} />
                                    </FormControl>
                                  </Box>
                                  {/* <Box>
                                    <Tooltip
                                      hasArrow
                                      label="remove filed"
                                      bg="gray.300"
                                      color="black"
                                    >
                                      <CloseButton onClick={()=>{removefields(values , setValues, i)}} size="sm"></CloseButton>
                                    </Tooltip>
                                  </Box> */}
                                </HStack>
                              );
                            })
                          }
                        </FieldArray>
                     
                      </div>
                    </Form>
                  )}
                </Formik>
              </Stack>
            </Box>
          </ModalBody>

          <ModalFooter>
     
          <Button
              isLoading ={spinner}
              loadingText='Submitting'
          
          colorScheme="blue" 
          mr={3}
          onClick={(e)=>{onSubmit(e)}
      
        
      }
    >
    Save
    </Button>
        
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddListing;
