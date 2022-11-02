import { useDisclosure, useToast } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react'
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
    Stack,
    Textarea,
    Tooltip,
    useColorModeValue,

  } from "@chakra-ui/react";

  import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import CategoryService from '../services/CategoryService';
import ListingService from '../services/ListingService';
const EditListing = ({data,children}) => {
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
  const titleRef = useRef();
  const [values,setValues]=useState();
  const descriptionRef = useRef();
    // var initialValues = {
    //   numberOfTickets: "",
    //   tickets: [],
    // };
    const[initialValues ,setInitialValues] = useState({numberOfTickets: "",tickets: []})
    var metakeyref = [];
    var metaValueref = [];
    function onChangeTickets(e, field, values, setValues) {
      // update dynamic form
      const tickets = [...values.tickets];
      const numberOfTickets = e.target.value || 1;
      const previousNumber = parseInt(field.value || "0");
      if (previousNumber < numberOfTickets) {
        for (let i = previousNumber; i < numberOfTickets; i++) {
          tickets.push();
        }
      } else {
        for (let i = previousNumber; i >= numberOfTickets; i--) {
          tickets.splice(i, 1);
        }
      }
      setValues({ ...values, tickets });
  
      // call formik onChange method
      field.onChange(e);
    }
  
    useEffect(()=>{
       const loginuserToken = JSON.parse(localStorage.getItem('loginToken'));
       setPostedUserId(loginuserToken?.user._id);
       setLoginToken(loginuserToken?.token);
       const websiteToken = JSON.parse(localStorage.getItem('webToken'));
       setWebToken(websiteToken.authToken);
      
    },[webToken]);
  
    var bkey = {};
    var bValue = {};
        const getListingById = async()=>{
            const listing = await ListingService.getListingById(webToken,data?._id);
             setTitle(listing?.data.title)
            setDiscreption(listing?.data.description)
            var a = {}
          
            for(var key in listing?.data.metadata ){
                metakeyref.push(key);
                metaValueref.push(listing?.data.metadata[key]);
                  a[key] =listing?.data.metadata[key]
                  initialValues.tickets.push(a);
                }
                
            
          for(var i=0 ; i < metakeyref.length ; i++){
               bkey[i]=metakeyref[i]
               bValue[i]=metaValueref[i]
                setMetadataKey(bkey);
                setMetadataValue(bValue);
          }
         
     
          titleRef.current.value=listing?.data.title;
          descriptionRef.current.value =listing?.data.description ? listing?.data.description:''
          
        }
     
        
        function onChangeTickets(e, field, values, setValues) {
          // update dynamic form
          const tickets = [...values.tickets];
      const numberOfTickets = e.target.value || 1;
      const previousNumber = parseInt(field.value || "0");
      if (previousNumber < numberOfTickets) {
        for (let i = previousNumber; i < numberOfTickets; i++) {
          tickets.push({ });
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
      setSpinner(true)
        var metadata ={}
        var listingData ={ }
        const keys =Object.keys(metadataKey);
         for(var i=0 ;i<keys.length;i++){
            var key = metadataKey[i];
            var value = metadataValue[i];
            metadata[key] = value
         }

    if(!image){
      listingData ={
        title:title,
        description:discreption,
         metadata:metadata
      }
    }else{
      listingData ={
        title:title,
         description:discreption,
         image:image,
         metadata:metadata
      }
    }
      
       console.log(listingData)
        const listing = await ListingService.updateListing(loginToken,listingData,data._id);
        console.log("update after" ,listing)
        setSpinner(false)
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
      
         setMetadataValue({});
         setMetadataKey({});
         setInitialValues({numberOfTickets: "",tickets: []})
         onClose()
    
    
    }
  
    const onChangeKeys = (e)=>{
      console.log(e.target.id ,'===> ',e.target.value)
      setMetadataKey({ ...metadataKey, [e.target.id]: e.target.value });
   
  
    }
   const onChangeValue =(e)=>{
    console.log(e.target.id ,'===> ',e.target.value)

    setMetadataValue({ ...metadataValue, [e.target.id]: e.target.value });
   }
    
  

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
  return (
    <>
      <Button onClick={()=>{onOpen(); getListingById();}} >{children}</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>update Listing</ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody pb={6}>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={2}>
          <FormControl id="name" >
                      <FormLabel>Listing Name</FormLabel>
                      <Input type="text"  onChange={(e)=>{setTitle(e.target.value)}} ref={titleRef}/>
                    </FormControl>
                <FormControl id="image" >
                      <FormLabel>Image</FormLabel>
                      <Input type="file" onChange={(e)=>{setImage(e.target.files[0])}} />
                    </FormControl>
                <FormControl id="discreption" >
                  <FormLabel>Discreption</FormLabel>
                  <Textarea placeholder="Here is a discreption" ref={descriptionRef}  onChange={(e)=>{setDiscreption(e.target.value)}}/>
                </FormControl>

                <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
                                        defaultValue={Object.keys(ticket)[i]}
                                       
                                      />
                                    </FormControl>
                                  </Box>
                                  <Box>
                                    <FormControl id="value">
                                      <FormLabel>Meta Value</FormLabel>
                                      <Input type="text" placeholder="value"  key={i} id={i}  
                                       onChange={(e)=>{onChangeValue(e)}} 
                                       defaultValue={ticket[Object.keys(ticket)[i]]}
                                       />
                                    </FormControl>
                                  </Box>
                                
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
            <Button colorScheme="blue" mr={3}  isLoading ={spinner}
              loadingText='Updating' onClick={(e)=>{onSubmit(e)}}>
              update
            </Button>
            <Button onClick={()=>{onClose(); setSpinner(false); setTitle();setImage();setDiscreption(); setMetadataKey({});setMetadataValue({}); setInitialValues({numberOfTickets: "",tickets: []})}}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditListing