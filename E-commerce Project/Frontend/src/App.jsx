import React from 'react'
import { Button } from './components/ui/button'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Verify from './pages/Verify'
import VerifyEmail from './pages/VerifyEmail'
import Footer from './components/Footer'
// import Profile from './pages/Profile'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Dashboard from './pages/Dashboard'
import AdminSales from './pages/Admin/AdminSales'
import AddProduct from './pages/Admin/AddProduct'
import AdminProduct from './pages/Admin/AdminProduct'
import AdminOrders from './pages/Admin/AdminOrders'
import ShowUserOrders from './pages/Admin/ShowUserOrders'
import AdminUsers from './pages/Admin/AdminUsers'
import UserInfo from './pages/Admin/UserInfo'
import ProtectedRoutes from './components/ProtectedRoutes'
import AddressForm from './pages/AddressForm'
import OrderSuccess from './pages/OrderSuccess'
import MyOrder from './pages/Profile'


const router = createBrowserRouter([
  {
    path:'/',
    element:<><Navbar/><Home/><Footer/></>
  },
  {
    path:'/signup',
    element:<><Signup/></>
  },
  {
    path:'/login',
    element:<><Login/></>
  },
  {
    path:'/verify',
    element:<><Verify/></>
  },
  {
    path:'/verify/:token',
    element:<><VerifyEmail/></>
  },
  {
    path:'/order',
    element:<ProtectedRoutes><Navbar/><MyOrder/></ProtectedRoutes>
  },
  {
    path:'/products',
    element:<><Navbar/><Products/></>
  },
  {
    path:'/cart',
    element:<ProtectedRoutes><Navbar/><Cart/></ProtectedRoutes>
  },
  {
    path:'/address',
    element:<ProtectedRoutes><AddressForm/></ProtectedRoutes>
  },
  {
    path:'/order-success',
    element:<ProtectedRoutes><OrderSuccess/></ProtectedRoutes>
  },
  {
    path:'/dashboard',
    element:<ProtectedRoutes adminOnly={true}><Dashboard/></ProtectedRoutes>,
    children:[
      {
        path:"sales",
        element:<><AdminSales/></>
      },
      {
        path:"add-product",
        element:<><AddProduct/></>
      },
      {
        path:"products",
        element:<><AdminProduct/></>
      },
      {
        path:"order",
        element:<><AdminOrders/></>
      },
      {
        path:"users/orders/:userId",
        element:<><ShowUserOrders/></>
      },
      {
        path:"users",
        element:<><AdminUsers/></>
      },
      {
        path:"users/:id",
        element:<><UserInfo/></>
      },
    ]
  },
])
// const admin = user?.role === "admin" ? true : false;
// {admin && (
//               <Link to={"/dashboard"}>
//                 <li>Dashboard</li>
//               </Link>
//             )}


const App = () => {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
