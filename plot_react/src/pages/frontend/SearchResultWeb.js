import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Icon,
  Image,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SiteMengmentService from "../../services/SiteMengmentService";
import Footer from "./Footer";
import Header from "./Header";

const SearchResultWeb = () => {
  const state = useLocation();
  const navigate = useNavigate();
  console.log(state);
  const [location, setLocation] = useState(state.state.location);
  const [minPrice, setMinPrice] = useState(state.state.minPrice);
  const [maxPrice, setMaxPrice] = useState(state.state.maxPrice);
  const [webToken, setWebToken] = useState();
  const [keys, setKeys] = useState();
  const [searchListing, setSearchListing] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchNow = async () => {
    setLoading(true);
    var data = {
      location,
      minPrice,
      maxPrice,
    };
    const searchedResult = await SiteMengmentService.getsearchResult(
      data,
      webToken
    );
    console.log(searchedResult.data);
    setSearchListing(searchedResult.data);
    setLoading(false);
  };
  useEffect(() => {
    const websiteToken = JSON.parse(localStorage.getItem("webToken"));
    setWebToken(websiteToken.authToken);
    searchNow();
  }, [webToken]);
  return (
    <>
      <Header></Header>
      <Center>
        <Box mt={20}>
          <Heading>Searched Result</Heading>

          <Text mt={10} align={"center"} style={{ color: "#8d99af" }}>
            CHECK THEM OUT
          </Text>
        </Box>

        
      </Center>
<Center>
<Box
        w="1100px"
        position={"relative"}
      
        bg="white"
        mt={20}
        mb={20}
       
      >
        {loading ? (
          <Center>
            <Spinner size="xl" />
          </Center>
        ) : searchListing && searchListing.length > 0 ? (
          searchListing?.map((list) => {
            var keys = Object.keys(list.metadata);
            return (
              <Stack
                h={{md:"376px"}}
                mb={30}
                direction={{md:"row",base:'column'}}
                spacing={10}
                bg="#f7f7f7"
                borderRadius="lg"
              >
                <Box>
                  <Image
                    w={{md:500 ,base:150}}
                    h={{md:376,base:150}}
                    borderRadius="lg"
                    src={list.image}
                    alt="Dan Abramov"
                  />
                  <Button
                    display={{md:'none',base:'block'}}
                    onClick={() => {
                      navigate("/contact");
                    }}
                    w={150}
                    style={{ color: "black" }}
                  >
                    Contact Now
                  </Button>
                </Box>
                <Box p={5} w={350} h="340px ">
                  <HStack mt={5} direction="row" spacing={2}>
                    <Box>
                      <Heading fontSize="xl">{list.title}</Heading>
                    </Box>
                    <Box>
                      <Text ml={"inherit"} color="black">
                        {list.reviews.length} Reviews
                      </Text>
                    </Box>
                  </HStack>
                  <Text
                    mt={5}
                    fontFamily="monospace"
                    color={"gray"}
                    fontSize="md"
                  >
                    By:Sales Agent
                  </Text>
                 
                  <TableContainer>
                    <Table variant="simple">
                      <Tbody>
                        {keys.slice(0, 4).map((key) => {
                          return (
                            <Tr>
                              <Td>
                                <Box fontFamily={"cursive"} fontWeight={"bold"}>
                                  {key}
                                </Box>
                              </Td>
                              <Td>
                                {" "}
                                <Box
                                  fontFamily={"cursive"}
                                  position={"relative"}
                                  fontWeight={"bold"}
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

         

                  <Button
                    display={{md:'block',base:'none'}}
                    onClick={() => {
                      navigate("/contact");
                    }}
                    w={200}
                    style={{ color: "black", "margin-left": "270px" }}
                  >
                    Contact Now
                  </Button>
                </Box>
              </Stack>
            );
          })
        ) : (
          <Text>
            Sorry Listing is not available at this price and in this area .
          </Text>
        )}
        
      </Box>
</Center>
   

      <Footer />
    </>
  );
};

export default SearchResultWeb;
