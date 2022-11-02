import { Search2Icon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  chakra,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  Select,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import "./Home.css";
import React, { StrictMode, useEffect, useState } from "react";
import { BsOctagon } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";
import { MdGroupWork, MdSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import CategoryService from "../../services/CategoryService";
import ListingService from "../../services/ListingService";
import Banner from "./Banner";
import Footer from "./Footer";
import Header from "./Header";
import ListingCarousel from "./ListingCarousel";
import PopularCategories from "./PopularCategories";
import SocialButton from "./SocialButton";

const Home = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState();
  const [listings, setListings] = useState();
  const [webToken, setWebToken] = useState();
  const [card, setCard] = useState({
    title: "OVER 36,500+ ACTIVE LISTINGS",
    text: "Find Nearby Places & Things.",
    image:
      "http://res.cloudinary.com/piyushproj/image/upload/v1661339783/dprcqyxbtfq5ezqsu0rr.jpg",
  });
  const [area, setArea] = useState();
  const [location, setLocation] = useState();
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();

  const getAllCategory = async () => {
    const categoriesArray = await CategoryService.getAllCategory(webToken);
    setCategories(categoriesArray.data.categories);
  };

  const getAllListing = async () => {
    const ListingData = await ListingService.getAllListing(webToken);
    setListings(ListingData.data.listings);
    //console.log(ListingData.data.listings)
  };

  const priceRange = (prices) => {
    const priceArray = prices.split("-");
    setMinPrice(priceArray[0]);
    setMaxPrice(priceArray[1]);
  };
  useEffect(() => {
    const websiteToken = JSON.parse(localStorage.getItem("webToken"));
    setWebToken(websiteToken.authToken);
    getAllListing();
    getAllCategory();
  }, [webToken]);
  const [isDisplayed, setIsDisplayed] = useState(false);

  const searchResultpage = () => {
    navigate("/searchListing", {
      state: { area, location, minPrice, maxPrice },
    });
  };

  return (
    <>
      {webToken && <Header />}

      <Box
        position={"relative"}
        height={{ md: 600, base: "100%" }}
        maxW={"full"}
        overflow={"hidden"}
      >
        <Box
          key={card.title}
          height={"100%"}
          position="relative"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          backgroundImage={`url(${card.image})`}
        >


 <Container
            size="container.xl"
            maxW="container.sm"
            height="200px"
            position="relative"
          >
            <Stack
              spacing={4}
              position="absolute"
              top="60%"
              transform="translate(0, -50%)"
            >
              <Center>
                <Text fontSize={{ base: "md", lg: "lg" }} color="white">
                  {card.title}
                </Text>
              </Center>

              <Text
                fontSize={{ base: "2xl", md: "4xl", lg: "4xl" }}
                fontWeight={"bold"}
                color="white"
              >
                {card.text}
              </Text>
            </Stack>
          </Container>

          <Center>
            <Box
              bg="white"
              w="80%"
              h={{ base: "full", md: 70 }}
              mt={{ base: -5, md: 10 }}
              borderRadius="lg"
            >
              <Stack
                direction={{ base: "column", md: "row" }}
                h={{ base: "full", md: 70 }}
                spacing={0}
              >
                <Box w={"full"}>
                  <FormControl id="name">
                    <Select
                      onChange={(e) => {
                        setArea(e.target.value);
                      }}
                      style={{ height: "70px" }}
                      placeholder="All Areas"
                    >
                      <option value={"town"}>town</option>
                      <option value={"village"}>Village</option>
                    </Select>
                  </FormControl>
                </Box>

                <Box w={"full"}>
                  <FormControl
                    id="name"
                    borderRadius="lg"
                    style={{ color: "black" }}
                    bg={{ base: "white", md: "white" }}
                  >
                    <Input
                      type="text"
                      placeholder="Enter a location"
                      style={{ color: "black", height: "70px" }}
                      onChange={(e) => {
                        setLocation(e.target.value);
                      }}
                    ></Input>
                  </FormControl>
                </Box>
                <Box w={"full"}>
                  <FormControl
                    id="name"
                    borderRadius="lg"
                    style={{ color: "black" }}
                    bg={{ base: "white", md: "white" }}
                  >
                    <Select
                      placeholder="Price Range"
                      style={{ color: "black", height: "70px" }}
                      onChange={(e) => {
                        priceRange(e.target.value);
                      }}
                    >
                      <option value={"100-200"}>$100-$200</option>
                      <option value={"200-300"}>$200-$300</option>
                      <option value={"300-400"}>$300-$400</option>
                      <option value={"400-500"}>$400-$500</option>
                    </Select>
                  </FormControl>
                </Box>
                <Box w={"full"}>
                  <Button
                    w={"full"}
                    style={{ color: "white", height: "70px" }}
                    bg={"#8d99af"}
                    onClick={() => {
                      searchResultpage();
                    }}
                  >
                    <HStack direction={"row"} spacing={2}>
                      <chakra.button
                        bg={useColorModeValue("white")}
                        rounded={"full"}
                        w={8}
                        h={8}
                        cursor={"pointer"}
                        as={"a"}
                        display={"inline-flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        transition={"background 0.3s ease"}
                        _hover={{
                          bg: useColorModeValue("#2b2d42", "whiteAlpha.200"),
                        }}
                      >
                        <Search2Icon color={"gray"}></Search2Icon>
                      </chakra.button>
                      <Text> Search Now</Text>
                    </HStack>
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Center>

         
          <Center>
            <Wrap>
              {categories &&
                categories?.map((cat) => {
                  if(cat.category_name === 'Cars'){
                    return(
                      <WrapItem>
                      <Center mt={10} w="120px" h="100px" >
                        <Box>
                          <SocialButton label={"Twitter"} href={""}>
                            <Image src={cat.icon} />
                          </SocialButton>
                          <Text ml={{ base: 17, md: 15 }}>
                            {cat.category_name}
                          </Text>
                        </Box>
                      </Center>
                    </WrapItem>
                   
                    );
                  }else{
                    return(
                      <WrapItem>
                      <Center mt={10} w="120px" h="100px" >
                        <Box>
                          <SocialButton label={"Twitter"} href={""}>
                            <Image src={cat.icon} />
                          </SocialButton>
                          <Text ml={"inherit"}>
                            {cat.category_name}
                          </Text>
                        </Box>
                      </Center>
                    </WrapItem>
                 
                    );
                  }
                
                })}
            </Wrap>
          </Center>
        </Box>
      </Box>

      {categories && <PopularCategories data={categories}></PopularCategories>}
      {listings && <ListingCarousel data={listings}></ListingCarousel>}
      {webToken && <Footer />}
    </>
  );
};

export default Home;
