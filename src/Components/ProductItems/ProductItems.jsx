import axios from 'axios'
import React, { useContext } from 'react'
import { ColorRing, FallingLines } from 'react-loader-spinner';
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { cartContext } from '../Context/cartContext';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

export default function ProductItems() {

  const {addProductToCart} = useContext(cartContext);

  const [IsWaiting, setIsWaiting] = useState(false)

  async function AddingProducts (id) {

    setIsWaiting(true);


  const res = await addProductToCart(id);

  if (res.status === "success" ) {
    
    toast.success(res.message, {
        duration: 1200,
        position: 'top-center',
      })
    } else{
      toast.error('There Is Error ')
    }

    setIsWaiting(false);
  }
 

const {id} = useParams();


function getAllProductsIt () {

    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
}

const {data, isLoading} = useQuery('productItems', getAllProductsIt);

console.log(data);

if(isLoading) {
    <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
}


    return <>
    
    <div className="container py-5 ">
        <div className="row align-items-center ">

            <div className="col-md-3">
                
                    <img className='w-100' src={data?.data.data.imageCover} alt='aaa' />
                
            </div>
            <div className="col-md-9">

                <div className="details">
                    <h1>{data?.data.data.title}</h1>
                    <p className='text-muted'>{data?.data.data.description}</p>
                    <p> Price:{data?.data.data.price} EGP</p>
                    <button  onClick={()=> AddingProducts(data?.data.data.id)} style={{backgroundColor: "#4FA74F"}}  className=' border-white w-100 p-2 rounded-3 text-white justify-content-center '>
                        
                        
    {IsWaiting? <FallingLines
    color="#fff"
    width="40"
    visible={true}
    ariaLabel='falling-lines-loading'
    /> :  "+ Add to Cart" }
   
                        
                        
                </button>
             </div>
    </div>

                
        </div>
    </div>
    
    </>
}
