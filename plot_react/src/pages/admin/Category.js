import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useState ,useEffect } from 'react'
import ItemPage from '../../miscellaneous/itemPage'
import Sidebar from '../../miscellaneous/Sidebar'
import CategoryService from '../../services/CategoryService'
const Category = () => {
  const [data,setData] = useState([
    
    { name: 'category 1',  description :"Plot Listing is a responsive" , totalListing:"200",image:"https://bit.ly/kent-c-dodds"},
    { name: 'category 2',  description :"Plot Listing is a responsive ", totalListing:"100" ,image:"https://bit.ly/kent-c-dodds"},
    { name: 'category 3',  description :"Plot Listing is a responsive ", totalListing:"600" ,image:"https://bit.ly/kent-c-dodds"},
    { name: 'category 4',  description :"Plot Listing is a responsive ", totalListing:"300" ,image:"https://bit.ly/kent-c-dodds"}
   ]);
      const [webToken , setWebToken]=useState();
   const [categories,setCategories] = useState();
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
      getAllCategory();
    },[webToken]);
    return (
        <>
        <Sidebar>
       { categories &&  <ItemPage data={categories}></ItemPage>}
        </Sidebar>
       
       
        </>
       )
}

export default Category