import React, { useState, useEffect } from 'react';
import { Box, Button, Flex, HStack, Menu, MenuButton, MenuItem, MenuList, Spacer, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import {
  Previous,
  Paginator,
  PageGroup,
  Page,
  Next,
  generatePages
} from 'chakra-paginator';
import { CgChevronLeft, CgChevronRight } from 'react-icons/cg';
import ItemList from './itemList';
import AddSiteContent from '../pages/admin/AddSiteContent';
import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { BsFunnelFill } from 'react-icons/bs';
import AddListing from './AddListing';

const ItemPage = ({data}) => {
  const [pathname, setPathName] = useState();
  const [filter, setfilter] = useState();
  const [showData,setShowData]=useState(data)
  const itemLimit = 10;
  const [pagesQuantity, setPagesQuantity] = useState(0);
  const [curPage, setCurPage] = useState(0);

  useEffect(() => {
     setPathName(window.location.pathname);
     if(!filter){
       setShowData(data)
     }else{
         const a =  data?.filter((filterData)=>{
              if(filterData.status === filter){
                return filterData
              }
          });
          setShowData(a);
     }
    const pagesTotal = Math.ceil(showData.length / itemLimit);
    setPagesQuantity(pagesTotal);
  },[showData.length,filter]);
  const normalStyles = {
    bg: 'white',
    mr: 2
  };

  const activeStyles = {
    bg: 'blue.300',
     mr: 2

  };

  const handlePageChange = (page) => {
    setCurPage(page);
  };


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
          {pathname === "/listing" ? (
            <>
              {" "}
              <AddListing>
                {" "}
                <Button
                  leftIcon={<AddIcon />}
                  size="sm"
                  colorScheme="black"
                  variant="outline"
                >
                  Add Listing
                </Button>
              </AddListing>
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
                  <MenuList bg="gray.200" borderColor="gray.200">
                    <MenuItem
                      onClick={(e) => {
                        setfilter(e.target.value);
                      }}
                      value={"approved"}
                    >
                      approved
                    </MenuItem>
                   
                    <MenuItem
                      onClick={(e) => {
                        setfilter(e.target.value);
                      }}
                      value={"pending"}
                    >
                      pending
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => {
                        setfilter(e.target.value);
                      }}
                      value={"sales"}
                    >
                      sales
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => {
                        setfilter();
                      }}
                      value={"sales"}
                    >
                      All
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </>
          ) : (
            ""
          )}

          {pathname === "/sitemanagement" ? (
            <AddSiteContent>
              {" "}
              <Button
                leftIcon={<AddIcon />}
                size="sm"
                colorScheme="black"
                variant="outline"
              >
                Create Content
              </Button>
            </AddSiteContent>
          ) : (
            ""
          )}
        </HStack>
      </Flex> 
<Box>

 { data &&  <ItemList items={showData} curPage={curPage} itemLimit={itemLimit} />}
   <Flex p={2}>
     <Spacer />
     <Paginator
       onPageChange={handlePageChange}
       pagesQuantity={pagesQuantity - 1}>
       <Previous bg="white">
         <CgChevronLeft />
       </Previous>
       <PageGroup>
         {generatePages(pagesQuantity)?.map((page) => (
           <Page
             key={`paginator_page_${page}`}
             page={page}
             normalStyles={normalStyles}
             activeStyles={activeStyles}
           />
         ))}
       </PageGroup>
       <Next bg="white">
         <CgChevronRight />
       </Next>
     </Paginator>
   </Flex>
 </Box>
    </>
   
  
  );
}

export default ItemPage;
