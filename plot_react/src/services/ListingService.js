import { ApiEndPoint } from "./apiEndPoint";
import httpCommon from "./http-common";


class Listing{
    getAllListing(webToken){
        return httpCommon.get(ApiEndPoint.getListing,{
            headers: { 
                'Authorization': `Bearer ${webToken}`
           }
        })
    }
    DeleteListing(loginToken,deletedid){
       
        return httpCommon.put(`${ApiEndPoint.deleteListing}/${deletedid}`,{},{
            headers: { 
                'Authorization': `Bearer ${loginToken}`
           }
        });
    }

    AddListing(loginToken,data){
        console.log(data)

        var formdata = new FormData();
        for( var key in data){
            if(key === 'metadata'){
                for(var a in data[key]){
                formdata.append(`${key}.${a}`,data[key][a]);
                console.log("key == >",`${key}.${a}` , "value ==>",data[key][a])
                }
            }else{
                console.log("key == >",key , "value ==>",data[key] )
                formdata.append(key,data[key]);
            }
        }
        return httpCommon.post(ApiEndPoint.addListing,formdata,{
            headers: { 
                'Authorization': `Bearer ${loginToken}`
           }
        })
    }

    getListingById(loginToken,listingid){
        return httpCommon.get(`${ApiEndPoint.getListingById}/${listingid}`,{
            headers: { 
                'Authorization': `Bearer ${loginToken}`
           }
        });
    }
    updateListing(loginToken,data,listingid){

        console.log(data)
        var formdata = new FormData();
        for( var key in data){
            if(key === 'metadata'){
                for(var a in data[key]){
                formdata.append(`${key}.${a}`,data[key][a]);
                console.log("key == >",`${key}.${a}` , "value ==>",data[key][a])
                }
            }else{
                // console.log("key == >",key , "value ==>",data[key] )
                formdata.append(key,data[key]);
            }
        }
        return httpCommon.put(`${ApiEndPoint.updateListing}/${listingid}`,formdata,{
            headers: { 
                'Authorization': `Bearer ${loginToken}`
           }
        })
    }


    createEnquiry(loginToken,data,listingid){
            return httpCommon.post(`${ApiEndPoint.enquiry}/${listingid}`,data,{
                headers: { 
                    'Authorization': `Bearer ${loginToken}`
               }
            });
    }

    getAllEnquiry(loginToken){
        return httpCommon.get(ApiEndPoint.getEnquiry,{
            headers: { 
                'Authorization': `Bearer ${loginToken}`
           }
        });
    }
}
export default new Listing();