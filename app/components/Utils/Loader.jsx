"use client"
import React from 'react'
import { useSelector } from 'react-redux';
import HashLoader from "react-spinners/HashLoader";

const Loader = () => {
    const loading = useSelector((state) => state?.settings?.customLoading)

    if(loading){
      return (
        <div className='loader'>
          <HashLoader size={60} color='rgb(226, 226, 59)'/>
        </div>
      )
    } else {
      return null;
    }
}

export default Loader