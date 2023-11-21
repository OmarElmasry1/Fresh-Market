import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";


export const cartContext = createContext();



export function CartContextProvider({children}) {


  
const [CartProducts, setCartProducts] = useState(null);
const [totalCartPrice, setTotalCartPrice] = useState(0);
const [numOfCartItems, setNumOfCartItems] = useState(0);
const [cartId, setCartId] = useState(null);

  async function addProductToCart (productId) {

       try{
       const {data} =  await axios.post("https://ecommerce.routemisr.com/api/v1/cart", {
            "productId" : productId
        }, {
            headers: {token: localStorage.getItem('tkn')}
        })

          getUserProduct();
        // setCartProducts(data.data.products);
        // setNumOfCartItems(data.numOfCartItems);
        // setTotalCartPrice(data.data.totalCartPrice);


        return data;
       
      } 


       catch (e) {
        console.log('error', e)
       }
       
  }

  async function getUserProduct() {

    try {
 
    const {data}  = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: {
        token : localStorage.getItem('tkn')
      }
    });
    
  
   setCartProducts(data.data.products);
   setNumOfCartItems(data.numOfCartItems);
   setTotalCartPrice(data.data.totalCartPrice);
   setCartId(data.data._id);

} catch (err) {
  console.log("error", err)
}

  }

  async function deleteProduct(productId) {

    try {
      
    const {data} =  await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {

    headers: {token: localStorage.getItem('tkn')}
    })


    setCartProducts(data.data.products);
    setNumOfCartItems(data.numOfCartItems);
    setTotalCartPrice(data.data.totalCartPrice);
    

      return data;

    } catch (error) {
      console.log("error", error)
    }
  }

  async function clearCart () {

    try {
      
      await axios.delete("https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: {token : localStorage.getItem("tkn")}
      })
  

      setCartProducts([]);
      setNumOfCartItems(0);
      setTotalCartPrice(0);
      
    } catch (error) {
      console.log("error", error)
    }
  
  }



  async function updateCount (productId, count) {

    try {
      
    const {data}  =  await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        "count" : count
      }, {
        headers : {token : localStorage.getItem("tkn")}
      })

      setCartProducts(data.data.products);
      setNumOfCartItems(data.numOfCartItems);
      setTotalCartPrice(data.data.totalCartPrice);


      return data;

    } catch (error) {

      console.log("error", error);
      
    }

  }


 
useEffect(function () {
      getUserProduct();
}, []);

    return <cartContext.Provider value={{getUserProduct 
    ,addProductToCart 
    , CartProducts
    , totalCartPrice
    , numOfCartItems
    ,  deleteProduct
    ,updateCount
    ,clearCart
    ,cartId
    ,setCartProducts
    ,setNumOfCartItems
    ,setTotalCartPrice}}>
    
    {children}
    </cartContext.Provider>
}