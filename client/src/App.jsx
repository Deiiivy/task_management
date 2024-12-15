import { useState, useEffect } from 'react'
import axios from 'axios'
import './styles/main.scss'
import Login from './pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import { AuthProvider } from './utils/AuthContext'
import ProtectedRoute from './utils/ProtectedRoute'
import CreateTask from './pages/CreateTask'

function App() {

  return (
   <>
   <AuthProvider>
      <BrowserRouter>
         <Routes>
          <Route path='/' element={<ProtectedRoute element={<Home />} />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/CreateTask' element={<CreateTask />} />
        </Routes>
      </BrowserRouter> 
    </AuthProvider>
   </>
  )
}

export default App
