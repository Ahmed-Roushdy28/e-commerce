import React, { useContext } from "react";
import style from "./Navbar.module.css";
import { FaFacebook, FaInstagramSquare, FaTiktok, FaYoutube } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from '../../assets/freshcart-logo.svg'
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  let navigate = useNavigate()
  let { userLogin, setuserLogin } = useContext(UserContext)
  let { cart } = useContext(CartContext)

  function logout() {
    localStorage.removeItem('userToken');
    setuserLogin(null);
    navigate('/login')
  }

  return (
    <>
      <nav className="z-50 fixed top-0 left-0 w-full bg-green-600 border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center">
            <Link to={''} className="flex items-center space-x-3 rtl:space-x-reverse pr-4">
              <img src={logo} className="h-8 me-3" alt="FlowBite Logo" />
            </Link>
            <button
              data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
            <div className="hidden w-full md:block md:w-auto" id="navbar-default">
              {userLogin !== null && (
                <ul className="font-medium flex flex-col py-2 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  <li><NavLink to="/" className="block py-2 px-3 md:hover:text-green-700 rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500">Home</NavLink></li>
                  <li><NavLink to="cart" className="block py-2 px-3 md:hover:text-green-700 rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500">Cart</NavLink></li>
                  <li><NavLink to="wishlist" className="block py-2 px-3 md:hover:text-green-700 rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500">WishList</NavLink></li>
                  <li><NavLink to="products" className="block py-2 px-3 md:hover:text-green-700 rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500">Products</NavLink></li>
                  <li><NavLink to="categories" className="block py-2 px-3 md:hover:text-green-700 rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500">Categories</NavLink></li>
                </ul>
              )}
            </div>
          </div>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 items-center p-1">
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
                  <li><Link to={""} className="block py-2 px-3 md:hover:text-green-700 rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500"><FaFacebook /></Link></li>
                  <li><Link to={""} className="block py-2 px-3 md:hover:text-green-700 rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500"><FaInstagramSquare /></Link></li>
                  <li><Link to={""} className="block py-2 px-3 md:hover:text-green-700 rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500"><FaYoutube /></Link></li>
                  <li><Link to={""} className="block py-2 px-3 md:hover:text-green-700 rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500"><FaTiktok /></Link></li>
                  <li><span className="block py-2 px-3 cursor-pointer md:hover:text-green-700 rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500" onClick={logout}>LogOut</span></li>
                </>
              )}
              {userLogin == null && (
                <>
                  <li><NavLink to={'login'} className="block py-2 px-3 md:hover:text-green-700 rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500">Login</NavLink></li>
                  <li><NavLink to={'register'} className="block py-2 px-3 md:hover:text-green-700 rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500">Register</NavLink></li>
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
