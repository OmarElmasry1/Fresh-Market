import React, {useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {InfinitySpin } from 'react-loader-spinner'
import { useContext } from 'react';
import { authContext } from '../Context/context';


export default function Login() {

  
const {setToken} = useContext(authContext);


let user = {  
    email:"",
    password:""
}


const [errMsg, setErrMsg] = useState(null);
const [succMsg, setSuccMsg] = useState(null);
const [isLoading, setIsLoading] = useState(false)

const navigate =useNavigate ();



async function sendData(values){


setIsLoading(true);

  try {
    const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)

      
    if (data.message === 'success') {


      localStorage.setItem('tkn', data.token);

      setToken(data.token);

      setSuccMsg('Welcome Back');

      setTimeout( ()=>{
        navigate('/home');
      }, 1000)
     
    }
   
 

  
  }
  catch(err) {
    console.log('error occurred', err);

   setErrMsg(err.response.data.message);

  }

 setIsLoading(false);
 
}

 const formikObj = useFormik({

  initialValues:  user,

  onSubmit: sendData ,

validate : function (values) {


  setErrMsg(null);

  const errors = {};

  if ( (values.email.includes('@') && values.email.includes('.')  ) === false ) {
    errors.email = 'Email must be include @ and .'
  }

  if (values.password.length < 6 || values.password.length > 12 ) {
    errors.password = 'Password Must be from 6 to 12 characters'
  }

  return errors
}
 });


 

 
 
 return <>
  
  <div className="w-75 m-auto py-5">

    {succMsg ? <div className="alert alert-success">{succMsg}</div> : ""}

    {errMsg ? <div className="alert alert-danger">{errMsg}</div> : ""}
    
  <h2>Login:</h2>

  <form onSubmit={formikObj.handleSubmit}>


    <label htmlFor='email'>Email:</label>
    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.email} type='email' id='email' placeholder='email' className='form-control mb-3'></input>
    {formikObj.errors.email && formikObj.touched.email ? <div className='alert alert-danger'>{formikObj.errors.email}</div> : ''}


    <label htmlFor='password'>Password:</label>
    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.password} type='password' id='password' placeholder='password' className='form-control mb-3'></input>
    {formikObj.errors.password && formikObj.touched.password ? <div className='alert alert-danger'>{formikObj.errors.password}</div> : ''}


    <button type='submit' disabled = {formikObj.isValid === false || formikObj.dirty === false} className='btn btn-success mt-3'>
      

     {isLoading ? <InfinitySpin 
      width='60'
      color="#fff"
      />
      : "Login" }
     
      
      
      
      </button>

  </form>

  </div>
  </>
}
