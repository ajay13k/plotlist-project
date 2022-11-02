import React, { Children, useEffect, useState } from 'react'


import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Button,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { BellIcon, ChevronDownIcon, HamburgerIcon ,SettingsIcon } from '@chakra-ui/icons';
import { BsFillPersonLinesFill ,BsHouseFill,BsPersonSquare,BsPersonXFill } from "react-icons/bs";
import MyProfile from './MyProfile';




 const Sidebar = ({ children ,navBarData}) => {
  // const [isShow,setIsShow]= useState(false)
   const { isOpen, onOpen, onClose } = useDisclosure();
 
  //  useEffect(()=>{
  //    console.log("ssdgsd")
  //      if(loginToken?.user.user_type.user_type === 'admin'){
       
  //         setIsShow(true)
  //     }else{
  //         setIsShow(false)
  //        console.log("user")

  //     }
    
  //  },[loginToken,isShow])


  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
         display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
        <SidebarContent onClose={onClose}/>
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
          {children}
      </Box>
    
    </Box>
  );
}



const SidebarContent = ({ onClose, ...rest }) => {
const [isShow,setIsShow]  = useState();
const [loginToken,setLoginToken] = useState()
useEffect(()=>{
const loginuserToken = JSON.parse(localStorage.getItem('loginToken'));
 setLoginToken(loginuserToken)
   if(loginToken?.user.user_type.user_type === 'admin'){
       
          setIsShow(true)
      }else{
          setIsShow(false)
         

      }
},loginToken)
      
     
      const [linkarray,setLink] = useState([
            { name: 'Home', icon: BsHouseFill ,  href:"/adminhome" , isadmin:true },
            { name: 'Category', icon: BellIcon ,href:"/category" , isadmin:true},
            { name: 'Listing', icon: HamburgerIcon ,href:"/listing" , isadmin:true},
            { name: 'Users', icon: BsFillPersonLinesFill ,href:"/users" , isadmin:true},
            { name: 'Site Management', icon: SettingsIcon, href:"/sitemanagement" , isadmin:true},
            { name: 'MyProfile', icon:BsPersonSquare , href:"/profile" , isadmin:true},
            { name: 'Logout', icon: BsPersonXFill,href:"/" ,isadmin:true},
            { name: 'Enquiries', icon: HamburgerIcon,href:"/enquirylist" ,isadmin:true},


            { name: 'Home', icon: BsHouseFill ,  href:"/userhome" , isadmin:false },
            { name: 'Listing', icon: HamburgerIcon ,href:"/listing" , isadmin:false},
            { name: 'MyProfile', icon:BsPersonSquare , href:"/profile" , isadmin:false},
            { name: 'Logout', icon: BsPersonXFill,href:"/" ,isadmin:false},


          ]);
        
          
        return (
          <>
              <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
            >
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
              <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                Logo
              </Text>
              <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            
            {linkarray.map((link) => (
               
              link.isadmin=== isShow ? <NavItem key={link.name} icon={link.icon} herf={link.href}>
              {link.name}
            </NavItem> :"" ))}
          
          
          </Box>
        
          </>
        

        );
      };


const NavItem = ({ icon,herf, children, ...rest }) => {
  const toast = useToast();
 const navigate = useNavigate();
  const logoutHandle =()=>{

    localStorage.removeItem("loginToken");
      toast({
      title: 'logout !',
      position:'top-right',
      status: 'success',
      duration: 1000,
     
    });
    navigate('/',{replace:true})
  }
  return (
    <>
     {children === 'MyProfile' ? <MyProfile> <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'teal.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        
       { children }
      </Flex></MyProfile> :  <Link onClick={children==='Logout'?()=>{logoutHandle()}:''} href={herf} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'teal.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        
       { children }
      </Flex>
    </Link> }
    </>
       
 
  );
};


const MobileNav = ({ onOpen, ...rest }) => {
const toast = useToast();
 const navigate = useNavigate();
const [loginToken,setLoginToken] = useState()
useEffect(()=>{
const loginuserToken = JSON.parse(localStorage.getItem('loginToken'));
 setLoginToken(loginuserToken)
},loginToken)
  const logoutHandle =()=>{

    localStorage.removeItem("loginToken");
      toast({
      title: 'logout !',
      position:'top-right',
      status: 'success',
      duration: 1000,
      });
    navigate('/route',{replace:true})
  }
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('teal.400', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
  >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        children={<HamburgerIcon></HamburgerIcon>}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' } }>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          children={<BellIcon></BellIcon>}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    loginToken?.user.profile
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">{loginToken?.user.first_name}</Text>
                  <Text fontSize="xs" color="gray.600">
                    
                    {loginToken?.user.user_type.user_type}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                <ChevronDownIcon></ChevronDownIcon>
              
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MyProfile><MenuItem>MyProfile</MenuItem> </MyProfile>
              <MenuItem>Settings</MenuItem>
             
              <MenuDivider />
              <MenuItem onClick={()=>{logoutHandle()}}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>  
      </HStack>



     
    </Flex>

    
  );
};

export default Sidebar