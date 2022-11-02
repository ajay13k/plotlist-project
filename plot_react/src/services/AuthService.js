import { ApiEndPoint } from "./apiEndPoint";
import httpCommon from "./http-common";

class Auth{
   getWebToken(){
       return httpCommon.get(ApiEndPoint.getWebToken);
   }
   loginUser(data){
       return httpCommon.post(ApiEndPoint.login,data);
   }
   signupUser(webToken,data){
       return httpCommon.post(ApiEndPoint.signup,data,{
           headers:{
                'Authorization': `Bearer ${webToken}`
           }
       });
     }
    getAllUserType(webToken){
       return httpCommon.get(ApiEndPoint.getAllUserType,{
           headers:{
                'Authorization': `Bearer ${webToken}`
           }
       });
      }
    getAllUser(loginToken){
       return httpCommon.get(ApiEndPoint.getAllUser,{
           headers:{
                'Authorization': `Bearer ${loginToken}`
           }
       });
      }

      deleteUser(loginToken,deletedid){
        return httpCommon.put(`${ApiEndPoint.deleteUser}/${deletedid}`,{},{
            headers:{
                 'Authorization': `Bearer ${loginToken}`
            }
        });
       }
      changePassword(loginToken,data,userid){
        return httpCommon.put(`${ApiEndPoint.changePassword}/${userid}`,data,{
            headers:{
                 'Authorization': `Bearer ${loginToken}`
            }
        });
       }
       updateProfile(loginToken,data,userid){
        const formData = new FormData();
       for(var key in data){
         formData.append(key ,data[key]);
       }
        return httpCommon.put(`${ApiEndPoint.updateUser}/${userid}`,formData,{
            headers:{
                 'Authorization': `Bearer ${loginToken}`
            }
        });
       }



       graph(loginToken){
           return httpCommon.get(ApiEndPoint.graph,{
            headers:{
                'Authorization': `Bearer ${loginToken}`
           }
           })
       }
}
export default new Auth();