import { ApiEndPoint } from "./apiEndPoint";
import httpCommon from "./http-common";

class Category {
   getAllCategory(webToken){
       return httpCommon.get(ApiEndPoint.getCategory,{
        headers: { 
            'Authorization': `Bearer ${webToken}`
       }})
   }
}
export default new Category();