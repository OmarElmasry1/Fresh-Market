import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Watch } from 'react-loader-spinner';


export default function AllOrders() {
  
  const [UserOrders, setUserOrders] = useState(null);
  
   useEffect(()=> {
    
    const res =  jwtDecode(localStorage.getItem("tkn"));

   getUserOrders(res.id);
   
   
}, [] )


      async  function getUserOrders(id) {

            try {
                
             const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)

             setUserOrders(data);

            } catch (error) {
                console.log("error", error);
            }
        }
  

        if (UserOrders === null ) {

            return <Watch
            height="80"
            width="80"
            radius="48"
            color="#4fa94d"
            ariaLabel="watch-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        }
  
  return <>
  
  <div className="container p-5">

    <div className="row ">


            {UserOrders.map(function(order, idx){
                
                return <div key={idx} className="col-md-6 p-5">

                <div className="bg-light rounded-4 ">

                    <div className="container">

                        <div className="row gy-4">

                             {order.cartItems?.map(function(item, index){

                                return <div key={index} className="col-sm-6">
                                
                                            <div  className='bg-success text-white my-1 p-3 ' > 

                                                    <img src={item.product.imageCover} className='w-100' alt={item.product.title}></img>

                                                    <h6>{item.product.title.split(" ").slice(0,2).join(' ')}</h6>
                                                    <p>Count: {item.count}</p>
                                                    <p>Price: {item.price}</p>

                                            </div>
                                        </div>

                            })}

                        </div>
                    </div>

                <p className='fs-2 text text-success'>The Order with phone {order.shippingAddress.phone} and details {order.shippingAddress.details} deliverd to {order.shippingAddress.city} </p>
                
                <h5>Payment Method: {order.paymentMethodType}</h5>
                <h5>Total Price: {order.totalOrderPrice}</h5>
                
                
                
                </div>
    
                
            </div>
            })}
        
    </div>
  </div>
  
  </>
}
