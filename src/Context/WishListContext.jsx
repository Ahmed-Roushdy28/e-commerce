import axios from 'axios';
import React, { createContext } from 'react'

export let WishListContext = createContext();

export default function WishListContextProvider(props) {
  let headers = {
    token:localStorage.getItem('userToken')
 }
 async function getWish() {
  return await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
    headers:headers
 }).then((response)=>response)
 .catch((error)=>error)
 }
 async function removeWish(productId){
  return await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}` ,{
     headers:headers
  })
  .then((response)=>response)
  .catch((error)=>error)
}
async function addToWish(productId) {
  try {
     let response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, 
        {},  // Empty body
        { headers }
     );
     return response.data;  
  } catch (err) {
     console.error("Wishlist Error:", err.response?.data || err.message);
     return { status: "error", message: "Failed to add to wishlist" };
  }
}
 return <WishListContext.Provider value={{getWish , removeWish , addToWish}}>
  {props.children}
 </WishListContext.Provider>
}
