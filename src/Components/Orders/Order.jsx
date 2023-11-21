import axios from 'axios';
import React, { useContext } from 'react'
import { cartContext } from '../Context/cartContext';
import toast from 'react-hot-toast';

export default function Order() {
  
 const {cartId, setCartProducts, setNumOfCartItems, setTotalCartPrice } = useContext(cartContext);

 

 
 async function confirmPayment () {

      const phoneValue =  document.querySelector('#phone').value;
      const cityeValue =  document.querySelector('#city').value;
      const detailsValue =  document.querySelector('#details').value;

        const shippingAddress = {
            "shippingAddress":{
                "details": detailsValue,
                "phone": phoneValue,
                "city": cityeValue
            }
                
        }
        
    

        try {
            
          const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,shippingAddress,{
            headers : {token : localStorage.getItem('tkn')}

           });

           console.log(data);

           if(data.status === "success") {
            toast.success('Order added successfully');
            setCartProducts([]);
            setNumOfCartItems(0);
            setTotalCartPrice(0);

           } else {
            toast.error('order is failed');
           }

        } catch (error) {
            console.log("error", error);
        }
    }
  
    async function  confirmOnlinePayment() {

      const phoneValue =  document.querySelector('#phone').value;
      const cityeValue =  document.querySelector('#city').value;
      const detailsValue =  document.querySelector('#details').value;

        const shippingAddress = {
            "shippingAddress":{
                "details": detailsValue,
                "phone": phoneValue,
                "city": cityeValue
            }
                
        }
        
      

        try {
          
          const{data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,shippingAddress, {
          
          headers: {token : localStorage.getItem('tkn')},
    
          params: {url: "http://localhost:3000"}
          
          });

          window.open(data.session.url, "_blank")

          if(data.status === "success") {

            setCartProducts([]);
            setNumOfCartItems(0);
            setTotalCartPrice(0);
          }

        } catch (error) {
          console.log("error", error);
        }

     
    }
  
  
  return <>
  
  <div className="container py-5">


  <form>

<label htmlFor='phone'>Phone</label>
<input type='tel' id='phone' className=' mb-3 form-control'></input>

<label htmlFor='city'>City</label>
<input type='text' id='city' className=' mb-3 form-control'></input>

<label htmlFor='details'>Details</label>
<textarea type='text' id='details' className=' mb-3 form-control'></textarea>

<div className="d-flex">

<button  onClick={ confirmPayment} className='btn btn-primary m-2' type='button' >Confirm Cash</button>

<button  onClick={ confirmOnlinePayment} className='btn btn-primary m-2' type='button' >Confirm Online</button>

</div>

</form>


  </div>
  
  </>
}
