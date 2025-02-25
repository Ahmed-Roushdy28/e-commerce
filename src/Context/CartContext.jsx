import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext() ;

export default function CartContextProvider(props) {
   let headers = {
      token:localStorage.getItem('userToken')
   }
   const [cart, setCart] = useState(null)
   async function getCart() {
      return await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
         headers:headers
      }).then((response)=>response)
      .catch((error)=>error)
   }
   async function removeCart(productId){
      return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,{
         headers:headers
      })
      .then((response)=>response)
      .catch((error)=>error)
   }
   async function updateCart(productId , count){
      return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,{
         count:count
      },{
         headers:headers
      })
      .then((response)=>response)
      .catch((error)=>error)
   }
   async function addToCart(productId) {
      return await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
         productId:productId
      } , {
         headers:headers
      })
      .then((response)=> response)
      .catch((err)=> err)
   }
   async function checkOut(cartId , url , formValue ) {
      return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, {
         shippingAddress: formValue
      } , {
         headers:headers
      })
      .then((response)=> response)
      .catch((err)=> err)
   }
   async function getCartItems(){
      let response = await getCart();
      setCart(response.data)
   }
   useEffect(() => {
      getCartItems()
   }, [])
   
return <CartContext.Provider value={{cart , setCart , checkOut , addToCart , getCart , removeCart , updateCart}} >
   {props.children}

</CartContext.Provider>
}