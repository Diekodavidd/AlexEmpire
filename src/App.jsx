import React,{ useState } from 'react'
import './App.css'
import {Route, Routes} from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Welcome from './components/Welcome'
import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css';
import Dashboard from './components/Dashboard'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/dash" element={<Dashboard />}/>
      </Routes>
    </>
  )
}

export default App
