import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState(null);

  const headers = {
    token: localStorage.getItem("userToken"),
  };

  async function getCart() {
    try {
      let response = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", { headers });
      setCart(response.data);
      return response;
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart(null);
      return error;
    }
  }

  async function removeCart(productId = null) {
    try {
      let response = await axios.delete(
        productId
          ? `https://ecommerce.routemisr.com/api/v1/cart/${productId}`
          : `https://ecommerce.routemisr.com/api/v1/cart`,
        { headers }
      );
      await getCart();
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
      await getCart();
      return response;
    } catch (error) {
      console.error("Error updating cart:", error);
      return error;
    }
  }

  async function addToCart(productId) {
    try {
      let response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers }
      );
      await getCart();
      return response;
    } catch (error) {
      console.error("Error adding to cart:", error);
      return error;
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
    } catch (error) {
      console.error("Error in checkout:", error);
      return error;
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart, checkOut, addToCart, getCart, removeCart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
}
