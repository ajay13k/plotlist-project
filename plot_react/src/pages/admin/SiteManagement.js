
import React, { useEffect, useState } from 'react'
import ItemPage from '../../miscellaneous/itemPage'
import Sidebar from '../../miscellaneous/Sidebar'
import TableFilter from '../../miscellaneous/TableFilter';
import SiteMengmentService from '../../services/SiteMengmentService';

const SiteManagement = ({children}) => {
   
    // const [data,setData] = useState([
    
    //     { name: 'Home', reletedTab : "header" ,  redirectLink :"/" },
    //     { name: 'About us', reletedTab : "footer" , redirectLink :"/aboutUS"},
    //     { name: 'banner 3', reletedTab : "banner"},
    //     { name: 'Contact',reletedTab : "header" ,  redirectLink :"/contact"}
       
    // ]);
    const [data ,setData]=useState([]);
    const [siteData,setSiteData] = useState();
    const[loginToken,setLoginToken]=useState();
    const[webToken,setWebToken]=useState();
    
    
  
    const getAllsiteContent = async()=>{
      var a = [];
      var b = {};
      const sitecontent = await SiteMengmentService.getAllsiteContent(webToken);
     console.log(sitecontent.data);
    
      for(var i=0 ; i < sitecontent.data.length ; i++){
          //  console.log("ghfghf",dataObj)
          //  a.push(sitecontent.data[i])
          b=sitecontent.data[i]
          var dataObj = {}
          var keys = Object.keys(b)
          dataObj['_id']=sitecontent.data[i]._id   
          for(var j=0 ; j <keys.length ; j++){
        
          
            if(keys[j] === 'text'){
              dataObj['text']=b[keys[j]];
            }
         
            if( keys[j] === 'related_tab'){
              dataObj[keys[j]]=b[keys[j]]
            }
            if(keys[j] === 'image'){
              dataObj['image']= b[keys[j]];
            } 

            if(keys[j] === 'header_title' || keys[j] === 'title'){
              dataObj['title']=b[keys[j]]
             
            }
            if(keys[j] === 'heading'){
              dataObj['heading']=b[keys[j]];
            }  
         
             if( keys[j] === 'header_link' ||  keys[j] === 'redirect_link'){
            dataObj['redirectLink']=b[keys[j]]
          }
        }
       
      
        console.log(dataObj)
        a.push(dataObj)
        }
 
    
        // a.push(dataObj)
           setSiteData(a)
     
      // setSiteData(a);
   }
    useEffect(()=>{
      const loginuserToken = JSON.parse(localStorage.getItem('loginToken'));
     setLoginToken(loginuserToken.token);
        const websiteToken = JSON.parse(localStorage.getItem('webToken'));
       setWebToken(websiteToken.authToken);
       getAllsiteContent();
        
     },[webToken]);

  return (
   <>
   <Sidebar>
        {/* <TableFilter></TableFilter> */}
     { siteData && <ItemPage data={siteData}></ItemPage>}
     
   </Sidebar>


  

   </>
  )
}

export default SiteManagement