import React, { useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {InfinitySpin } from 'react-loader-spinner'

export default function Register() {
 
let user = {
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:""
}


const [errMsg, setErrMsg] = useState(null);
const [succMsg, setSuccMsg] = useState(null);
const [isLoading, setIsLoading] = useState(false)

const navigate =useNavigate ();



async function sendData(values){


setIsLoading(true);

  try {
    const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)

    console.log(data)

    if (data.message === 'success') {

      setSuccMsg('The Account Is Created Successfuly');

      setTimeout( ()=>{
        navigate('/login');
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

  if (values.name.length < 4 || values.name.length > 12 ) {
    errors.name = 'Name must be from 4 to 12 characters'
  }

  if ( (values.email.includes('@') && values.email.includes('.')  ) === false ) {
    errors.email = 'Email must be include @ and .'
  }

  if ( ! values.phone.match(/^(02)?01[0125][0-9]{8}$/ )) {
    errors.phone = 'Phone is Invalid'
  }

  if (values.password.length < 6 || values.password.length > 12 ) {
    errors.password = 'Password Must be from 6 to 12 characters'
  }

  if (values.rePassword.length !== values.password.length ) {
    errors.rePassword = 'rePassword Must be match with password'
  }





  return errors
}
 });


 
 
 
 return <>
  
  <div className="w-75 m-auto py-5">

    {succMsg ? <div className="alert alert-success">{succMsg}</div> : ""}

    {errMsg ? <div className="alert alert-danger">{errMsg}</div> : ""}
    
  <h2>Register Now:</h2>

  <form onSubmit={formikObj.handleSubmit}>

    <label htmlFor='name'>Name:</label>
    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.name} type='text' id='name' placeholder='name' className='form-control mb-3'></input>
    {formikObj.errors.name && formikObj.touched.name ? <div className='alert alert-danger'>{formikObj.errors.name}</div> : ''}

    <label htmlFor='email'>Email:</label>
    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.email} type='email' id='email' placeholder='email' className='form-control mb-3'></input>
    {formikObj.errors.email && formikObj.touched.email ? <div className='alert alert-danger'>{formikObj.errors.email}</div> : ''}


    <label htmlFor='phone'>phone:</label>
    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.phone} type='tel' id='phone' placeholder='phone' className='form-control mb-3'></input>
    {formikObj.errors.phone && formikObj.touched.phone ? <div className='alert alert-danger'>{formikObj.errors.phone}</div> : ''}


    <label htmlFor='password'>Password:</label>
    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.password} type='password' id='password' placeholder='password' className='form-control mb-3'></input>
    {formikObj.errors.password && formikObj.touched.password ? <div className='alert alert-danger'>{formikObj.errors.password}</div> : ''}



    <label htmlFor='rePassword'>rePassword:</label>
    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.rePassword} type='password' id='rePassword' placeholder='repassword' className='form-control mb-3'></input>
    {formikObj.errors.rePassword && formikObj.touched.rePassword ? <div className='alert alert-danger'>{formikObj.errors.rePassword}</div> : ''}

    <button type='submit' disabled = {formikObj.isValid === false || formikObj.dirty === false} className='btn btn-success mt-3'>
      

     {isLoading ? <InfinitySpin 
      width='60'
      color="#fff"
      />
      : "Register" }
     
      
      
      
      </button>

  </form>

  </div>
  </>
}
