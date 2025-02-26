import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  let { getCart, removeCart, updateCart } = useContext(CartContext);
  const [cartDetails, setCartDetails] = useState(null);

  async function awaitGetCart() {
    let response = await getCart();
    setCartDetails(response.data);
  }

  async function updateQuantity(productId, count) {
    let response = await updateCart(productId, count);
    setCartDetails(response.data);
  }

  async function awaitRemoveCart(productId) {
    let response = await removeCart(productId);
    setCartDetails(response.data);
  }

  async function handleClearCart() {
    await removeCart();
    setCartDetails({ data: { products: [] } });
  }

  useEffect(() => {
    awaitGetCart();
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg xl:mx-20 md:mx-10 sm:mx-5">
      <div className="flex justify-between mx-10 my-8">
        <h2 className="text-3xl font-bold">Cart Shop</h2>

        <Link to={'/CheckOut'}>
          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Check out
          </button>
        </Link>
      </div>

      <div className="flex justify-between px-10 py-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h3 className="text-2xl font-semibold">
          Total Price: {cartDetails?.data.products.reduce((acc, product) => acc + product.price * product.count, 0)} EGP
        </h3>
        <h3 className="text-2xl font-semibold">
          Items Count: {cartDetails?.data.products.reduce((acc, product) => acc + product.count, 0)}
        </h3>
      </div>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tbody>
          {cartDetails?.data.products.map((product) => (
            <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-4">
                <div className="flex items-center">
                  <img src={product.product.imageCover} className="mx-10 w-40 max-w-full max-h-full md:mx-2" alt={product.product.title} />
                  <div>
                    <h2 className="text-lg font-semibold">{product.product.title}</h2>
                    <h2 className="text-lg font-semibold">{product.price} EGP</h2>
                    <span onClick={() => awaitRemoveCart(product.product.id)} className="text-lg font-semibold text-red-500 cursor-pointer">
                      <i className="fa-solid fa-trash"></i> Remove
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col items-end">
                  <div className="flex items-center">
                    <button onClick={() => updateQuantity(product.product.id, product.count - 1)} disabled={product.count === 1}
                      className={`inline-flex items-center justify-center h-6 w-10 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ${product.count === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                      type="button">
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                      </svg>
                    </button>
                    <div className="mx-2">
                      <h3 className="text-lg">{product.count}</h3>
                    </div>
                    <button onClick={() => updateQuantity(product.product.id, product.count + 1)}
                      className="inline-flex items-center justify-center h-6 w-10 text-lg font-medium text-gray-500 bg-white border border-gray-300 rounded-lg focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button">
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {cartDetails?.data.products.length > 0 && (
        <div className="flex justify-center p-4">
          <button onClick={handleClearCart} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-lg px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}
