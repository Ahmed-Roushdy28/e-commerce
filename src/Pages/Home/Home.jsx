import React, { useContext } from 'react'
import style from './Home.module.css'
import RecentProducts from '../../Components/RecentProducts/RecentProducts';
import CategorySlider from '../../Components/CategorySlider/CategorySlider';
import MainSlider from '../../Components/MainSlider/MainSlider';
import { useQuery } from '@tanstack/react-query';
import { CircleLoader, ClimbingBoxLoader, PacmanLoader } from 'react-spinners';
import Products from './../Products/Products';
import axios from 'axios';
import { ReactQueryDevtools } from './../../../node_modules/@tanstack/react-query-devtools/src/production';


export default function Home() {
function getRecent(){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
}
 let {data , error , isError , isLoading , isFetching} = useQuery({queryKey:['recentProducts'],
      queryFn:getRecent,
      staleTime:3000,
      retry:6,
      retryDelay:3000,
      refetchInterval:10000,

   })
   if(isLoading){
    return <div className="flex items-center justify-center h-screen">
      <PacmanLoader color='green'/>
    </div>
   }
   if(isError){
    return <h3 className='flex justify-center items-center'>{error}</h3>
   }
  return (
    <>
    <MainSlider/>
    <CategorySlider/>
    <RecentProducts Products={data?.data?.data}/>
    </>
  )
}
