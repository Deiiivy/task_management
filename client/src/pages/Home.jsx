import React from 'react'
import '../styles/Home.scss'
import { Link } from 'react-router-dom'

function Home() {
  return (

    <div className='ContainerHome'>
      <div className='header'>
        <h1>TASK MANAGEMENT</h1>
      </div>

      <div className='Home'>

        <div className='contentHome'>
          
          <div className='section'>
            <Link to="/CreateTask">CREATE TASK</Link>
          </div>

          <div className='section'>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Home