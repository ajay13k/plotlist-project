import axios from "axios";

export default axios.create({
  baseURL: 
    //"https://plotlistnode.herokuapp.com/plotlist/",
     "http://localhost:8085/plotlist/",
    // baseURL: "http://95.111.202.157:8085/plotlist/",
      
  headers: {
    "Content-type": "application/json"
  }
});


