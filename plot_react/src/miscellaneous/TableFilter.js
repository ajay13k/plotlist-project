import {
  AddIcon,
  BellIcon,
  ChevronDownIcon,
  HamburgerIcon,
  Search2Icon,
} from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsFunnelFill } from "react-icons/bs";
import AddSiteContent from "../pages/admin/AddSiteContent";
import SiteManagement from "../pages/admin/SiteManagement";
import AddListing from "./AddListing";


const TableFilter = () => {
  const [pathname, setPathName] = useState();
  useEffect(()=>{
    setPathName(window.location.pathname);
      console.log("first")
  },[pathname])
  return (
    <>
      <Flex
        ml={{ base: 0, md: 0 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        bg={useColorModeValue("white.200", "gray")}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue("gray.200", "gray.700")}
        justifyContent={{ base: "space-between", md: "flex-end" }}
      >
   <HStack spacing={{ base: "0", md: "6" }}>
        {
         pathname === "/listing" ?  <>  <AddListing>  <Button
         leftIcon={<AddIcon />}
         size="sm"
         colorScheme="black"
         variant="outline"
       >
       Add Listing
       </Button></AddListing>
       <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack>
                  <BsFunnelFill></BsFunnelFill>
                  <VStack
                    display={{ base: "none", md: "flex" }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">Filter</Text>
                
                  </VStack>
                  <Box display={{ base: "none", md: "flex" }}>
                    <ChevronDownIcon></ChevronDownIcon>
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg= "gray.200"
                borderColor="gray.200"
              >
                <MenuItem>approved</MenuItem>
                <MenuItem>disApproved</MenuItem>
                <MenuItem>pendding</MenuItem>
                <MenuItem>sales</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
       
       </>   : ""
       }
     
     {
       pathname ==="/sitemanagement" ? 
       <AddSiteContent>  <Button
         leftIcon={<AddIcon />}
         size="sm"
         colorScheme="black"
         variant="outline"
       >
       create content
       </Button></AddSiteContent>
        :""
     }
     
        </HStack>
      </Flex>
    </>
  );
};

export default TableFilter;
