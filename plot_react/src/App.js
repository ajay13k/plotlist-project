import logo from './logo.svg';
import './App.css';

import React, { useEffect, useState } from 'react';
import CustomRoute from "./routing/Routing";
import AuthService from './services/AuthService';
const { Route, Routes, BrowserRouter } = require('react-router-dom')
console.log('app.js')
function App() {
  const[authToken,setauthToken]=useState()
  useEffect(()=>{
   getWebToken()  
   console.log("authToken",authToken)
  },[]);

  const getWebToken = async()=>{
      await AuthService.getWebToken().then(webtoken=>{
        setauthToken(JSON.stringify(webtoken.data))
        localStorage.setItem('webToken',JSON.stringify(webtoken.data));
      });
  }
  return (
    <React.Fragment>
      <BrowserRouter >
        <CustomRoute authToken={authToken}/>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
