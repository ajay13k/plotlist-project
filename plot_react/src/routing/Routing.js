import React, { useEffect, useState } from "react";

import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/admin/AdminDashboard";
import PageNotFound from "../miscellaneous/PageNotFound";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

import MyProfile from "../miscellaneous/MyProfile";
import Category from "../pages/admin/Category";
import Users from "../pages/admin/Users";
import Listing from "../miscellaneous/Listing";

import AdminHome from "../pages/admin/AdminHome";
import SiteManagement from "../pages/admin/SiteManagement";
import ListingDetails from "../miscellaneous/ListingDetails";
import UserDashBoard from "../pages/user/UserDashBoard";
import Enquiries from "../miscellaneous/Enquiries";
import Footer from "../pages/frontend/Footer";
// import Home from "../pages/frontend/Home";
import Contact from "../pages/frontend/Contact";
import ListingWeb from "../pages/frontend/ListingWeb";
import CategoryWeb from "../pages/frontend/CategoryWeb";
import SearchResultWeb from "../pages/frontend/SearchResultWeb";
import { Spinner } from "@chakra-ui/react";
import Loading from "../pages/frontend/Loading";
import EnquiriesList from "../pages/admin/EnquiriesList";
const Home = React.lazy(() => import('../pages/frontend/Home'));


const Routing = ({authToken}) => {
 
  const [isLoding, setIsLoding] = useState(true);
  useEffect(() => {
    
     setTimeout(() => {
        setIsLoding(false);
      }, 2000);
    },[isLoding]);

  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup/>} />
      <Route exact path="/profile" element={<MyProfile/>} />
      <Route exact path="/adminhome" element={<AdminHome/>} />
      <Route exact path="/category" element={<Category/>} />
      <Route exact path="/users" element={<Users/>}/>
      <Route exact path="/listing" element={<Listing/>}/>
      
      <Route exact path="/sitemanagement" element={<SiteManagement/>}/>
      <Route exact path="/detailsPage" element={<ListingDetails/>}/>
      <Route exact path="/admin" element={<AdminDashboard></AdminDashboard>}></Route>
     <Route exact path="/userhome" element={<UserDashBoard></UserDashBoard>} />
      <Route exact path="/enquiry" element={<Enquiries />} />
      <Route exact path="/enquirylist" element={<EnquiriesList />} />

       <Route path='/route' element={<Routing></Routing>}></Route>
      <Route  exact path="/" element={  isLoding ? <Loading/> : <Home/>} /> 
      <Route exact path="/contact" element={<Contact />} />
      <Route exact path="/listingweb" element={<ListingWeb/>} />
      <Route exact path="/categoryweb" element={<CategoryWeb/>} />
      <Route exact path="/searchListing" element={<SearchResultWeb/>} />
       <Route exact path="*" element={<PageNotFound></PageNotFound>}></Route>
    </Routes>
  );
};

export default Routing;
