import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useProducts() {
   function getRecent(){
      return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }
     let responseObject = useQuery({queryKey:['recentProducts'],
          queryFn:getRecent,
          staleTime:3000,
          retry:6,
          retryDelay:3000,
          refetchInterval:10000,
    
       })
  return responseObject
}
