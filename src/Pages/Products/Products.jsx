import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import useProducts from '../../Hooks/UseProducts';
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishListContext';

export default function Products() {
  let { data, error, isError, isLoading } = useProducts();
  let { addToCart, setCart } = useContext(CartContext);
  let { addToWish, removeWish, getWish } = useContext(WishListContext);

  const [wishlist, setWishlist] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchWishlist() {
      let response = await getWish();
      if (response?.data?.status === 'success') {
        setWishlist(new Set(response.data.data.map((item) => item._id)));
      }
    }
    fetchWishlist();
  }, [getWish]);

  async function addProduct(productId) {
    let response = await addToCart(productId);
    if (response?.data?.status === 'success') {
      toast.success('Your item added successfully', { duration: 1500 });
      setCart(response.data);
    } else {
      toast.error('Something went wrong');
    }
  }

  async function toggleWishlist(productId) {
    if (wishlist.has(productId)) {
      let response = await removeWish(productId);
      if (response?.data?.status === 'success') {
        toast.success('Item removed from wishlist!', { duration: 1500 });
        setWishlist((prev) => {
          const updated = new Set(prev);
          updated.delete(productId);
          return updated;
        });
      } else {
        toast.error('Could not remove from wishlist');
      }
    } else {
      let response = await addToWish(productId);
      if (response?.data?.status === 'success') {
        toast.success('Item added to wishlist!', { duration: 1500 });
        setWishlist((prev) => {
          const updated = new Set(prev);
          updated.add(productId);
          return updated;
        });
      } else {
        toast.error('Could not add to wishlist');
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <PacmanLoader color="green" />
      </div>
    );
  }

  if (isError) {
    return <h3 className="flex justify-center items-center">{error}</h3>;
  }

  const filteredProducts = data?.data.data.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className=''>
      <div className="flex justify-center my-4">
      <input
        type="text"
        placeholder="Search products..."
        className="w-1/2  p-2 mb-2 mx-auto border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      </div>

      <div className="row">
        {filteredProducts?.map((product) => (
          <div
            key={product.id}
            className="w-full md:w-1/3 lg:w-1/4 px-6 py-6 border-0 md:border-2 border-transparent hover:border-green-500 transition-all duration-300 overflow-visible md:overflow-hidden"
          >
            <div className="product text-center">
              <Link to={`/productDetails/${product.id}/${product.category.name}`}>
                <img className="w-full rounded-full" src={product.imageCover} alt={product.title} />
                <span className="block font-light text-green-600">{product.category.name}</span>
                <h3 className="mb-4 text-lg font-normal text-gray-800 line-clamp-1">{product.title}</h3>
                <div className="justify-between items-center flex">
                  <span>{product.price} EGP</span>
                  <span>
                    {product.ratingsAverage} <i className="fa fa-star text-green-600"></i>
                  </span>
                </div>
              </Link>
              <div className="flex justify-between mt-4">
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
    </div>
  );
}
