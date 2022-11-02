import { AddIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddListing from "../../miscellaneous/AddListing";
import AuthService from "../../services/AuthService";
import SiteMengmentService from "../../services/SiteMengmentService";
import Banner from "./Banner";
const Links = [
  { title: "HOME", navlink: "/" },
  { title: "CATEGORY", navlink: "/categoryweb" },
  { title: "LISTING", navlink: "/listingweb" },
  { title: "CONTACT", navlink: "/contact" },
];

console.log("header");
const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [webToken, setWebToken] = useState();
  const [headers, setHeaders] = useState();
  const [logo, setLogo] = useState();
  const [authToken, setauthToken] = useState();

  const getWebToken = async () => {
    await AuthService.getWebToken().then((webtoken) => {
      const a = JSON.stringify(webtoken.data);

      setWebToken(JSON.parse(a).authToken);

      localStorage.setItem("webToken", JSON.stringify(webtoken.data));
    });
  };

  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem("webToken"));
    if (!authToken) {
      getWebToken();
    } else {
      setWebToken(authToken.authToken);
    }
    getAllsiteContent();
  }, [webToken]);
  const getAllsiteContent = async () => {
    const siteData = await SiteMengmentService.getAllsiteContent(webToken);
    const header = siteData.data.filter((e) => {
      if (e.related_tab === "header") {
        return e;
      }
    });
    const logo = siteData.data.filter((e) => {
      if (e.related_tab === "logo") {
        return e;
      }
    });
    console.log(logo);
    setLogo(logo[logo.length - 1]);
    setHeaders(header);
  };

  

  return (
    <>
      <Box bg={"aliceblue"} pt={6} position="relative">
        <Flex h={20} alignItems={"center"} justifyContent={"space-between"}>
          <Box ml={10}>
            <Image
              src={logo?.image}
              fallbackSrc="https://furniture.mangoitsol.com/project_mockups/templates/assets/images/black-logo.png"
            />
          </Box>

          <IconButton
            size={"md"}
            ml={20}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={18} alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={20}
              display={{ base: "none", md: "flex" }}
            >
              {headers?.map((link) => (
                <>
                  <Text
                    fontSize={"sm"}
                    fontFamily={"cursive"}
                    fontWeight={"bold"}
                  >
                    {/* <NavLink key={link} navlink={link.header_link}>{link?.header_title}</NavLink> */}
                    <Link
                      px={2}
                      py={1}
                      as="samp"
                      rounded={"md"}
                      _hover={{
                        textDecoration: "none",
                        bg: "gray.700",
                      }}
                      href={link.header_link}
                      to={link.header_link}
                    >
                      {link?.header_title}
                    </Link>
                  </Text>
                </>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            {/* <AddListing>
          <Button
            variant={'solid'}
            bg={'#8d99af'}
            size={'sm'}
            display={{ base: 'none', md: 'flex' }}
            mr={20}
            leftIcon={<AddIcon />}>
            Add Your Listing 
          </Button>
          </AddListing> */}

            <Button
              bg={"#8d99af"}
              size={"sm"}
              display={{ base: "none", md: "flex" }}
              mr={20}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
          </Flex>
        </Flex>

        {isOpen ? (
          <Flex
            bg="gray.200"
            alignItems={"center"}
            w={"full"}
            display={{ md: "none" }}
          >
            <Stack mr={1} ml={1} alignItems={"center"} spacing={4}>
              {headers.map((link) => (
                <>
                  <Divider />
                  <Text
                    fontSize={"sm"}
                    fontFamily={"cursive"}
                    fontWeight={"bold"}
                  >
                    {/* <NavLink key={link} navlink={link.header_link}>{link?.header_title}</NavLink> */}
                    <Link
                      px={2}
                      py={1}
                      as="samp"
                      rounded={"md"}
                      _hover={{
                        textDecoration: "none",
                        bg: "gray.700",
                      }}
                      href={link.header_link}
                      to={link.header_link}
                    >
                      {link?.header_title}
                    </Link>
                  </Text>
                  
                </>
              ))}
           <Link
                      px={2}
                      py={1}
                      as="samp"
                      rounded={"md"}
                      _hover={{
                        textDecoration: "none",
                        bg: "gray.700",
                      }}
                      href={'#'}
                      to={'/login'}
                    
                    >
                     Login
                    </Link>
            </Stack>

            
         
          </Flex>
        ) : null}
         
      </Box>
      {/* <Banner></Banner> */}
    </>
  );
};

export default Header;
