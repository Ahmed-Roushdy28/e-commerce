import React from 'react'
import style from './Categories.module.css'
import useProducts from '../../Hooks/UseProducts';

export default function Categories() {
  let {data , error , isError , isLoading , isFetching} = useProducts()
  return (
    <div>Categories</div>
  )
}
