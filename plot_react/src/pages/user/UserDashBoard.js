import { Box, chakra, SimpleGrid, Stat, StatLabel, StatNumber, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import ItemPage from '../../miscellaneous/itemPage';
import Sidebar from '../../miscellaneous/Sidebar'
import CategoryService from '../../services/CategoryService';
import ListingService from '../../services/ListingService';
import navBarData  from "../../userNavbar";
const UserDashBoard = () => {
  const [data,setData] = useState([
    
    { name: 'category 1',  description :"Plot Listing is a responsive" , totalListing:"200",image:"https://bit.ly/kent-c-dodds"},
    { name: 'category 2',  description :"Plot Listing is a responsive ", totalListing:"100" ,image:"https://bit.ly/kent-c-dodds"},
    { name: 'category 3',  description :"Plot Listing is a responsive ", totalListing:"600" ,image:"https://bit.ly/kent-c-dodds"},
    { name: 'category 4',  description :"Plot Listing is a responsive ", totalListing:"300" ,image:"https://bit.ly/kent-c-dodds"}
   
]);
const [webToken , setWebToken]=useState();
const [categories,setCategories] = useState();
const [listings,setListings]=useState();
const[tempListing,setTempListing]= useState();
const[user,setUser]=useState();
const [userData,setUserData]= useState();

async function  getAllListing (){

 const listing =  await ListingService.getAllListing(webToken);
   console.log(listing.data.listings);
   const list = listing.data.listings.filter((list)=>{
     if(list.PostedUserid._id === user._id){
       return list
      }
    });
    const Penddinglist = list.filter((p)=>{
      if(p.status === 'pendding'){
        return p
       }
     });
 
     const Saleslist = list.filter((p)=>{
      if(p.status === 'sales'){
        return p
       }
     });
     setUserData({
       total:list.length,
       Penddinglist:Penddinglist.length,
       Saleslist:Saleslist.length
     });
     console.log(list.length,Penddinglist.length,Saleslist.length);
//  setListings(a) 
 
}

const getAllCategory = async ()=>{
 var a = [];
 const categoriesArray = await CategoryService.getAllCategory(webToken);
 console.log(categoriesArray.data.categories);
 for(var i=0 ; i<categoriesArray.data.categories.length ; i++){
   const data={
     name :categoriesArray.data.categories[i].category_name,
     description :categoriesArray.data.categories[i].title,
     image:categoriesArray.data.categories[i].image,
     status : categoriesArray.data.categories[i].isDeleted ? 'Not active':'active'
   }
   a.push(data);
 }
setCategories(a)

}

useEffect(()=>{
   const websiteToken = JSON.parse(localStorage.getItem('webToken'));
   setWebToken(websiteToken.authToken);
   const loginData = JSON.parse(localStorage.getItem('loginToken'));
   setUser(loginData.user)
   getAllCategory();
   getAllListing();
 },[webToken]);


  return (
   <>
     <Sidebar>
     <Box  maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
   <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard title={'Your Listings'} stat={!userData?0:userData?.total} />
        <StatsCard title={'In pending'} stat={`${!userData ? 0 :userData?.Penddinglist} different Listings`} />
        <StatsCard title={' Market revenue '} stat={`${!userData?0:userData?.Saleslist} different agents`} />
      </SimpleGrid>
    </Box>
        <chakra.h1
        textAlign={'left'}
        fontSize={'4xl'}
        py={10}
        fontWeight={'bold'}
        
        >
        Category 
      </chakra.h1>
       { categories && <ItemPage data={categories}></ItemPage>}
     </Sidebar>
   </>
  )
}

function StatsCard({title,stat}) {

  return (
    <Stat
      px={{ base: 4, md: 8 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      bg ={'teal.200'}
      rounded={'lg'}>
      <StatLabel fontWeight={'medium'} isTruncated>
        {title}
      </StatLabel>
      <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
        {stat}
      </StatNumber>
    </Stat>
  );
}

export default UserDashBoard