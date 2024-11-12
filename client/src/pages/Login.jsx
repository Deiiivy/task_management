import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'

function Login() {
  const [gmail, setGmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate();
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    try {
      const response = await axios.post("http://localhost:4001/login", { gmail, password });
      console.log(response);
      if (response.status === 200) { 
        login();
        navigate("/");
      } else {
        setError('Invalid credentials. Please try again.'); 
        
      }
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your Gmail</label>
        <input type='text' placeholder='Gmail' onChange={(e) => setGmail(e.target.value)} />

        <label>Enter your password</label>
        <input type='number' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />

        <button type='submit'>Login</button>
        {error && <p style={{color: 'red'}}>{error}</p>}
        <p>¿Don't have an account? <a href="/Register">Register here</a></p>
      </form>
    </div>
  )
}

export default Login
