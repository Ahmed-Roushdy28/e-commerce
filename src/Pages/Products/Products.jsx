import React from 'react'
import style from './Products.module.css'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { PacmanLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import useProducts from '../../Hooks/UseProducts';

export default function Products() {
  let {data , error , isError , isLoading , isFetching} = useProducts()
     if(isLoading){
      return <div className="flex items-center justify-center h-screen">
        <PacmanLoader color='green'/>
      </div>
     }
     if(isError){
      return <h3 className='flex justify-center items-center'>{error}</h3>
     }
  return (
   <div className="row">
  {data?.data.data.map((product) => (
    <div
      key={product.id}
      className="w-full md:w-1/3 lg:w-1/4 px-6 py-6 border-0 md:border-2 border-transparent hover:border-green-500 transition-all duration-300 overflow-visible md:overflow-hidden"
    >
      <div className="product text-center">
        <Link to={`/productDetails/${product.id}/${product.category.name}`}>
          <img
            className="w-full rounded-full"
            src={product.imageCover}
            alt={product.title}
          />
          <span className="block font-light text-green-600">
            {product.category.name}
          </span>
          <h3 className="mb-4 text-lg font-normal text-gray-800 line-clamp-1">
            {product.title}
          </h3>
          <div className="justify-between items-center flex">
            <span>{product.price} EGP</span>
            <span>
              {product.ratingsAverage}{" "}
              <i className="fa fa-star text-green-600"></i>
            </span>
          </div>
        </Link>
        {/* Buttons are inside .product but outside Link */}
        <div className="flex justify-between mt-4">
          <button className="btn w-9/12 bg-green-600">
            Add To
            <i className="fa-solid fa-cart-plus ms-2 hover:text-yellow-300 transition-all duration-500"></i>
          </button>
          <button className="btn w-2/12">
            <i className="fa-solid fa-heart text-black text-2xl hover:text-red-700 transition-all duration-500"></i>
          </button>
        </div>
      </div>
    </div>
  ))}
</div>


  )
}