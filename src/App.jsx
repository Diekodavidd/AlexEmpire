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
        <Route path="/product/:id" element={<ProductDetails />}/>
      </Routes>
    </>
  )
}

export default App
