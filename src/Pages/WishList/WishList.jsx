import React, { useContext, useEffect, useState } from 'react';
import style from './WishList.module.css';
import { WishListContext } from './../../Context/WishListContext';

export default function WishList() {
  let { removeWish, getWish } = useContext(WishListContext);
  const [wishListDetails, setWishListDetails] = useState(null);

  async function awaitGetWish() {
    let response = await getWish();
    setWishListDetails(response.data);
  }

  async function awaitRemoveWish(productId) {
    let response = await removeWish(productId);
    if (response.status === 200) { 
      awaitGetWish();
    }
  }

  useEffect(() => {
    awaitGetWish();
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-20">
      <div className="flex justify-between mx-10 my-8">
        <h2 className='text-3xl font-bold'>Wishlist</h2>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-white dark:bg-gray-800 dark:text-gray-400">
          <tr className="w-full">
            <td className="text-left w-1/2 ps-10">
              <h3 className="text-2xl font-semibold">Total Items: {wishListDetails?.data.length || 0}</h3>
            </td>
          </tr>
        </thead>
        <tbody>
          {wishListDetails?.data.map((product) => (
            <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-4">
                <div className="flex items-center">
                  <img src={product.imageCover} className="mx-10 w-40 max-w-full max-h-full" alt={product.title} />
                  <div>
                    <h2 className='text-lg font-semibold'>{product.title}</h2>
                    <h2 className='text-lg font-semibold'>{product.price} EGP</h2>
                    <span onClick={() => awaitRemoveWish(product.id)} className='text-lg font-semibold text-red-500 cursor-pointer'>
                      <i className="fa-solid fa-trash"></i> Remove
                    </span>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
