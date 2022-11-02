import { ApiEndPoint } from "./apiEndPoint";
import httpCommon from "./http-common";
class siteMengment{
    getAllsiteContent(webToken){
        return httpCommon.get(ApiEndPoint.getSiteOption,{
            headers: { 
                'Authorization': `Bearer ${webToken}`
           }
        })
    }
    saveContactor(data,webToken){
        return httpCommon.post(ApiEndPoint.saveContactor,data,{
            headers: { 
                'Authorization': `Bearer ${webToken}`
           }
        });
    }
    getsearchResult(data,webToken){
        return httpCommon.get(ApiEndPoint.searchNow,{
            headers: { 
                'Authorization': `Bearer ${webToken}`
           },
           params:{
               location:data.location,
               minPrice:data.minPrice,
               maxPrice:data.maxPrice
           }
        })
    }

    createSiteContent(loginToken,data){
        const formdata = new FormData();
        for(var key in data){
            formdata.append(key,data[key]);
        }
            return  httpCommon.post(ApiEndPoint.createSiteContent,formdata,{
                headers: { 
                    'Authorization': `Bearer ${loginToken}`
               }
            });
    }

    deleteSiteContent(loginToken,id){
        return httpCommon.put(`${ApiEndPoint.deleteSiteOption}/${id}`,{},{
            headers: { 
                'Authorization': `Bearer ${loginToken}`
           }  
        })
    }


    updateSiteContent(loginToken,data,id){
        return httpCommon.put(`${ApiEndPoint.updateSiteOption}/${id}`,data,{
            headers: { 
                'Authorization': `Bearer ${loginToken}`
           } 
        })
    }

}
export default  new siteMengment()