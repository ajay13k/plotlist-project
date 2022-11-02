import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import Header from "./Header";
import Footer from "./Footer";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { SlideData } from "../../SlideData";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import "./Home.css";
import CategoryService from "../../services/CategoryService";
import ListingService from "../../services/ListingService";
import SocialButton from "./SocialButton";
import { act } from "@testing-library/react";
import ListingDetails from "../../miscellaneous/ListingDetails";
const ListingWeb = () => {
  const [categories, setCategories] = useState();
  const [listings, setListings] = useState();
  const [tempListings, setTempListings] = useState();
  const [webToken, setWebToken] = useState();
  const [activeCat, setActiveCat] = useState();
  const [showBox, setShowBox] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(3);
  var tempEnd = 3;
  const getAllCategory = async () => {
    const categoriesArray = await CategoryService.getAllCategory(webToken);
    setCategories(categoriesArray.data.categories);
    setActiveCat(categoriesArray.data.categories[0]);
    // console.log(categoriesArray.data.categories[0])
  };

  const getAllListing = async () => {
    const ListingData = await ListingService.getAllListing(webToken);
    const numberOfBox = (ListingData.data.listings.length / 3).toFixed();
    for (var i = 0; i < numberOfBox; i++) {
      if (showBox.length != numberOfBox) {
        showBox.push(i);
      }
    }
    setListings(ListingData.data.listings);
    setTempListings(ListingData.data.listings);
    // console.log(ListingData.data.listings)
  };

  const setActiveCategory = (cat) => {
    //  setActiveCat(cat)
    //  setShowBox([])
    var a = [];
    const listingsBYCat = tempListings.filter((list) => {
      if (cat._id === list.categroyid._id) {
        return list;
      }
    });
    console.log("listingsBYCat", listingsBYCat.length);
    if (listingsBYCat.length <= 3) {
      showBox.splice(0, showBox.length);
      showBox.push(0);

      console.log("showBox", 1);
    } else {
      console.log("listingsBYCat length is more then 3");

      const numberOfBox = (listingsBYCat.length / 3).toFixed();
      for (var i = 0; i < numberOfBox; i++) {
        if (showBox.length !== numberOfBox) {
          showBox.push(i);
        }
      }
    }

    setListings(listingsBYCat);
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
      <Stack direction={{ md: "row", base: "column" }}>
        <Box w="250px" h={{ md: "800px", base: "100%" }}>
          {categories &&
            categories.map((cat) => {
              return (
                <Flex
                  onClick={() => {
                    setActiveCat(cat);
                    setActiveCategory(cat);
                  }}
                  cursor={"pointer"}
                  p={5}
                  mt={5}
                  w={"250px"}
                  borderRadius="lg"
                  bg={activeCat === cat ? "#2b2d42" : "#8d99af"}
                  h="125px"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <HStack direction={"row"} spacing={5} ml={5}>
                    <SocialButton label={"Twitter"}>
                      <Image src={cat.icon} />
                    </SocialButton>

                    <Text
                      mr={"auto"}
                      color="white"
                      fontSize="md"
                      fontFamily="monospace"
                    >
                      {cat.category_name}
                    </Text>
                  </HStack>
                </Flex>
              );
            })}
        </Box>

        <Box w={{ md: 800, base: "100%" }}>
          <Carousel
            showThumbs={false}
            showArrows={false}
           
          >
            {listings &&
              showBox.map((index) => {
                var a;
                var b;
                if (index > 0) {
                  a = tempEnd;
                  tempEnd = tempEnd + 3;
                  b = tempEnd;
                }
                if (index === 0) {
                  a = startIndex;
                  b = tempEnd;
                }
                return (
                  <>
                    {listings.slice(a, b).map((list) => {
                      const keys = Object.keys(list.metadata);
                      return (
                        <>
                          <ListingDetails data={list}>
                            <Stack  direction={{md:"row" ,base:'column'}}>
                              <Box p={5} shadow="md" borderWidth="1px">
                                <Image
                                className="listingImage"
                                  borderRadius="lg"
                                  src={list.image}
                                  alt="Dan Abramov"
                                  h={400}
                                  w={380}
                                 
                                />
                              </Box>
                              <Box p={5} w={368} shadow="md" borderWidth="1px">
                              <HStack
                                  mt={5}
                                  direction="row"
                                  spacing={{ md: 2, base: -5 }}
                                >
                                  <Box>
                                    <Heading fontSize="15px">
                                      {list?.title.toUpperCase()}
                                    </Heading>
                                  </Box>
                                  <Box>
                            {/* <Text
                              ml={{ md: 100 }}
                              display={{ md: "block", base: "none" }}
                              color="black"
                            >
                              {list?.reviews.length} Reviews
                            </Text> */}
                          </Box>
                                </HStack>

                                <TableContainer>
                                  <Table size={"sm"} variant="simple">
                                    <Tbody>
                                      {keys.slice(0, 4).map((key) => {
                                        return (
                                          <Tr>
                                            <Td>
                                              <Box
                                                fontFamily={"cursive"}
                                                fontSize="12px"
                                              >
                                                {key.toUpperCase()}
                                              </Box>
                                            </Td>
                                            <Td>
                                              {" "}
                                              <Box
                                                fontFamily={"cursive"}
                                                position={"relative"}
                                                fontSize="15px"
                                              >
                                                {list.metadata[key]}
                                              </Box>
                                            </Td>
                                          </Tr>
                                        );
                                      })}
                                    </Tbody>
                                  </Table>
                                </TableContainer>
                              </Box>
                            </Stack>
                            {/* <Stack
                              mt={10}
                              h="316px"
                              direction={{ md: "row", base: "column" }}
                              spacing={0}
                              cursor={"pointer"}
                            >
                              <Box
                                borderRadius="lg"
                                w={{ md: 490, base: 150 }}
                                display={{ md: "block", base: "none" }}
                              >
                                <Image
                                  borderRadius="lg"
                                  src={list.image}
                                  alt="Dan Abramov"
                                  h={{ md: "360px" }}
                                />
                              </Box>
                              <Box
                                p={5}
                                borderRadius="md"
                                boxShadow
                                h={360}
                                w={{ md: 518, base: "100% " }}
                                bg="#f7f7f7"
                              >
                                <HStack
                                  mt={5}
                                  direction="row"
                                  spacing={{ md: 2, base: -5 }}
                                >
                                  <Box>
                                    <Heading fontSize="15px">
                                      {list?.title.toUpperCase()}
                                    </Heading>
                                  </Box>
                                </HStack>

                                <TableContainer>
                                  <Table size={"sm"} variant="simple">
                                    <Tbody>
                                      {keys.slice(0, 4).map((key) => {
                                        return (
                                          <Tr>
                                            <Td>
                                              <Box
                                                fontFamily={"cursive"}
                                                fontSize="12px"
                                              >
                                                {key.toUpperCase()}
                                              </Box>
                                            </Td>
                                            <Td>
                                              {" "}
                                              <Box
                                                fontFamily={"cursive"}
                                                position={"relative"}
                                                fontSize="15px"
                                              >
                                                {list.metadata[key]}
                                              </Box>
                                            </Td>
                                          </Tr>
                                        );
                                      })}
                                    </Tbody>
                                  </Table>
                                </TableContainer>
                              </Box>
                            </Stack> */}
                          </ListingDetails>
                       
                        </>
                      );
                    })}
                  </>
                );
              })}
          </Carousel>
        </Box>
      </Stack>

      <Stack
        //  ml={{md:40}}
        direction={{ md: "row", base: "column" }}
        mr={10}
        justifyContent={"center"}
      >
        {/* <Box w='250px' h={{md:'600px'}}   ml={{base:10,md:120}}>
          {categories && categories.map((cat)=>{
            return(
              <Flex onClick={()=>{  setActiveCat(cat) ;setActiveCategory(cat); } }cursor={'pointer'} p={5} mt={5} w={'250px'}  borderRadius='lg' bg={activeCat===cat ? '#2b2d42':'#8d99af'} h="125px" alignItems="center" justifyContent="space-between">
                <HStack direction={'row'} spacing={5}  ml={5}>
                   <SocialButton label={'Twitter'} >
                         <Image src={cat.icon}/>
                      </SocialButton>
              
                <Text mr={'auto'} color="white" fontSize="md" fontFamily="monospace" >
                {cat.category_name}

                </Text>

                </HStack>
             
                

              </Flex>
             
            )
          })}
              
        </Box> */}

        {/* <Box w={{md:800 ,base:'100%'}}ml={{base:70}} >
          <Carousel  showThumbs={false} showArrows={false}  emulateTouch infiniteLoop autoPlay interval={1500} >
            {listings && showBox.map((index)=>{
          
                 var a ;
                 var b;
                 if(index > 0){
                    a=tempEnd;
                    tempEnd=tempEnd+3
                     b= tempEnd
                
                   
       
                 }
                 if(index === 0){
                     a = startIndex; 
                     b = tempEnd
                   }
              return(
                <Box w="800px" h={"1200px"}   borderRadius="lg" mt={20} ml={{base:5 }}>
                    {listings.slice(a,b).map((list)=>{

                      const keys = Object.keys(list.metadata)
                      return(
                        <>
                        <ListingDetails data={list}>
                        <Stack
                                    mt={10}
                                    h="316px"
                                    direction={{md:"row",base:'column'}}
                                    spacing={0}
                                    cursor={'pointer'}
                                   
                                  >
                                    <Box borderRadius="lg" w={{md:490,base:150}} display={{md:'block',base:'none'}} >
                                      <Image
                                        borderRadius="lg"
                                        src={list.image}
                                        alt="Dan Abramov"
                                        h={{md:"360px"}}
                                      />
                                    </Box>
                                    <Box p={5} borderRadius="md" boxShadow h={360}  w={{md:518,base:370}}  bg="#f7f7f7"  >
                                      <HStack mt={5} direction="row" spacing={{md:2,base:-5}}>
                                        <Box>
                                          <Heading fontSize="15px">{list?.title.toUpperCase()}</Heading>
                                          
                                        </Box>
                                    
                                      </HStack>
                                  
                                                  <TableContainer>
                                <Table size={'sm'} variant="simple">
                                  <Tbody>
                                    {keys.slice(0, 4).map((key) => {
                                      return (
                                        <Tr>
                                          <Td>
                                            <Box fontFamily={"cursive"}  fontSize="12px">
                                              {key.toUpperCase()}
                                            </Box>
                                          </Td>
                                          <Td>
                                            {" "}
                                            <Box
                                              fontFamily={"cursive"}
                                              position={"relative"}
                                             
                                              fontSize="15px"
                                            >
                                              {list.metadata[key]}
                                            </Box>
                                          </Td>
                                        </Tr>
                                      );
                                    })}
                                  </Tbody>
                                </Table>
                                    </TableContainer>
                                    
                                    </Box>
                              </Stack>

                        </ListingDetails>
                        <Box>
                                          <Text ml={{md:100}} display={{md:'block',base:'none'}} color="black">
                                            {list?.reviews.length} Reviews
                                          </Text>
                                        </Box>
                        </>
                        
          
                      );
                    })}
                                     
              </Box>
              )
            })}
           
          </Carousel>
        </Box>
      */}
      </Stack>

      <Footer></Footer>
    </>
  );
};

export default ListingWeb;
