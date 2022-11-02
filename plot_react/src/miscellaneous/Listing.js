import { Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useState ,useEffect } from 'react'
import ItemPage from './itemPage'
import Sidebar from './Sidebar'
import TableFilter from './TableFilter'
import ListingService from "../services/ListingService";
const Listing = () => {
  const [heading , setHeading] = useState([
    'Name','Owner','Posted','Delete','Edit','Update','Status'
  ])

  // const [data,setData] = useState([
  //     { name: 'royal vila', postedDate:"2022-08-08" , owner :"Avinash", quantity: 3 , status:'approved' },
  //     { name: 'royal vila', postedDate:"2022-08-08" , owner :"Avinash", quantity: 6 , status:'approved' },
  //     { name: ' vila', postedDate:"2022-08-08" , owner :"Avinash", quantity: 9 , status:'pendding'},
  //     { name: 'royal vila', postedDate:"2022-08-08" , owner :"Avinash", quantity: 5 , status:'approved' },
  //     { name: ' vila', postedDate:"2022-08-08" , owner :"Avinash", quantity: 2 , status:'dissApproved'},
  //     { name: 'royal vila', postedDate:"2022-08-08" , owner :"Avinash", quantity: 12 , status:'sales'}
  // ]);

  
  const [webToken,setWebToken]=useState();
  const [listings,setListings]=useState();
  const[tempListing,setTempListing]= useState();
  const [user,setUser]=useState();
  var a= [];
  async function  getAllListing (){
 
   const listing =  await ListingService.getAllListing(webToken);
   console.log(listing.data.listings);
   for(var i=0 ; i < listing.data.listings.length ; i++){
          //  console.log(listing.data.listings[i].postedDate.substring(0, 10))
       const data= {
         _id:listing.data.listings[i]._id,
         name:listing.data.listings[i].title,
         posted:listing.data.listings[i].postedDate.substring(0, 10),
         owner:listing.data.listings[i].PostedUserid.first_name,
         Reviews:listing.data.listings[i].reviews.length,
         status:listing.data.listings[i].status
       }
      a.push(data)
   }

    if(user?.user_type.user_type === 'admin'){
      setListings(a) 

    }
    if(user?.user_type.user_type === 'user'){
      const onlyuserListing = a.filter((data)=>{
        if(data?.owner === user?.first_name){
          return data
        }
      });
    setListings(onlyuserListing)
    }

   
  }
useEffect(()=>{
      const websiteToken = JSON.parse(localStorage.getItem('webToken'));
      setWebToken(websiteToken.authToken);
      const loginData = JSON.parse(localStorage.getItem('loginToken'));
      setUser(loginData.user)
      getAllListing();
      console.log(a)
      setTempListing(listings)
      
},[webToken,tempListing]);

// useEffect(()=>{
//   const websiteToken = JSON.parse(localStorage.getItem('webToken'));
//   setWebToken(websiteToken.authToken);
//   console.log("on data change")
  
// });


  return (
   <>
   <Sidebar>
   {/* <TableFilter></TableFilter> */}
     {listings &&  <ItemPage data={listings} ></ItemPage> }
   </Sidebar>

  
   </>
  )
}

export default Listing