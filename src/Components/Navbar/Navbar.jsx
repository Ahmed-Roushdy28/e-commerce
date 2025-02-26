import React, { useContext, useState } from "react";
import style from "./Navbar.module.css";
import { FaFacebook, FaInstagramSquare, FaTiktok, FaYoutube } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from '../../assets/freshcart-logo.svg'
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import Brands from './../../Pages/Brands/Brands';

export default function Navbar() {
  let navigate = useNavigate();
  let { userLogin, setuserLogin } = useContext(UserContext);
  let { cart } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function logout() {
    localStorage.removeItem('userToken');
    setuserLogin(null);
    navigate('/login');
  }

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      <nav className="z-50 fixed top-0 left-0 w-full bg-gray-100 border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">

          <div className="flex items-center">
            <Link to={''} className="flex items-center space-x-3 rtl:space-x-reverse pr-4">
              <img src={logo} className="h-8 me-3" alt="FlowBite Logo" />
            </Link>
          </div>

          <div className="flex lg:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>

          <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full lg:block lg:w-auto`} id="navbar-default">
            <ul className="font-medium flex flex-col lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 bg-white lg:bg-transparent dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700 rounded-lg lg:rounded-none">
              {userLogin !== null && (
                <>
                  <li><NavLink to="/" className="block py-2 px-3 lg:hover:text-green-700 rounded lg:bg-transparent lg:p-0 dark:text-white lg:dark:text-blue-500 no-underline ">Home</NavLink></li>
                  <li><NavLink to="cart" className="block py-2 px-3 lg:hover:text-green-700 rounded lg:bg-transparent lg:p-0 dark:text-white lg:dark:text-blue-500 no-underline ">Cart</NavLink></li>
                  <li><NavLink to="wishlist" className="block py-2 px-3 lg:hover:text-green-700 rounded lg:bg-transparent lg:p-0 dark:text-white lg:dark:text-blue-500 no-underline ">WishList</NavLink></li>
                  <li><NavLink to="products" className="block py-2 px-3 lg:hover:text-green-700 rounded lg:bg-transparent lg:p-0 dark:text-white lg:dark:text-blue-500 no-underline ">Products</NavLink></li>
                  <li><NavLink to="categories" className="block py-2 px-3 lg:hover:text-green-700 rounded lg:bg-transparent lg:p-0 dark:text-white lg:dark:text-blue-500 no-underline ">Categories</NavLink></li>
                  <li><NavLink to="brands" className="block py-2 px-3 lg:hover:text-green-700 rounded lg:bg-transparent lg:p-0 dark:text-white lg:dark:text-blue-500 no-underline ">Brands</NavLink></li>
                </>
              )}
            </ul>
          </div>

          <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full lg:block lg:w-auto`} id="navbar-default">
            <ul className="font-medium flex flex-col lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 bg-white lg:bg-transparent dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700 rounded-lg lg:rounded-none items-center p-1">
              {userLogin !== null && (
                <>
                  <Link to={'/cart'}>
                    <div className="text-lg text-center relative">
                      {cart?.numOfCartItems > 0 && (
                        <p className="bg-green-300 text-white text-xs font-bold flex items-center justify-center rounded-md w-5 h-5 absolute -top-2 -right-2 z-20">
                          {cart.numOfCartItems}
                        </p>
                      )}
                      <i className="text-2xl fa-solid fa-cart-shopping z-10"></i>
                    </div>
                  </Link>
                 <li><span className="block py-2 px-3 cursor-pointer lg:hover:text-green-700 rounded lg:bg-transparent lg:p-0 dark:text-white lg:dark:text-blue-500 no-underline lg:hover:underline" onClick={logout}>LogOut</span></li>
                </>
              )}
              {userLogin == null && (
                <>
                  <li><NavLink to={'login'} className="block py-2 px-3 lg:hover:text-green-700 rounded lg:bg-transparent lg:p-0 dark:text-white lg:dark:text-blue-500 no-underline lg:hover:underline">Login</NavLink></li>
                  <li><NavLink to={'register'} className="block py-2 px-3 lg:hover:text-green-700 rounded lg:bg-transparent lg:p-0 dark:text-white lg:dark:text-blue-500 no-underline lg:hover:underline">Register</NavLink></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <div className="pt-20"></div>
    </>
  );
}