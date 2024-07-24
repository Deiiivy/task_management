import { useState, useEffect } from 'react'
import axios from 'axios'
import './styles/main.scss'
import Login from './pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'

function App() {

  return (
   <>
   <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
      </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
