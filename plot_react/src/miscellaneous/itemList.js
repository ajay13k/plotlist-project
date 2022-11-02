import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Spacer,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Image,
  Button,
  useColorModeValue,
  Tooltip,
  useToast,
  Menu,
  MenuButton,
  HStack,
  VStack,
  MenuList,
  MenuItem,
  Heading,
  Center,
  Popover,
  PopoverTrigger,
  IconButton,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Stack,
  useDisclosure,
  PopoverCloseButton,
} from "@chakra-ui/react";
import {
  AddIcon,
  ChevronDownIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import ListingDetails from "./ListingDetails";
import EditListing from "./EditListing";
import DeleteListing from "./DeleteListing";
import Enquiries from "./Enquiries";
import "./itemlist.css";
import {
  BsChatRightText,
  BsChatSquareQuote,
  BsFunnelFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import ListingService from "../services/ListingService";
import AuthService from "../services/AuthService";
import MyProfile from "./MyProfile";
import AddListing from "./AddListing";
import TableFilter from "./TableFilter";
import AddSiteContent from "../pages/admin/AddSiteContent";
import EditSitecontent from "../pages/admin/EditSitecontent";
import SiteMengmentService from "../services/SiteMengmentService";
// import { strict } from "assert";
function ItemList({ items, curPage, itemLimit }) {
  console.log("curPage",curPage)

  const toast = useToast();
  const [curItems, setCurItems] = useState([]);

  const [pathname, setPathName] = useState();
  const [loginToken, setLoginToken] = useState();
  const [filter, setfilter] = useState();
  const [statusChange, setStatusChange] = useState(false);
  const [role, setRole] = useState();
  const [status, setStatus] = useState();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);
 
  let navigate = useNavigate();
  var itemObj;
  if (items.every((value) => value === null)) {
    itemObj = {};
    console.log("null value");
  } else {
    itemObj = Object.keys(items[0]);
    // console.log("data ==", items[0]);
  }

  const [tableHanding, setTableHading] = useState(itemObj);
  const ChangeSatus = async (e, data) => {
    console.log(e.target.value, data);
    e.preventDefault();
    const changeStatus = await ListingService.updateListing(
      loginToken,
      { status: e.target.value },
      data?._id
    );
    console.log(changeStatus.data);
    if (changeStatus.status === 200) {
      toast({
        position: "top-right",
        title: "status changed !",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    } else {
      toast({
        position: "top-right",
        title: "status not  changed !",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    }

    onClose();
  };
   
  useEffect(() => {
    setPathName(window.location.pathname);
    const loginuserToken = JSON.parse(localStorage.getItem("loginToken"));
    // console.log(loginuserToken?.user.user_type.user_type)
    setRole(loginuserToken?.user.user_type.user_type);
    setLoginToken(loginuserToken.token);
    const offset = curPage * itemLimit;
    const getList = (curPage, itemLimit) => {
      setCurItems(items.slice(offset, offset + itemLimit));
    };

    if (!filter) {
      getList(curPage, itemLimit);
    } else {
      const a = items.slice(offset, offset + itemLimit);
      const b = a.filter((data) => {
        if (data.status === filter) {
          return data;
        }
      });
      setCurItems(b);
    }
 
    console.log(filter);
  }, [statusChange,filter, curPage, itemLimit, items, role]);

  // useEffect(()=>{

  // },[filter])

  const enquiries = (listingData) => {
    navigate("/enquiry", { replace: true, state: listingData });
  };

  const deleteHandle = async (deletedid) => {
    console.log(deletedid, pathname);
    console.log(loginToken);
    if (pathname === "/listing") {
      const deleted = await ListingService.DeleteListing(loginToken, deletedid);
      console.log(deleted);
      toast({
        position: "top-right",
        title: deleted.data.message,
        description: "We've deleted your listing ",
        status: "info",
        duration: 1000,
        isClosable: true,
      });
    }

    if (pathname === "/users") {
      const deleted = await AuthService.deleteUser(loginToken, deletedid);
      console.log(deleted);
      toast({
        position: "top-right",
        title: deleted.data.message,
        description: "We've deleted your listing ",
        status: "info",
        duration: 1000,
        isClosable: true,
      });
    }

    if (pathname === "/sitemanagement") {
      const deleted = await SiteMengmentService.deleteSiteContent(
        loginToken,
        deletedid
      );
      console.log(deleted);
      toast({
        position: "top-right",
        title: deleted.data.message,
        description: "We've deleted your site content ",
        status: "info",
        duration: 1000,
        isClosable: true,
      });
    }
  };



  return (
    <>
      {/* <Flex
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
      </Flex> */}

<TableContainer>
        <Table size="sm" variant="striped" colorScheme="teal">
          {/* <TableCaption>*************************</TableCaption> */}
          <Thead>
            <Tr>
              {curItems.length === 0 ? (
                <Text fontSize={30}> Sorry! No {filter} Listings</Text>
              ) : (
                tableHanding?.map(function (h) {
                  if (h !== "_id") {
                    return (
                      <>
                        <Th style={{ "text-align": "auto" }}>{h}</Th>
                      </>
                    );
                  }
                })
              )}

              {(curItems.length > 0 && pathname === "/listing") ||
              pathname === "/sitemanagement" ||
              pathname === "/users" ? (
                <>
                  {pathname === "/listing" || pathname === "/sitemanagement" ? (
                    <Th>Edit</Th>
                  ) : (
                    ""
                  )}
                  <Th>Delete</Th>
                  {pathname !== "/sitemanagement" && <Th>Details</Th>}

                  {role === "user" ? <Th>Enquirey</Th> : ""}
                </>
              ) : (
                ""
              )}
              {}
            </Tr>
          </Thead>
          <Tbody>
            {curItems?.map(function (data) {
             
              return (
                <Tr>
                  {/* <Tr onClick={()=>{enquiries(data)}}> */}
                  {tableHanding.map(function (h) {
                    if (h === "image") {
                      return (
                        <Td>
                          <Image
                            boxSize="50px"
                            objectFit="cover"
                            src={data[h]}
                            alt="Dan Abramov"
                          />
                        </Td>
                      );
                    } else if (h === "status") {
                      return (
                        <Td >
                          <Flex
                          
                            justifyContent="center"
                            className="colornone"
                          >
                            <Text 
                             ml={ 
                              //  pathname === "/category"? {base:-6,md:-140} : 
                               pathname === "/userhome"
                                ? -55
                                : -25
                            } 
                            mt={3}> {data[h]}</Text>
                            {role === "admin" && pathname === "/listing" && (
                              <Popover
                                firstFieldRef
                                onOpen={onOpen}
                                onClose={onClose}
                                placement="bottom"
                                isLazy
                              >
                                <PopoverTrigger>
                                  <IconButton
                                    aria-label="More server options"
                                    icon={<BsThreeDotsVertical />}
                                    variant="solid"
                                    w="fit-content"
                                  />
                                </PopoverTrigger>
                                <PopoverContent
                                  w="fit-content"
                                  _focus={{ boxShadow: "none" }}
                                >
                                  <PopoverArrow />

                                  <PopoverBody>
                                    <Stack>
                                      <Button
                                        onClick={(e) => {
                                          ChangeSatus(e, data);setStatusChange(true)
                                        }}
                                        variant="ghost"
                                        justifyContent="space-between"
                                        fontWeight="normal"
                                        fontSize="sm"
                                        value={"approved"}
                                      >
                                        approved
                                      </Button>
                                      <Button
                                        onClick={(e) => {
                                          ChangeSatus(e, data);setStatusChange(true)
                                        }}
                                        variant="ghost"
                                        value={"reject"}
                                        justifyContent="space-between"
                                        fontWeight="normal"
                                        fontSize="sm"
                                      >
                                        reject
                                      </Button>
                                      <Button
                                        onClick={(e) => {
                                          ChangeSatus(e, data);setStatusChange(true)
                                        }}
                                        variant="ghost"
                                        justifyContent="space-between"
                                        fontWeight="normal"
                                        fontSize="sm"
                                        value={"sales"}
                                      >
                                        sales
                                      </Button>
                                    </Stack>
                                  </PopoverBody>
                                </PopoverContent>
                              </Popover>
                            )}
                          </Flex>
                        </Td>
                      );
                    } else if (h !== "_id") {
                      return <Td>{data[h]}</Td>;
                    }
                  })}
                  {pathname === "/listing" ||
                  pathname === "/users" ||
                  pathname === "/sitemanagement" ? (
                    <>
                      {pathname === "/listing" ? (
                        <Td>
                          <EditListing data={data}>
                            <Button>
                              <EditIcon></EditIcon>
                            </Button>
                          </EditListing>
                        </Td>
                      ) : (
                        ""
                      )}

                      {pathname === "/sitemanagement" ? (
                        <Td>
                          {data && (
                            <EditSitecontent data={data}>
                              <Button>
                                <EditIcon></EditIcon>
                              </Button>
                            </EditSitecontent>
                          )}
                        </Td>
                      ) : (
                        ""
                      )}

                      <Td>
                        <DeleteListing>
                          <Button
                            onClick={() => {
                              deleteHandle(data?._id);
                            }}
                          >
                            <DeleteIcon></DeleteIcon>
                          </Button>
                        </DeleteListing>
                      </Td>
                      {pathname === "/listing" && (
                        <Td>
                          <ListingDetails data={data}>
                            <Button>more</Button>
                          </ListingDetails>
                        </Td>
                      )}
                      {pathname === "/users" && (
                        <Td>
                          <MyProfile data={data}>
                            <Button>Profile</Button>
                          </MyProfile>
                        </Td>
                      )}

                      {role === "user" ? (
                        <Td>
                          <Tooltip
                            placement="auto"
                            isDisabled={pathname === "/enquiry"}
                            fontSize="lg"
                            hasArrow
                            label="Click for enquiries"
                            aria-label="A tooltip"
                            bg="gray.300"
                            color="black"
                          >
                            <Button
                              onClick={() => {
                                enquiries(data);
                              }}
                            >
                              <BsChatRightText></BsChatRightText>
                            </Button>
                          </Tooltip>
                        </Td>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </Tr>
              );
            })}
            {}
          </Tbody>
        </Table>
        </TableContainer>
    </>
  );
}

export default ItemList;
