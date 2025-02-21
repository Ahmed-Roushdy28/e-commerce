import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { FaHeart } from "react-icons/fa6";
import MainLayout from './Pages/MainLayout/MainLayout';
import Home from "./Pages/Home/Home"
import Products from "./Pages/Products/Products"
import Login from "./Pages/Login/Login"
import Register from "./Pages/Register/Register"
import Cart from './Pages/Cart/Cart'
import Categories from './Pages/Categories/Categories';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { UserContextProvider } from './Context/UserContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from './../node_modules/@tanstack/react-query-devtools/src/production';
import CartContextProvider, { CartContext } from './Context/CartContext';

let query = new QueryClient

function App() {
const routes = createBrowserRouter([
  {path: '' , element:<MainLayout/>,children:[
    {index:true , element:<ProtectedRoute> <Home/> </ProtectedRoute>},
    {path:'products',element:<ProtectedRoute><Products /></ProtectedRoute>  },
    {path:'productdetails/:id/:category',element:<ProtectedRoute><ProductDetails /></ProtectedRoute>  },
    {path:'cart', element:<ProtectedRoute><Cart /></ProtectedRoute>  },
    {path:'categories', element:<ProtectedRoute><Categories/></ProtectedRoute>  },
    {path:'login',element: <Login /> },
    {path:'register', element: <Register/> },
  ]
  }
])
  return <CartContextProvider>
            <QueryClientProvider client={query} >
                <UserContextProvider>
                  <RouterProvider router={routes}></RouterProvider>
                  <ReactQueryDevtools/>
                </UserContextProvider>
              </QueryClientProvider>
          </CartContextProvider>

}

export default App
