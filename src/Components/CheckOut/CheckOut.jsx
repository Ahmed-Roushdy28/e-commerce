import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { CartContext } from "../../Context/CartContext";

export default function Checkout() {
  const { checkOut, cart } = useContext(CartContext);
  const cartId = cart?.data?._id;

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: () => {
      if (cartId) {
        handleCheckout(cartId, "http://localhost:5173");
      } else {
        console.error("Cart ID is missing");
      }
    },
  });

  async function handleCheckout(cartId, url) {
    try {
      const { data } = await checkOut(cartId, url, formik.values);
      if (data?.status === "success") {
        window.location.href = data.session.url;
      } else {
        console.error("Checkout failed:", data);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  }

  return (
    <div className="mx-auto py-6 max-w-xl">
      <h1 className="text-3xl mb-5 font-bold text-green-700">CheckOut Now</h1>
      <form onSubmit={formik.handleSubmit} className="max-w-xl">
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.details}
            type="text"
            name="details"
            id="details"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="details"
            className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-green-600"
          >
            Details
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.phone}
            type="tel"
            name="phone"
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="phone"
            className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-green-600"
          >
            Phone
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.city}
            type="text"
            name="city"
            id="city"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="city"
            className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-green-600"
          >
            City
          </label>
        </div>

        <div className="flex w-full">
          <button
            type="submit"
            className="text-white w-full text-lg font-bold bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg px-5 py-3 text-center"
          >
            Pay Now
          </button>
        </div>
      </form>
    </div>
  );
}
