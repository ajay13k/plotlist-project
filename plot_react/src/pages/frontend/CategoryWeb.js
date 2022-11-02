import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Spacer,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CategoryService from "../../services/CategoryService";
import ListingService from "../../services/ListingService";
import Banner from "./Banner";
import Footer from "./Footer";
import Header from "./Header";
import SocialButton from "./SocialButton";

const CategoryWeb = () => {
  const [categories, setCategories] = useState();
  const [listings, setListings] = useState();
  const [webToken, setWebToken] = useState();
  const [activeCat, setActiveCat] = useState();

  const getAllCategory = async () => {
    const categoriesArray = await CategoryService.getAllCategory(webToken);
    setCategories(categoriesArray.data.categories);
    setActiveCat(categoriesArray.data.categories[0]);
  };

  const getAllListing = async () => {
    const ListingData = await ListingService.getAllListing(webToken);
    setListings(ListingData.data);
    console.log(ListingData.data);
  };

  useEffect(() => {
    const websiteToken = JSON.parse(localStorage.getItem("webToken"));
    setWebToken(websiteToken.authToken);
    getAllListing();
    getAllCategory();
  }, [webToken]);

  return (
    <>
      <Header></Header>
      <Banner></Banner>
      <Wrap>
        {categories &&
          categories.map((cat) => {
            return (
              <WrapItem>
                <Center
                  w="full"
                  h="100px"
                  bg={cat === activeCat ? "#2b2d42" : "#8d99af"}
                >
                  <Box w="250px" h="80px">
                    <HStack
                      onClick={() => {
                        setActiveCat(cat);
                      }}
                      direction={"row"}
                      spacing={5}
                      ml={{ md: 5, base: 65 }}
                      cursor={"pointer"}
                    >
                      <SocialButton label={"Twitter"}>
                        <Image src={cat.icon} />
                      </SocialButton>
                      <Text
                        style={{ "font-family": "Montserrat , sans-serif" }}
                        color={"white"}
                        ml={"inherit"}
                      >
                        {cat.category_name}
                      </Text>
                    </HStack>
                  </Box>
                </Center>
              </WrapItem>
            );
          })}
      </Wrap>

      <Flex mt={10} direction={{ md: "row", base: "column" }}>
        <Box bg="#2b2d42" h="100px">
          <HStack w={205} direction={{ md: "row" }} spacing={5} mt={5} ml={10}>
            <SocialButton label={"Twitter"} href={"#"}>
              <Image src={activeCat?.icon} />
            </SocialButton>
            <Text
              style={{ "font-family": "Montserrat , sans-serif", fontSize: 20 }}
              color={"white"}
              ml={"inherit"}
            >
              {activeCat?.category_name}
            </Text>
          </HStack>
        </Box>
        <Spacer />
        <Box>
          <Button
            variant={"solid"}
            bg={"#8d99af"}
            size={"sm"}
            mt={10}
            leftIcon={<AddIcon />}
          >
            Create Our Listing
          </Button>
        </Box>
      </Flex>
      {/* <Center> */}
      {/* <Stack  direction={{base:'column',md:'row'}} spacing={0} >
                { categories && categories.map((cat)=>{
                    return(
                      <Box w={'100%'} bg={ cat===activeCat ?'#2b2d42':'#8d99af'}   h="120px">
                      <HStack onClick={()=>{setActiveCat(cat)}} direction={'row'} spacing={5} mt={5} ml={{md:5,base:90}} cursor={'pointer'}
                >
                      <SocialButton label={'Twitter'} >
                         <Image src={cat.icon}/>
                      </SocialButton>
                          <Text style={{'font-family' : 'Montserrat , sans-serif' }}  color={'white'} ml={"inherit"}>{cat.category_name}</Text>
                      
                      </HStack>
                      
                      </Box>
                    )
                  })
                }
             
              </Stack> */}

      {/* <Stack mt={20} direction={{md:'row',base:'column'}}   >
            <Box w={{md:250}} bg='#2b2d42' h="100px"  >
            <HStack direction={'row'} spacing={10} mt={5} ml={5}>
              <SocialButton label={'Twitter'} href={'#'}>
                 <Image src={activeCat?.icon}/>
              </SocialButton>
              <Text style={{'font-family' : 'Montserrat , sans-serif' , fontSize:20}}  color={'white'} ml={"inherit"}>{activeCat?.category_name}</Text>
              
              </HStack>
           
              </Box>
               <Box>
               <Button
            variant={'solid'}
            bg={'#8d99af'}
            size={'sm'}
            ml={{base:50}}
          mt={10}
            mr={20}
            leftIcon={<AddIcon />}>
            Create Our Listing
              </Button>
               </Box>
            </Stack> */}
      {/* <Stack >
           <Box className='rrr' >
           
           
            </Box>
            <Box>
           
            </Box>
      </Stack> */}
      {/* </Center> */}

         
   <Divider mt={5}/>
   <Flex  mt={10} direction={{ md: "row", base: "column" }} >
  <Box  w={{md:900 , base:'100%'}}>
  <Heading fontSize='sm'>Description for {activeCat?.category_name}</Heading>
      <Text mt={4} textAlign={'start'}>{activeCat?.long_description}</Text>
  </Box>
  <Spacer />
  <Box mt={{base:50}}>
      <HStack direction={'row'}>
       <Image src='https://furniture.mangoitsol.com/project_mockups/templates/assets/images/listing-icon-heading.png'/>
      <Heading fontSize='xl' >Total Listings</Heading>
      </HStack>
       <Stack mt={10} spacing={5}>
         <Text color={'#8d99af'}>This Week: {listings?.week?.total} Listings & {listings?.week?.sales} Sales</Text>
         <Text color={'#8d99af'}>This Month: {listings?.month?.total} Listings & {listings?.month?.sales} Sales</Text>
         <Text color={'#8d99af'}> This Year: {listings?.year?.total} Listings & {listings?.year?.sales} Sales</Text>
       </Stack>
    </Box>
</Flex>
   {/* <Stack mt={10} w={{md:1150 , base:'100%'}} direction={{md:'row',base:'column'}} spacing={{md:40}}>
        <Box w={{md:800 ,base:'100%'}}  h={300} >
        <Heading fontSize='sm'>Description for {activeCat?.category_name}</Heading>
      <Text mt={4}>{activeCat?.long_description}</Text>
    </Box>
    <Box w={250}>
      <HStack direction={'row'}>
       <Image src='https://furniture.mangoitsol.com/project_mockups/templates/assets/images/listing-icon-heading.png'/>
      <Heading fontSize='xl' >Total Listings</Heading>
      </HStack>
       <Stack mt={5} spacing={5}>
         <Text color={'#8d99af'}>This Week: {listings?.week?.total} Listings & {listings?.week?.sales} Sales</Text>
         <Text color={'#8d99af'}>This Month: {listings?.month?.total} Listings & {listings?.month?.sales} Sales</Text>
         <Text color={'#8d99af'}> This Year: {listings?.year?.total} Listings & {listings?.year?.sales} Sales</Text>
       </Stack>
    </Box>
        </Stack> */}
  
   <Divider mt={5}/>
 <Center>
 <Stack mt={5} w={1150} h={300} spacing={5}>
   <Heading mt={5} fontSize='xl' >General Info. about  {activeCat?.category_name}</Heading>
         <Text mt={5} > {activeCat?.general_info}</Text>
           </Stack>
       
 </Center>
 <Divider mt={5}/>
      <Footer></Footer>
    </>
  );
};

export default CategoryWeb;
