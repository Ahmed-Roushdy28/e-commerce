import React from 'react'
import style from './MainLayout.module.css'
import Navbar from '../../Components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer'
export default function MainLayout() {
  return <>
  <Navbar/>
   <div className="container">
   <Outlet/>
   </div>
  <Footer/>
  </>
}
