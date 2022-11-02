import { Avatar, Button, FormControl, FormLabel, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useDisclosure, useSafeLayoutEffect, useToast } from '@chakra-ui/react'
import  React, { useEffect, useRef, useState } from 'react'
import SiteMengmentService from '../../services/SiteMengmentService';

const EditSitecontent = ({children,data}) => {
     
    const redirectRef = React.useRef('title');
    const [showfileInput ,setShowFileInput]=useState(false);
    const [showheaderInput ,setShowHeaderInput]=useState(false);
    const [showfooterInput ,setShowFooterInput]=useState(false);
    const [showBannerInput ,setShowBannerInput]=useState(false);

    const[title,setTitle]=useState();
    const [link,setLink]=useState();
    const [text,setText]=useState();
    const[heading,setHeading]=useState();
     const [image,setImage]=useState();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const[loginToken,setLoginToken]=useState();
    const toast = useToast();
    console.log(data)
    useEffect(()=>{
    
     if(data.related_tab === 'header'){
       setShowHeaderInput(true);
       setShowFooterInput(false);
       setShowBannerInput(false);
       setShowFileInput(false);
    }

    if(data.related_tab === 'footer'){
      setShowHeaderInput(false);
      setShowFooterInput(true);
      setShowBannerInput(false);
      setShowFileInput(false);
    }
    if(data.related_tab === 'banner'){
      setShowHeaderInput(false);
      setShowFooterInput(false);
      setShowBannerInput(true);
      setShowFileInput(false);
    }
    if(data.related_tab === 'logo'){
      setShowHeaderInput(false);
      setShowFooterInput(false);
      setShowBannerInput(false);
      setShowFileInput(true);
    }
    })

    useEffect(()=>{
      const loginuserToken = JSON.parse(localStorage.getItem('loginToken'));
      setLoginToken(loginuserToken.token);
    },[loginToken])


    const saveHandle =async (e)=>{
      e.preventDefault();
          const updateData={}
          if(data.related_tab === 'header'){
            updateData['header_title']=  title ? title : data.title
            updateData['header_link']=  link ? link : data.redirectLink
          }

          if(data.related_tab === 'footer'){
            updateData['title']=  title ? title : data.title
            updateData['redirect_link']=  link ? link : data.redirectLink
          }
          if(data.related_tab === 'banner'){
            updateData['text']=  text ? text : data.text
            updateData['title']=  title ? title : data.title
            updateData['image']=  image ? image : data.image
          }
          if(data.related_tab === 'logo'){
               updateData['image']=  image ? image : data.image
               updateData['redirect_link']=  link ? link : data.redirectLink
          }

          console.log(updateData)
          const sitecontentUpdate = await SiteMengmentService.updateSiteContent(loginToken,updateData,data._id);
          if(sitecontentUpdate.status === 200){
            toast({
              position: 'top-right',
               title:` ${sitecontentUpdate.data.message}`,
               status: 'success',
               duration: 1000,
               isClosable: true,
             });
             onClose()
          }else{
            toast({
              position: 'top-right',
               title:` ${sitecontentUpdate.data.message}`,
               status: 'warning',
               duration: 1000,
               isClosable: true,
             });
          }
    }

  return (
    <>
    <Button   onClick={()=>{onOpen();}}>{children}</Button>

    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Site Content</ModalHeader>  
        <ModalCloseButton onClick={()=>{setTitle();setHeading(); setText(); setImage(); setLink();}} />
        <ModalBody pb={6}>
        <Image display={showfileInput || showBannerInput ?'block':'none'} src={data.image}  />
         
           <FormControl  display={showfileInput || showBannerInput ?'block':'none'} mt={4}>
            <FormLabel>{showfileInput ? 'Logo':'Backgorud image'}</FormLabel>
            <Input  name='image' type='file' onChange={(e)=>{setImage(e.target.files[0])}}/>
          </FormControl>
          <FormControl display={showBannerInput ?'block':'none'} mt={4}>
            <FormLabel>Text</FormLabel>
            <Textarea  name='title' defaultValue={data?.text} onChange={(e)=>{setText(e.target.value)}}/>
          </FormControl>


          <FormControl display={!showBannerInput ?'block':'none'}>
          <FormLabel>Redirect Link</FormLabel>
           <Input name='redierct link' defaultValue={data?.redirectLink} onChange={(e)=>{setLink(e.target.value)}}  />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Title</FormLabel>
            <Input  name='title' defaultValue={data?.title} onChange={(e)=>{setTitle(e.target.value)}}/>
          </FormControl>
          <FormControl  display={showfooterInput?'block':'none'} mt={4}>
            <FormLabel>Heading</FormLabel>
            <Input  name='heading' defaultValue={data?.heading} onChange={(e)=>{setHeading(e.target.value)}}/>
          </FormControl>


        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={(e)=>{saveHandle(e)}}>
            Save
          </Button>
          
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
    )
}

export default EditSitecontent