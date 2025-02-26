import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  const [cart, setCart] = useState(null);

  async function getCart() {
    try {
      let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers });
      setCart(response.data);
      return response;
    } catch (error) {
      console.error("Error fetching cart:", error);
      return error;
    }
  }

  async function removeCart(productId = null) {
   try {
     let response;
     if (productId) {

       response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers });
     } else {

       response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers });
     }
 

     let updatedCart = await getCart();
     

     setCart(updatedCart.data || { data: { products: [] } });
 
     return response;
   } catch (error) {
     console.error("Error removing cart item:", error);
     return error;
   }
 }
 

  async function updateCart(productId, count) {
    try {
      let response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers }
      );
      setCart(response.data);
      return response;
    } catch (error) {
      console.error("Error updating cart:", error);
      return error;
    }
  }

  async function addToCart(productId) {
    try {
      let response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        { headers }
      );
      setCart(response.data);
      return response;
    } catch (err) {
      console.error("Error adding to cart:", err);
      return err;
    }
  }

  async function checkOut(cartId, url, formValue) {
    try {
      let response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        { shippingAddress: formValue },
        { headers }
      );
      return response;
    } catch (err) {
      console.error("Error in checkout:", err);
      return err;
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart, checkOut, addToCart, getCart, removeCart, updateCart }}>
      {props.children}
    </CartContext.Provider>
  );
}
