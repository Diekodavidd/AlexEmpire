import React,{ useState } from 'react'
import './App.css'
import {Route, Routes} from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Welcome from './components/Welcome'
import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css';
import Dashboard from './components/Dashboard'
import Dashboard2 from './components/Dashboard2'
import Profile from './components/Profile'
import Admin from './components/admin'
import ProductDetails from './components/ProductDetails'
import ThreeImageCarousel from './components/Carousel'
import CategoryPage from './components/Category'
import Loginad from './components/Sigi'
import ProductListingPage from './components/Productlistig'
import { Category } from '@mui/icons-material'
import AnimationBackground from './components/Amiatio'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/dash" element={<Dashboard />}/>
        <Route path="/dash2" element={<Dashboard2 />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/admin" element={<Admin />}/>
        <Route path="/carous" element={<ThreeImageCarousel />}/>
        <Route path="/product/:id" element={<ProductDetails />}/>
        <Route path="/products-by-category" element={<CategoryPage />} />
        <Route path="/loginad" element={<Loginad />} />
        <Route path="/list" element={<ProductListingPage />} />
        <Route path="/lists" element={<AnimationBackground />} />
        {/* <Route path="/lists" element={<Particles />} /> */}
      </Routes>
    </>
  )
}

export default App
