import React, { useEffect, useState } from 'react'
import style from './CategorySlider.module.css'
import Slider from "react-slick";
import axios from 'axios';

export default function CategorySlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 8,
    slidesToScroll: 1,
    swipeToSlide: true, // Allows free scrolling
    touchThreshold: 10,
    autoplay:true ,
    autoplaySpeed:0 ,
    cssEase: "linear"
  };
  const [categories , setCategories] = useState([])
  function getCategories(){
     axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
     .then(({data})=>{
      setCategories(data.data)
        
     })
     .catch((error)=>{})
     
  }
  useEffect(() => {
    getCategories()
  
  }, [])
  return (
    <div className=" py-3 font-semibold text-green-700 text-2xl ">
      <h2 className='pb-3 font-bold'>Shop Popular Categories</h2>
      <Slider {...settings}>
     {categories.map((category)=> <div key={category._id} >
      <img  className='category-img w-full' src={category.image} alt={category.name} />
      <h3>{category.name}</h3>
     </div>)}
     </Slider>
    </div>
  )
}
