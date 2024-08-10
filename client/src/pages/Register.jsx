// src/components/Register.js
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

function Register() {
  const [name, setName] = useState('');
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post("http://localhost:4001/register", { name, gmail, password })
      .then(result => {
        console.log(result);
        login(); 
        navigate("/");
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your name</label>
        <input type='text' placeholder='Nombre' onChange={(e) => setName(e.target.value)} />

        <label>Enter your Gmail</label>
        <input type='text' placeholder='Gmail' onChange={(e) => setGmail(e.target.value)} />

        <label>Enter your password</label>
        <input type='number' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />

        <button type='submit'>Register</button>

        <p>¿Ya tienes cuenta? <Link to="/Login">Inicia sesión aquí</Link></p>
      </form>
    </div>
  );
}

export default Register;
