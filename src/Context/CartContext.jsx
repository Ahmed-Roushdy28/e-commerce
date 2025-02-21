import axios from "axios";
import { createContext } from "react";

export let CartContext = createContext() ;

export default function CartContextProvider(props) {
   let headers = {
      token:localStorage.getItem('userToken')
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
return <CartContext.Provider value={{addToCart}} >
   {props.children}

</CartContext.Provider>
}