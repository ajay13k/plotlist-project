import React, { useState ,useEffect} from "react";

import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  ModalBody,
  Modal,
  ModalCloseButton,
  ModalContent,
  useDisclosure,
  ModalHeader,
  Tooltip,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import EditUser from "./EditUser";
import { BsPersonCircle } from "react-icons/bs";
import ChangePassword from "./ChangePassword";

const MyProfile = ({ children ,data}) => {

  
  const finalRef = React.useRef(null);
  const [isShow ,setIsShow] = useState(false);
  const [isPasswordUpdate ,setIsPasswordUpdate] = useState(false);
  const [user,setUser] = useState();

  useEffect(()=>{
    if(!data){
      const loginData = JSON.parse(localStorage.getItem('loginToken'));
      setUser(loginData.user)

    }else{
      setUser(data)
    }
  },user);

  const changeshow = ()=>{
    setIsShow(!isShow);
    setIsPasswordUpdate(false);
  }
  const changePassword = ()=>{
    
    setIsPasswordUpdate(!isPasswordUpdate);
  }

  const { isOpen, onOpen, onClose } = useDisclosure();


  return (
    <>
      <Text onClick={()=>{ setUser(data);onOpen(); }}>{children}</Text>
      <Modal  closeOnOverlayClick={false} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>
         
            {isShow  ? !data && 
            <Tooltip
              hasArrow
              label="profile"
              bg="gray.300"
              color="black"
            > 
            <BsPersonCircle onClick={()=>{changeshow()}}/>
             </Tooltip>  : 
             !data &&
             <Tooltip
              hasArrow
              label="update profile"
              bg="gray.300"
              color="black"
            > 
            
            <EditIcon onClick={()=>{changeshow()}}/>
             </Tooltip> }
          
             <Center> <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                {isShow ? "Update User Profile":!isPasswordUpdate ? "Profile" : "Change Password"}
        </Heading></Center>
            
          </ModalHeader>
          <ModalBody size="xs" bg={useColorModeValue("white", "gray.800")}>
         
            <Center py={6}>
              {isShow? <EditUser onClose={onClose}></EditUser>: !isPasswordUpdate ?
               <Box
                maxW={"270px"}
                w={"full"}
                bg= "gray.200"
                boxShadow={"2xl"}
                rounded={"md"}
                overflow={"hidden"}
              >
                <Image
                  h={"120px"}
                  w={"full"}
                  src={
                    "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                  }
                  objectFit={"cover"}
                />
                <Flex justify={"center"} mt={-12}>
                  <Avatar
                    size={"xl"}
                    src={user?.profile || user?.image}
                    alt={"Author"}
                    css={{
                      border: "2px solid white",
                    }}
                  />
                </Flex>

                <Box p={6}>
                  <Stack spacing={0} align={"center"} mb={5}>
                    <Heading
                      fontSize={"2xl"}
                      fontWeight={500}
                      fontFamily={"body"}
                    >
                    {user?.first_name} {user?.last_name}  {user?.name}
                    </Heading>
                    <Text color={"gray.500"}>{user?.email}</Text>
                  </Stack>

                  <Stack direction={"row"} justify={"center"} spacing={6}>
                    <Stack spacing={0} align={"center"}>
                      <Text fontWeight={600}>23</Text>
                      <Text fontSize={"sm"} color={"gray.500"}>
                        Listing Added
                      </Text>
                    </Stack>
                    <Stack spacing={0} align={"center"}>
                      <Text fontWeight={600}>10 </Text>
                      <Text fontSize={"sm"} color={"gray.500"}>
                        Sales
                      </Text>
                    </Stack>
                  </Stack>


                    {!data && <Button
                  onClick={()=>{changePassword()}}
                    w={"full"}
                    mt={8}
                    bg= "gray.900"
                    color={"white"}
                    rounded={"md"}
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "lg",
                    }}
                  >
                    Change Password
                  </Button>}
                  
                </Box>
              </Box>
             :<ChangePassword onClose={onClose}></ChangePassword>
              }
         
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MyProfile;
