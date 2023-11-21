import React, { useContext } from 'react'
import { cartContext } from './../Context/cartContext';
import { ThreeDots } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


export default function Cart() {
  
 const {CartProducts, totalCartPrice, numOfCartItems,  deleteProduct, updateCount, clearCart} = useContext(cartContext);

 

if (CartProducts === null) {
 return   <ThreeDots 
height="80" 
width="80" 
radius="9"
color="#4fa94d" 
ariaLabel="three-dots-loading"
wrapperStyle={{}}
wrapperClassName=""
visible={true}
/>
}


if (CartProducts.length === 0) {
    return <>
    
    <h1 className=' d-flex align-items-centre justify-content-centre'>Empty Cart</h1>
    
    </>
}


async function deletePdt (id) {
   const res =  await deleteProduct (id);

   if (res.status === "success" ) {

    toast.success ('Product Removed Successfully');
   } else{

    toast.error("Error in deleting product");

   }

 }

 async function upadtaElementCount (id, count) {

    updateCount(id , count);

    

 }


 async function clearData() {
    await  clearCart();
   }
  
  return <>
  
  <div style={{backgroundColor: "#eee"}} className="container py-5">

  <h1>Shop Cart</h1>
  <h5>Total Price: {totalCartPrice} </h5>
  <h6>Total Items: {numOfCartItems} </h6>

  <div className="d-flex justify-content-between align-items-center">

  <button onClick={ clearData } className='btn btn-danger'>Clear Cart</button>
  <Link to={"/order"}  className='btn btn-primary text-white border-white'>Confirm</Link>
  

  </div>

  {CartProducts.map(function (product, idx) {
    
    console.log(product);
    return <div key={idx} className="row my-2 border-bottom border-3 p-2 align-items-center">

<div className="col-sm-1">
    <img className='w-100' src={product.product.imageCover} alt='product'></img>
</div>
<div className="col-sm-9">
    <h2 className='h6'>Title: {product.product.title}</h2>
    <h5 className='h6'>Price: {product.price}</h5>
    <button onClick={()=> deletePdt(product.product.id)} className='btn btn-outline-danger'>Remove</button>
</div>
<div className="col-sm-2">
    <div className="d-flex align-items-center ">
        <button onClick={()=> upadtaElementCount(product.product.id, product.count + 1)} className='btn btn-outline-success'>+</button>
        <span className='mx-2'>{product.count}</span>
        <button onClick={()=> upadtaElementCount(product.product.id, product.count - 1)} className='btn btn-outline-success'>-</button>
    </div>
</div>
</div> })}
  
  


  </div>

  
  
  </>
}
