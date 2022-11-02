
import React, { useEffect, useState } from 'react'
import LoadingScreen from "react-loading-screen";
import  spinner from "./S.gif";
const Loading = () => {
   console.log(spinner)
  return (
    <div
    className="loader"
    >
        <LoadingScreen
          loading={true}
           bgColor="#f1f1f1"
          spinnerColor="#9ee5f8"
          textColor="#676767"
          logoSrc={spinner}
          text="Loading..."
        />
     </div>
  )
}

export default Loading;