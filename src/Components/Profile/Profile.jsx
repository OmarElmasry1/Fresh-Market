import React from 'react'
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from 'react';
import { InfinitySpin } from 'react-loader-spinner';

export default function Profile() {


  const [name, setName] = useState(null)
 
 useEffect (()=> {

  const result =  jwtDecode(localStorage.getItem('tkn'))

  setName(result.name);

 }, [])
 
 
 if (name === null) {

  return <InfinitySpin 
      width='60'
      color="#fff"
      />
    
 }
 
 
 return <>
  
  <div className="container">

    <h1 className='text-center'>Hello {name} </h1>

  </div>
  
  
  
  </>
}
