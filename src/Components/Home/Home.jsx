import axios from 'axios';
import React, { useContext } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useQuery } from "react-query";
import HomeSlider from '../HomeSlider/HomeSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Link } from 'react-router-dom';
import { cartContext } from '../Context/cartContext';
import { toast } from  'react-hot-toast';







 export default function Home() {


  const {addProductToCart} = useContext(cartContext);

  
  async function addProducts(id) {

  const res =  await addProductToCart(id);
  
  
      if (res.status === "success") {
        toast.success(res.message, {
          duration: 1200,
          position: 'top-center',
        })
      } else{
        toast.error('There Is Error ')
      }
  }


function getAllProducts () {

   return  axios.get('https://ecommerce.routemisr.com/api/v1/products');
}


const { isLoading, data, refetch} = useQuery("allProducts", getAllProducts, {
  // refetchInterval : 3000,
  // cacheTime : 24 * 60 * 60 * 1000,
  // refetchOnMount: false,
  // enabled: false,
} );






  // const [allProducts, setAllProducts]  = useState()
  
  // async function getAllProducts () {
  
  //   const{data} =  await axios.get('https://ecommerce.routemisr.com/api/v1/products');
    
  //     setAllProducts(data.data);
  // }

  //  useEffect(function() {

  //   getAllProducts();

    
  //  },[]);

 if (isLoading) {

  return   <div className="vh-100 d-flex justify-content-center align-items-center">
    
  <ThreeDots 
height="80" 
width="80" 
radius="9"
color="#4fa94d" 
ariaLabel="three-dots-loading"
wrapperStyle={{}}
wrapperClassName=""
visible={true}
/>
   
   </div>  
 }




  
  return <>
  
  
    <div className="container py-5">

      <div className="row gx-0 mb-5">
        <div className="col-sm-9"><HomeSlider /></div>
        <div className="col-sm-3">
          <img style={{width:"100%" , height:"225px" }} src={require('../../Images/grocery-banner-2.jpeg')} alt='product'></img>
          <img style={{width:"100%" , height:"225px" }} src={require('../../Images/grocery-banner.png')} alt='product'></img>
        </div>

      </div>

      
        <CategorySlider />
      

<div className="row gy-4">

{data?.data.data.map( function(product, idx) {return <div  key={idx}  className="col-md-3">

 
  <div className="product-desc">
  <Link to={`/productItems/${product.id}`}>
   
    <img className='w-100 p-2' src={product.imageCover} alt='product'></img>
    <h6 className='main-color'>{product.category.name}</h6>
    <h5 >{product.title.split(' ').slice(0, 2).join('')}</h5>
    <div className="justify-content-between d-flex align-items-center">
    <p>{product.price} EGP</p>
    <p> <i className="fa-solid fa-star main-color"></i> {product.ratingsAverage}</p>
    </div>
   
    </Link>

    <button  onClick={()=> addProducts(product.id)} style={{backgroundColor: "#4FA74F"}}  className=' border-white w-100  p-1 rounded-3 text-white justify-content-center '>+ Add to Cart</button>

  </div>
  
 


</div> })}
  
</div>
</div> 

  

 
  
  </>
}
