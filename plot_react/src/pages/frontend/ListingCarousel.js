import {
  Box,
  Button,
  Center,
  chakra,
  Flex,
  Grid,
  GridItem,
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
  useColorModeValue,
} from "@chakra-ui/react";
import "./Home.css";
import React, { useEffect, useState } from "react";
import { StarIcon, ViewIcon } from "@chakra-ui/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { SlideData } from "../../SlideData";
import { useNavigate } from "react-router-dom";
const ListingCarousel = ({ data }) => {
  const navigate = useNavigate();
  const [showBox, setShowBox] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(3);
  var numberOfBox = (data.length / 3).toFixed();
  // console.log("data",data.length%3)
  // if (!Number.isInteger(data.length/3)) {
  //   numberOfBox = numberOfBox+1
  // }
  console.log("numberOfBox", numberOfBox);

  for (var i = 0; i < numberOfBox; i++) {
    if (showBox.length !== numberOfBox) {
      showBox.push(i);
    }
  }
  var tempEnd = 3;
  useEffect(() => {}, [data]);

  return (
    <>
      <Center>
        <Box mt={20}>
          <Heading>Recent Listing</Heading>

          <Text mt={10} align={"center"} style={{ color: "#8d99af" }}>
            CHECK THEM OUT
          </Text>
        </Box>
      </Center>

      <Carousel showThumbs={false}  showArrows={false}  emulateTouch infiniteLoop autoPlay interval={2000}  >
        {showBox?.map((index) => {
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
            <Center>
              <Box w={{md:"1100px",base:'100%'}} h={"1300px"} bg="white" mt={20} key={index}>
                {data.slice(a, b).map((list) => {
                  var keys = Object.keys(list.metadata);

                  return (
                    <Stack
                      mt={10}
                      h={{md:"380px",base:'600px'}}
                      direction={{md:"row",base:"column"}}
                      bg="#f7f7f7"
                      borderRadius="lg"
                    >
                      <Box w={{md:'500px'}}>
                        <Image
                          borderRadius="lg"
                          src={list.image[0]}
                          alt="Dan Abramov"
                          h={{md:"380px ",base:'200px'}}
                        />
                        {/* <Button display={{base:'block'}} 
                          onClick={() => {
                            navigate("/contact");
                          }}
                          position="absolute"
                          w={150}
                        ml='180px'
                        mt
                        >
                          Contact Now
                        </Button>  */}
                      </Box>
                      
                      <Box p={5} w={350} h="340px ">
                        {/*                      
                           <HStack   mt={5} direction="row" spacing={10}>
                            <Box >
                            <Heading fontSize="xl">{list?.title}</Heading>
                            <Heading fontSize="xl">By:{list.PostedUserid.first_name}</Heading>
                             </Box>
                            <Box >
                                <Text ml={"inherit"} color="black">{list?.reviews.length} Reviews</Text>
                            </Box>
                          
                            
                          </HStack> */}
                        <Stack w={500} direction={["row"]} spacing="10px">
                          <Box style={{ width: "max-content" }}>
                            <Heading fontSize="lg">{list?.title}</Heading>
                            {/* <Text fontSize="15px">
                              By:{list.PostedUserid.first_name}
                            </Text> */}
                          </Box>
                        
                          <Box
                          display={{md:'block'}}
                            style={{
                              width: "max-content",
                              marginLeft: "315px",
                            }}
                          >
                            <Text color="black">
                              {list?.reviews.length} Reviews{" "}
                            </Text>
                          </Box>
                        </Stack>
                       
                          <Table size={'sm'} variant="simple" >
                            <Tbody >
                              {keys.slice(0, 4).map((key) => {  
                                return (
                                  <Tr>
                                    <Td>
                                      <Box fontSize={12}>
                                        {key.toUpperCase()}
                                      </Box>
                                    </Td>
                                    <Td style={{'vertical-align': 'inherit'}}>
                                      {" "}
                                      <Box
                                        fontFamily={"cursive"}
                                        position={"relative"}
                                       
                                      >
                                        {list.metadata[key]}
                                      </Box>
                                    </Td>
                                  </Tr>
                                );
                              })}
                        
                            </Tbody>
                          </Table>
                     
                        <Stack direction={'row'} spacing={400} mt={135}>
                      
                        <Button  
                          onClick={() => {
                            navigate("/contact");
                          }}
                          position="absolute"
                          w={120}
                        // ml={{base:'auto',md:'400px'}}
                      
                        >
                          Contact Now
                        </Button>
                        <Heading style={{'line-height': 50.2}} fontSize="15px">
                              By:{list.PostedUserid.first_name}
                            </Heading>
                        </Stack>
                     
                      </Box>

                    
                    </Stack>
                  );
                })}
              </Box>
            </Center>
          );
        })}
      </Carousel>
    </>
  );
};

export default ListingCarousel;
