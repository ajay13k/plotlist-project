import { Spinner, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import ItemPage from '../../miscellaneous/itemPage';
import Sidebar from '../../miscellaneous/Sidebar'
import ListingService from '../../services/ListingService';

const EnquiriesList = () => {
    const location = useLocation();
    const[loginToken ,setLoginToken]=useState();
    const [enquiryData,setEnquiryData]=useState();
    const[isLoading ,setIsLoading] = useState(false)
     useEffect(()=>{
      console.log(location.state)
      const loginData = JSON.parse(localStorage.getItem('loginToken'));
      setLoginToken(loginData.token);
      getAllEnquiry();
    },[loginToken]);
  
  const getAllEnquiry = async()=>{
    var a = [];
    setIsLoading(false)
     const enquiries = await ListingService.getAllEnquiry(loginToken);
      console.log(enquiries.data);
      for(var i=0 ; i < enquiries.data.length ; i++){
        a.push({
          message:enquiries.data[i].message,
          enquiryBy:enquiries.data[i].name,
          EnquiryOnListing:enquiries.data[i].listing.title,
          enquiryEmail:enquiries.data[i].email
  
  
        })
      }
      setEnquiryData(a);
      setIsLoading(true);
  }

  return (
   <Sidebar>
      {  enquiryData?.length < 0 ? <Text> No Enquiries </Text>:enquiryData && isLoading ? <ItemPage data={enquiryData}></ItemPage> :<Spinner></Spinner>}
   </Sidebar>
  )
}

export default EnquiriesList