import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { fortAwesome } from 'fontawesome';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';
import { CartContext } from '../../Context/CartContext';
import { UserContext } from '../../Context/UserContext';

export default function RecentProducts({Products}) {
   let { userLogin } = useContext(UserContext);

   let {addToCart} = useContext(CartContext)

   async function addProduct(productId){
      let response = await addToCart(productId)
      if(response.data.status === 'success'){
         console.log('add');
         
      }else{
         console.log('error');
         
      }
      
      console.log(response);
   }

  return <>
  <div className="row">
    {Products?.map((product) => (
      <div key={product.id} className="w-full md:w-1/3 lg:w-1/6 px-6 py-6">
        <div className="product text-center">
          <Link to={`/productDetails/${product.id}/${product.category.name}`}
          onClick={() => localStorage.setItem('userToken', userLogin)}
          >
            <img className="w-full rounded-full" src={product.imageCover} alt={product.title} />
            <span className="block font-light text-green-600">{product.category.name}</span>
            <h3 className="mb-4 text-lg font-normal text-gray-800 line-clamp-1">{product.title}</h3>
            <div className="justify-between items-center flex">
              <span>{product.price} EGP</span>
              <span>{product.ratingsAverage} <i className="fa fa-star text-green-600"></i></span>
            </div>
          </Link>
          <div className="flex justify-center gap-2 mt-4">
            <button onClick={()=> addProduct(product.id)}  className="btn w-9/12 bg-green-600">Add To <i className="fa-solid fa-cart-plus ms-2 hover:text-yellow-300 transition-all duration-500"></i></button>
            <button className="btn w-2/12"><i className="fa-solid fa-heart text-black text-2xl hover:text-red-700 transition-all duration-500"></i></button>
          </div>
        </div>
      </div>
    ))}
  </div>
</>

  
}



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