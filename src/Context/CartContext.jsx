import axios from "axios";
import { createContext } from "react";

export let CartContext = createContext() ;

export default function CartContextProvider(props) {
   let headers = {
      token:localStorage.getItem('userToken')
   }
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
   async function addToCart(productId) {
      return await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
         productId:productId
      } , {
         headers:headers
      })
      .then((response)=> response)
      .catch((err)=> err)
   }
return <CartContext.Provider value={{addToCart , getCart , removeCart}} >
   {props.children}

</CartContext.Provider>
}