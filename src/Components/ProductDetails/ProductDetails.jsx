import axios from 'axios';
import { h2 } from 'fontawesome';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Slider from "react-slick";


export default function ProductDetails() {
let {id , category} = useParams()

const [productDetails, setProductDetails] = useState(null)
const [relatedProducts, setRelatedProducts] = useState([])
const [unRelatedProducts, setUnRelatedProducts] = useState([])
var settings = {
   dots: true ,
   infinite: productDetails?.images?.length > 2,
   speed: 500,
   slidesToShow: 1,
   slidesToScroll: 1,
 };
function getProductDetails(id){
   axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
   .then(({data}) => {
      setProductDetails(data.data)
   })
   .catch(({})=>{})
}
function getRelatedProducts(category){
   axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
   .then(({data}) => {
      let allProducts = data.data;
      let related = allProducts.filter((product)=> product.category.name == category)
      setRelatedProducts(related)
   })
   .catch(({})=>{})
}
function getUnRelatedProducts(category){
   axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
   .then(({data}) => {
      let allProducts = data.data;
      let unRelated = allProducts.filter((product)=> product.category.name !== category)
      setUnRelatedProducts(unRelated)
   })
   .catch(({})=>{})
}
useEffect(() => {
  getProductDetails(id)
  getRelatedProducts(category)
  getUnRelatedProducts(category)
}, [id , category])

   return (
    <>
    <div className="row">
  <div className="w-1/4">
    <Slider {...settings}>
      {productDetails?.images.map((src, index) => (
        <img key={index} className="w-full" src={src} alt={productDetails?.title} />
      ))}
    </Slider>
  </div>

  <div className="w-3/4 p-6">
    <h1 className="text-lg font-normal text-gray-950">{productDetails?.title}</h1>
    <p className="text-gray-600 mt-4">{productDetails?.description}</p>
    
    <div className="justify-between items-center flex">
      <span>{productDetails?.price} EGP</span>
      <span>{productDetails?.ratingsAverage} <i className="fa fa-star text-green-600"></i></span>
    </div>

    <div className="flex justify-between mt-6">
      <button className="btn w-9/12 bg-green-600">
        Add To <i className="fa-solid fa-cart-plus ms-2 hover:text-yellow-300 transition-all duration-500"></i>
      </button>
      <button className="btn w-2/12">
        <i className="fa-solid fa-heart hover:text-red-700 transition-all duration-500"></i>
      </button>
    </div>
  </div>
</div>



      <h2 className='p-5 cursor-default bg-gray-900 w-fit text-white rounded-full translate-y-7 translate-x-3 hover:bg-green-500 transition:bg duration-300'>Related Products</h2>
      <div className="row bg-gray-300 rounded-lg">
  {relatedProducts.map((product) => (
    <div className="xl:w-1/6 lg:w-1/4 md:w-1/3 sm:w-full px-4 py-6" key={product.id}>
      <div className="product">
        <Link to={`/productDetails/${product.id}/${product.category.name}`}>
          <img className="w-full rounded-full" src={product.imageCover} alt={product.title} />
          <strong className="block text-green-600">{product.category.name}</strong>
          <h3 className="mb-4 text-lg line-clamp-1 text-green-500 font-semibold">{product.title}</h3>
          <div className="justify-between items-center flex">
            <span>{product.price} EGP</span>
            <span>{product.ratingsAverage} <i className="fa fa-star text-green-600"></i></span>
          </div>
        </Link>

        <div className="flex justify-between mt-4">
          <button className="btn w-9/12 bg-green-600">
            Add To <i className="fa-solid fa-cart-plus ms-2 hover:text-yellow-300 transition-all duration-500"></i>
          </button>
          <button className="btn w-2/12">
            <i className="fa-solid fa-heart text-black text-2xl hover:text-red-700 transition-all duration-500"></i>
          </button>
        </div>
      </div>
    </div>
  ))}
</div>


    <h2 className='p-5 cursor-default bg-gray-900 w-fit text-white rounded-full translate-y-7 translate-x-3 hover:bg-green-500 transition:bg duration-300'>UnRelated Products</h2>
    <div className="row bg-gray-300 rounded-lg">
      {unRelatedProducts.map((product)=> (
         <div className="xl:w-1/6 lg:w-1/4 md:w-1/3 sm:w-full" key={product._id}>
            <Link to={`/productDetails/${product.id}/${product.category.name}`}>
         <div className="product py-4">
            <img className='rounded-full px-4' src={product.imageCover} alt={product.title} />
            <h2 className='mb-4 text-lg line-clamp-1  text-green-500 font-semibold '>{product.title}</h2>
         </div>
   </Link>
         </div>
      ))}
    </div>
    </>
  )
}
