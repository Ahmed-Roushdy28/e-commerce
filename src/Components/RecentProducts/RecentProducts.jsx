import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishListContext';

export default function RecentProducts({ Products }) {
  let { addToCart, setCart } = useContext(CartContext);
  let { addToWish, removeWish, getWish } = useContext(WishListContext);
  
  const [wishlist, setWishlist] = useState(new Set());

  // Fetch wishlist on mount and when wishlist changes
  useEffect(() => {
    async function fetchWishlist() {
      let response = await getWish();
      if (response?.data?.status === 'success') {
        setWishlist(new Set(response.data.data.map((item) => item._id)));
      }
    }
    fetchWishlist();
  }, []);

  async function addProduct(productId) {
    let response = await addToCart(productId);
    if (response?.data?.status === 'success') {
      setCart(response.data);
      toast.success('Your item added successfully', { duration: 1500 });
    } else {
      toast.error('Something went wrong');
    }
  }

  async function toggleWishlist(productId) {
    if (wishlist.has(productId)) {
      let response = await removeWish(productId);
      if (response?.data?.status === 'success') {
        toast.success('Item removed from wishlist!', { duration: 1500 });
      } else {
        toast.error('Could not remove from wishlist');
      }
    } else {
      let response = await addToWish(productId);
      if (response?.data?.status === 'success') {
        toast.success('Item added to wishlist!', { duration: 1500 });
      } else {
        toast.error('Could not add to wishlist');
      }
    }

    // Re-fetch updated wishlist
    let updatedWishlist = await getWish();
    if (updatedWishlist?.data?.status === 'success') {
      setWishlist(new Set(updatedWishlist.data.data.map((item) => item._id)));
    }
  }

  return (
    <div className="row">
      {Products?.map((product) => (
        <div key={product.id} className="w-full md:w-1/3 lg:w-1/6 px-6 py-6">
          <div className="product text-center">
            <Link to={`/productDetails/${product.id}/${product.category.name}`}>
              <img className="w-full rounded-full" src={product.imageCover} alt={product.title} />
              <span className="block font-light text-green-600">{product.category.name}</span>
              <h3 className="mb-4 text-lg font-normal text-gray-800 line-clamp-1">{product.title}</h3>
              <div className="justify-between items-center flex">
                <span>{product.price} EGP</span>
                <span>{product.ratingsAverage} <i className="fa fa-star text-green-600"></i></span>
              </div>
            </Link>
            <div className="flex justify-center gap-2 mt-4">
              <button onClick={() => addProduct(product.id)} className="btn w-9/12 bg-green-600">
                Add To <i className="fa-solid fa-cart-plus ms-2 hover:text-yellow-300 transition-all duration-500"></i>
              </button>
              <button onClick={() => toggleWishlist(product._id)} className="btn w-2/12">
                <i className={`fa-solid fa-heart text-2xl transition-all duration-500 ${wishlist.has(product._id) ? 'text-red-700' : 'text-black'}`}></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
