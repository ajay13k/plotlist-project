import { Box, Divider } from '@chakra-ui/react';
import React, { useState ,useEffect} from 'react'
import ItemPage from '../../miscellaneous/itemPage';
import ListingService from "../../services/ListingService";

import BasicStatistics from './BasicStatistics';
const AdminDashboard = () => {
 
  const [loginToken,setLoginToken] = useState();
  const [webToken,setWebToken]=useState();
  const [listings,setListings]=useState();
  const getAllListing = async()=>{
    var a= [];
   const listing =  await ListingService.getAllListing(webToken);
   console.log(listing.data.listings);
   for(var i=0 ; i < listing.data.listings.length ; i++){
       const data= {
         name:listing.data.listings[i].title,
         posted:listing.data.listings[i].postedDate.substring(0, 10),
         owner:listing.data.listings[i].PostedUserid.first_name,
         Reviews:listing.data.listings[i].reviews.length
       }
      a.push(data)
   }

   setListings(a) 
  }
useEffect(()=>{
const loginuserToken = JSON.parse(localStorage.getItem('loginToken'));
 setLoginToken(loginuserToken);
   const websiteToken = JSON.parse(localStorage.getItem('webToken'));
      setWebToken(websiteToken.authToken);
      getAllListing();
},[webToken]) 
  return (
   <>
      <BasicStatistics></BasicStatistics>
        <Divider/>
     
      { listings && <ItemPage data={listings}></ItemPage> }   
  
   </>
  )
}

export default AdminDashboard