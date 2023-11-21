import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from 'react-query';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';

export default function CategorySlider() {
  
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 2,
        arrows: false
      };
   

      function getCategorySlider () {
         return  axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      }


     const {isLoading, data} =  useQuery('CategorySlider', getCategorySlider, {
        refetchOnMount:false
     } )


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
  
  <div className='my-5'>
        <Slider {...settings}>

        {data?.data.data.map(function(category, idx) {return <div key={idx}> 
            <img style={{width:"100%" , height:"250px" }} src={category.image } alt='product'></img>
            <h6 className='mt-2'>{category.name}</h6>
        </div>
        })}
        
        
        </Slider>
    </div>

 
  </>
}
