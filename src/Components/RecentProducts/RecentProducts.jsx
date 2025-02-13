import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { fortAwesome } from 'fontawesome';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';

export default function RecentProducts({Products}) {

   // const [recentProducts , setRecentProducts] = useState([])
   // function getRecentProducts(){
   //    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
   //    .then(({data})=>{
   //       setRecentProducts(data.data)
         
   //    })
   //    .catch((error)=>{})
   // }

   // useEffect(() => {
   //   getRecentProducts()
   
   // }, [])
   
  return <>
  <div className="row">
   {Products?.map((product)=> <div key={product.id} className="w-full md:w-1/3 lg:w-1/6 px-6 py-6 border-0 md:border-4 border-transparent hover:border-green-600 transition-all duration-300 rounded-full overflow-visible md:overflow-hidden">
   <Link to={`/productDetails/${product.id}/${product.category.name}`}>
   <div className="product text-center ">
      <img className='w-full rounded-full' src={product.imageCover} alt={product.title} />
      <span className='block font-light text-green-600'>{product.category.name}</span>
      <h3 className='mb-4 text-lg font-normal text-gray-800 line-clamp-1 '>{product.title}</h3>
      <div className="justify-between items-center flex">
         <span>{product.price} EGP</span>
         <span>{product.ratingsAverage} <i className='fa fa-star text-green-600'></i></span>
      </div>
         <button className='btn'>add to cart</button>
   </div>
   </Link>
   </div> )}
   
  </div>
  </>
  
}
