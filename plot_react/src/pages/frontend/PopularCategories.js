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
  Square,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { act } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryService from "../../services/CategoryService";
import SocialButton from "./SocialButton";

const PopularCategories = ({data}) => {
  const [activeCat, setActiveCat] = useState(data[0]);
 

  const changeActiveCat = (selectCat) => {
    setActiveCat(selectCat);
  };
  
  useEffect(()=>{
    setActiveCat(data[0])
  },[data])
  return (
    <>
      <Center>
        <Box mt={20}>
          <Heading>Popular Categories</Heading>

          <Text mt={10} align={"center"} style={{ color: "#8d99af" }}>
            CHECK THEM OUT
          </Text>
        </Box>
      </Center>

      <Center>
        <Flex w={{md:"1000px"}} color="white" mt={20}>
          <Stack direction={{base:'column',md:'row'}} borderRadius={"lg"} spacing="0px">
            <Box h="600px" bg={{base:'#2b2d42',md:"#212529"}} >
              {data &&
                data?.map((cat, index) => {
                  return (
                    <Box
                      mt={index > 0 ? 0.5 : 0}
                      w={300}
                      bg={activeCat === cat ? "#2b2d42" : "#8d99af"}
                      h="120px"
                    >
                      <HStack
                        onClick={() => {
                          changeActiveCat(cat);
                        }}
                        p={5}
                        direction={"row"}
                        spacing={5}
                        cursor={"pointer"}
                      >
                        <SocialButton label={"Twitter"} href={"#"}>
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
                  );
                })}
              
            </Box>
            <Box w={{md:'608px',base:'100%'}} h={{md:'608px',base:'1000px'}} bg="#2b2d42">
              <Box style={{ "margin-top": "100px" }} w="100%" h="400px">
                <Stack direction={{base:'column',md:'row'}} spacing={{base:5,md:10}}>
                  <Box p={5} w={350} h={"400px"}>
                    <Heading fontSize="xl">{activeCat?.title}</Heading>
                    <Text mt={10}>{activeCat?.sort_descripiton}</Text>

                    <Button mt={10} w={{base:'100%',md:'350px'}} style={{ color: "black" }}>
                      Discover more{" "}
                    </Button>
                  </Box>
                  <Box p={5} borderRadius={"1px"} w={350} h={"450px"}>
                    <Image src={activeCat?.image} alt="Dan Abramov" />
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Stack>
        </Flex>
      </Center>
    </>
  );
};

export default PopularCategories;
