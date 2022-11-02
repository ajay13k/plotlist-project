import { Box, Container, Heading, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import SiteMengmentService from '../../services/SiteMengmentService';

const Banner = () => {
     const location = useLocation();
     console.log('location',location)
     const [card, setCard] = useState({
      title: "OVER 36,500+ ACTIVE LISTINGS",
      text: "Find Nearby Places & Things.",
      image:
        "https://furniture.mangoitsol.com/project_mockups/templates/assets/images/banner-bg.jpg",
    });

      const[webToken,setWebToken]=useState();

      useEffect(()=>{
        const authToken = JSON.parse(localStorage.getItem('webToken'));
        setWebToken(authToken.authToken);
        getAllsiteContent();
      },[webToken]);

      const getAllsiteContent = async()=>{
        const siteData = await SiteMengmentService.getAllsiteContent(webToken);
        var path = location.path;
        const banner =  siteData.data.filter((e)=>{
          if(location.pathname === '/categoryWeb' || location.pathname === '/listingWeb'){
                      path =`/${e.related_page}Web`
          }else if(location.pathname==='/'){
            path = location.pathname
          }
          
          else{
            path = `/${e.related_page}`
          }
          console.log(e.related_tab)
          if(e.related_tab === 'banner' && location.pathname === path){
            return e
          }
        });
        setCard(banner[0])
       console.log(banner)
      
     }
  return (
    <>
     <Box
      position={'relative'}
      height={'600px'}
      maxW={"full"}
      overflow={'hidden'}>
      
   <Box
            key={card?.title}
            height={'6xl'}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${card?.image})`}>
        
            <Container size="container.xl" maxW="container.sm" height="600px" ml={{base:5,md:10}}  position="relative">
            {/* <Container size="container.xl" maxW="container.sm" height="200px" position="relative" */}
              <Stack
                spacing={2}
                 position="absolute"
                top="50%"  
                transform="translate(0, -50%)"
               >
              
                <Text fontSize={{ base: 'md', lg: 'lg' }} color="white">
                {card?.title} 
                </Text>
             
                <Text fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}  color="white">
               {card?.text}
                </Text>
                
              </Stack>
            </Container>
          </Box>
       
     
    </Box>
    </>
  )
}

export default Banner