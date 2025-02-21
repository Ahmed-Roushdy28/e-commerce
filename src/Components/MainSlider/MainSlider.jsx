import React from 'react'
import style from './MainSlider.module.css'
import img1 from '../../assets/slider-image-1.jpeg'
import img2 from '../../assets/slider-image-2.jpeg'
import img3 from '../../assets/slider-image-3.jpeg'
import Slider from "react-slick";
export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToScroll: 1,
    arrows : false

  };
  return (
    <div className='row w-1/2 mx-auto'>
      <div className=" overflow-hidden flex">
      <div className="w-3/4">
      <Slider {...settings}>
      <img src={img1} className='w-full h-[300px]' alt="" />
      <img src={img2} className='w-full h-[300px]' alt="" />
      <img src={img3} className='w-full h-[300px]' alt="" />
      
     </Slider>
      </div>
      <div className="w-1/4">
      <img src={img1} className='w-full h-[100px]' alt="" />
      <img src={img2} className='w-full h-[100px]' alt="" />
      <img src={img3} className='w-full h-[100px]' alt="" />
      </div>
      </div>
    </div>
  )
}
