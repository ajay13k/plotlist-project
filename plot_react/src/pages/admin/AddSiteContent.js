import { Box, Button, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, Textarea, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { Field, FieldArray, Form, Formik } from 'formik';
import SiteMengmentService from '../../services/SiteMengmentService';
const AddSiteContent = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [showfileInput ,setShowFileInput]=useState(false);
    const [showheaderInput ,setShowHeaderInput]=useState(false);
    const [showfooterInput ,setShowFooterInput]=useState(false);
    const [showBannerInput ,setShowBannerInput]=useState(false);
    const [reletedTab,setReletedTab] = useState();
    const [logo,setLogo]=useState();
    const [metadataKey, setMetadataKey] = useState({});
    const [metadataValue, setMetadataValue] = useState({});
    const[loginToken,setLoginToken]=useState();


    const[title,setTitle]=useState();
    const [link,setLink]=useState();
    const [text,setText]=useState();
    const[reletedPage,setReletedPage]=useState();
    const[heading,setHeading]=useState();



    const toast = useToast();
    const initialValues = {
        numberOfTickets: "",
        tickets: [],
      };
    

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
    
        // call formik onChange method
        field.onChange(e);
      }
    
       async function onSubmit() {
        // display form field values on success
        if(!reletedTab){
          toast({
            position: 'top-right',
             title:`please select the drop down`,
             
             status: 'success',
             duration: 1000,
             isClosable: true,
           });
        }else{
          var metadata ={};
          // if(metadataKey){
          //   const keys =Object.keys(metadataKey);
          //   for(var i=0 ;i<keys.length;i++){
          //      var key = metadataKey[i];
          //      var value = metadataValue[i];
          //      metadata[key] = value
          //   }
          // }
          metadata['related_tab'] = reletedTab
          //header keys
          if(reletedTab==='header'){

            metadata['header_title']=title
            metadata['header_link']=link
          }

          //footer
          if(reletedTab === 'footer'){

            metadata['heading']=heading
            metadata['title']=title
            metadata['redirect_link']=link
          }
         
          //banner
          if(reletedTab === 'banner'){
            metadata['related_page']=reletedPage
            metadata['text']=text
          }



           if(logo){
              metadata['image']= logo
              metadata['redirect_link']=link
           }
         
           console.log(metadata)
           const sitecontent = await SiteMengmentService.createSiteContent(loginToken,metadata);
           console.log(sitecontent);
           onClose()
          toast({
            position: 'top-right',
             title:`${sitecontent.data.message} to the ${reletedTab}`,
             description: "We've created your site content ",
             status: 'success',
             duration: 1000,
             isClosable: true,
           });
        }
 

      }
   

    
       

      const onChangeKeys = (e)=>{
        setMetadataKey({ ...metadataKey, [e.target.id]: e.target.value });
     
    
      }
     const onChangeValue =(e)=>{
      setMetadataValue({ ...metadataValue, [e.target.id]: e.target.value });
     }

      const initialRef = React.useRef(null);
      const finalRef = React.useRef(null);

      useEffect(()=>{
        const loginuserToken = JSON.parse(localStorage.getItem('loginToken'));
        setLoginToken(loginuserToken.token);
      },[loginToken])

      const showinput = (e)=>{
        if(e==='logo'){
          setReletedTab(e)
          setShowFileInput(true)
          setShowHeaderInput(false)
          setShowFooterInput(false);
          setShowBannerInput(false);
         
        }else if(e==='header'){
          setReletedTab(e)
          setShowHeaderInput(true)
          setShowFooterInput(false);
          setShowBannerInput(false);
          setShowFileInput(false);
        }else if(e==='footer'){
          setReletedTab(e)
          setShowHeaderInput(false)
          setShowFooterInput(true);
          setShowBannerInput(false);
          setShowFileInput(false);
        }else if(e==='banner'){
          setReletedTab(e)
          setShowHeaderInput(false)
          setShowFooterInput(false);
          setShowBannerInput(true);
          setShowFileInput(true);
        }
      }
  return (
    <>
    <Button onClick={onOpen}>{children}</Button>
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create site Content</ModalHeader>
        <ModalCloseButton onClick={()=>{ setShowFileInput(false); setReletedTab(null);setShowHeaderInput(null);setShowFooterInput(null);setShowBannerInput(null)}}/>
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
                  <FormControl id="name" onChange={(e)=>{showinput(e.target.value)}} isRequired>
                    <Select placeholder="Select related tab">
                      <option value={'header'}>Header</option>
                      <option value={'footer'}>Footer</option>
                      <option value={'banner'}>Banner</option>
                      <option value={'logo'} >logo</option>
                    </Select>
                  </FormControl>
                </Box>
                <Box >
                  <FormControl display={showfooterInput?'block':'none'} id="heading" onChange={(e)=>{setHeading(e.target.value)}} isRequired={true}>
                   <Input type="text" placeholder='heading'/>
                  </FormControl>
                </Box>
              </HStack>
              <HStack>
             <Box display={showfileInput?'block':'none'}>
                  <FormControl id="image" isRequired={true}>
                    <FormLabel>Image</FormLabel>
                    <Input type="file" onChange={(e)=>{setLogo(e.target.files[0])}} />
                  </FormControl>
                </Box>
              </HStack>
            
              <HStack>
             <Box >
                  <FormControl display={showheaderInput||showfooterInput?'block':'none'} id="title" isRequired={true}>
                    <FormLabel>Title</FormLabel>
                    <Input type="text" onChange={(e)=>{setTitle(e.target.value)}}/>
                  </FormControl>
                </Box>
                <Box >
                  <FormControl display={ !showBannerInput ?'block':'none'} id="link" isRequired={true}>
                    <FormLabel>Redirect Link</FormLabel>
                    <Input type="text"  onChange={(e)=>{setLink(e.target.value)}}  />
                  </FormControl>
                </Box>
              </HStack>

              <Box >
                  <FormControl display={ showBannerInput ?'block':'none'} onChange={(e)=>{setReletedPage(e.target.value)}} id="image" isRequired={true}>
                    <FormLabel>Related Page</FormLabel>
                   <Select placeholder="Select releted page">
                      <option value={'home'}>Home</option>
                      <option value={'contact'}>Contact</option>
                      <option value={'listing'}>Listing</option>
                      <option value={'category'} >Category</option>
                    </Select>
                  </FormControl>
                </Box>
              <Box >
                  <FormControl  display={ showBannerInput ?'block':'none'} id="image" isRequired={true}>
                    <FormLabel>Text</FormLabel>
                    <Textarea type='text'  onChange={(e)=>{setText(e.target.value)}}/>
                  </FormControl>
                </Box>
               {/* <Formik initialValues={initialValues}>
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
                                  Add site content
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
                                    <Input type="text" placeholder="value"  
                                        key={i} id={i}   onChange={(e)=>{onChangeValue(e)}}
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
              </Formik> */}
            </Stack>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}  onClick={onSubmit} >
            Save
          </Button>
          {/* <Button onClick={onClose}>Cancel</Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
  )
}

export default AddSiteContent