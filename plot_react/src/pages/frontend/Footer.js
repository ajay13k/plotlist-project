import {
  Box,
  Center,
  chakra,
  Container,
  Divider,
  IconButton,
  Image,
  Input,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";
import SiteMengmentService from "../../services/SiteMengmentService";
import AuthService from "../../services/AuthService";
console.log('footer')
const Footer = () => {
  const[webToken,setWebToken]=useState();
  const[footers,setFooters]=useState();
  const[contactus,setContactUs] =useState();
  const [logoData,setLogoData]=useState();
  const[authToken,setauthToken]=useState()

 
  const getWebToken = async()=>{
      await AuthService.getWebToken().then(webtoken=>{
        const a =JSON.stringify(webtoken.data);
          setWebToken(JSON.parse(a).authToken)
        localStorage.setItem('webToken',JSON.stringify(webtoken.data));
      });
  }
useEffect(()=>{
 const authToken = JSON.parse(localStorage.getItem('webToken'));
 if(!authToken){
   getWebToken()
 }else{
   setWebToken(authToken.authToken);
 }
 getAllsiteContent();
},[webToken])
 const getAllsiteContent = async()=>{
    const siteData = await SiteMengmentService.getAllsiteContent(webToken);
    const footer =  siteData.data.filter((e)=>{
      if(e.related_tab === 'footer'){
        return e
      }
    });

    const footerContactus =  siteData.data.filter((e)=>{
      if(e.related_tab === 'footer' && e.title==='Contact us'){
        return e
      }
    });

      const logo =  siteData.data.filter((e)=>{
      if(e.related_tab === 'logo'){
        return e
      }
    });
  
  console.log(footer)
  setContactUs(footerContactus[footerContactus.length-1]);
  setLogoData(logo[logo.length-1])
  setFooters(footer)
 }


  const ListHeader = ({ children }) => {
    return (
      <Text   fontSize={"xl"} mb={2} fontFamily={'cursive'}  fontWeight={'bold'}>
        {children}
      </Text>
    );
  };




  return (
    <>
      <Box
        bg={'aliceblue'}
        color={useColorModeValue("gray.700", "gray.200")}
      >
        <Container as={Stack} maxW={{md:"12xl"}} py={10}>
          <SimpleGrid
            templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 2fr" }}
            spacing={8}
          >
           
            <Stack spacing={6}  align={"flex-start"}>
              <Box>
                {/* <Logo color={useColorModeValue("gray.700", "white")} /> */}
                <Image src={logoData?.image} fallbackSrc='https://furniture.mangoitsol.com/project_mockups/templates/assets/images/black-logo.png' />
              </Box>
              <Text fontFamily={'cursive'} fontSize={"sm"}>
               {logoData?.discreption}
              </Text>
            </Stack>
            <Stack></Stack>
           <Stack
              // align={"flex-start"}
              direction={["column", "row"]}
              // spacing="10px"
               ml={{md:'-100px'}}
            >
                <Box >
                <ListHeader fontFamily={'cursive'}  fontWeight={'bold'}> Helpful Links</ListHeader>
                
                <Stack  direction={'column'} spacing="0px">
                  {footers?.map((f)=>{
                    if(f?.title !=='Contact us'){

                      return(
                        <Box w="full" h="40px"  fontFamily={'cursive'}  >
                        <Link href={f?.redirect_link}>{f?.title}</Link>
                     </Box>
                      )
                    }
                  })}
               
                 </Stack>
               </Box>
                
            </Stack>
           
            
           
            <Stack ml={{md:110}} align={"flex-start"}>
              <ListHeader >{contactus?.title}</ListHeader>
              <Stack direction={"row"}>
                <Text  fontFamily={'cursive'}    fontSize={"md"}>
                  {contactus?.address}
                </Text>
              </Stack>
              <Stack direction={"row"}>
                <Link href="tel:+496170961709" cursor={'pointer'} fontFamily={'cursive'}    fontSize={"md"} textAlign={"center"}>
                  {contactus?.call_one}
                </Link>
                {/* <Text   fontFamily={'cursive'}  fontWeight={'bold'} pt={6} fontSize={"md"} textAlign={"center"}>
                  {contactus?.call_two}
                </Text> */}
              </Stack>
              <Stack direction={"row"}>
                {/* <Text  fontFamily={'cursive'}  fontWeight={'bold'} pt={6} fontSize={"md"} textAlign={"center"}>
                  {contactus?.call_one}
                </Text> */}
                <Link  href="tel:+496170961709" cursor={'pointer'}  fontFamily={'cursive'}    fontSize={"md"} textAlign={"center"}>
                  {contactus?.call_two}
                </Link>
              </Stack>
            </Stack>
          </SimpleGrid>
          <Divider></Divider>
          <Text pt={6} fontSize={"sm"}  fontFamily={'cursive'}  fontWeight={'bold'} textAlign={"center"}>
            Copyright © 2022 Plot Listing Co., Ltd. All Rights Reserved.
          </Text>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
