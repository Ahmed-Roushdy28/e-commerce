import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">

      <Navbar />
      <div className="flex-grow container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
