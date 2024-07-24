import React from 'react'
import { useState, useEffect } from 'react'

function Register() {
  const [gmail, setGmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <form>
        <label>Enter your name</label>
        <input type='text' placeholder='Nombre' />

        <label>Enter yout Gmail</label>
        <input type='text' placeholder='Gmail' />

        <label>Enter your password</label>
        <input type='number' placeholder='Password' />

        <button>Register</button>
      </form>
    </div>
  )
}

export default Register