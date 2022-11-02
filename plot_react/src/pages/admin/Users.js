import { Flex, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react'
import React, { useState,useEffect } from 'react'
import ItemPage from '../../miscellaneous/itemPage';
import Sidebar from '../../miscellaneous/Sidebar'
import TableFilter from '../../miscellaneous/TableFilter';
import AuthService from "../../services/AuthService";
const Users = () => {
  const [data,setData] = useState([
    
    // { name: 'test user 1', email :"testuser1@gmail.com" ,image:"https://bit.ly/kent-c-dodds"},
    // { name: 'test user 2', email :"testuser2@gmail.com" ,image:"https://bit.ly/kent-c-dodds"},
    // { name: 'test user 3', email :"testuser3@gmail.com" ,image:"https://bit.ly/kent-c-dodds"},
    // { name: 'test user 4', email :"testuser4@gmail.com" ,image:"https://bit.ly/kent-c-dodds"},
    // { name: 'test user 5', email :"testuser5@gmail.com" ,image:"https://bit.ly/kent-c-dodds"},
    // { name: 'test user 6', email :"testuser6@gmail.com" ,image:"https://bit.ly/kent-c-dodds"},
    // { name: 'test user 7', email :"testuser7@gmail.com" ,image:"https://bit.ly/kent-c-dodds"},
    // { name: 'test user 8', email :"testuser8@gmail.com" ,image:"https://bit.ly/kent-c-dodds"},
    // { name: 'test user 9', email :"testuser9@gmail.com" ,image:"https://bit.ly/kent-c-dodds"},
    // { name: 'test user 10', email :"testuser10@gmail.com" ,image:"https://bit.ly/kent-c-dodds"},
    // { name: 'test user 11', email :"testuser11@gmail.com" ,image:"https://bit.ly/kent-c-dodds"},
    // { name: 'test user 12', email :"testuser12@gmail.com" ,image:"https://bit.ly/kent-c-dodds"},
    
]);
const[loginToken,setLoginToken]=useState();
const[webToken,setWebToken]=useState();
const[users,setUsers] =useState();
  const getAllUser = async()=>{
    var a= [];
    const user =  await AuthService.getAllUser(loginToken);
     console.log(user.data);
   for(var i=0 ; i < user.data.length ; i++){
       const data= {
         _id:user.data[i]._id,
         name:`${user.data[i].first_name} ${user.data[i].last_name}`,
         email:user.data[i].email,
         image:user.data[i].profile,
        }
      a.push(data)
   }

   setUsers(a) 
  }
useEffect(()=>{
 const loginuserToken = JSON.parse(localStorage.getItem('loginToken'));
 console.log(loginuserToken.token)
 setLoginToken(loginuserToken.token);
   const websiteToken = JSON.parse(localStorage.getItem('webToken'));
  setWebToken(websiteToken.authToken);
     getAllUser(loginToken);
    console.log("first")
},loginToken);
    return (
        <>
        <Sidebar>
          {/* <TableFilter></TableFilter> */}
        { users && <ItemPage data={users}></ItemPage>}
        </Sidebar>
       
       
        </>
       )
}

export default Users