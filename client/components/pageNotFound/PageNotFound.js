import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './pageNotFound.css'

const PageNotFound = () => {

  const navigate = useNavigate();

  useEffect(()=>{
    // setTimeout(()=>{
    //   navigate('/')
    // }, 3000)
  }, [navigate])
  return (
    <div className="pageNoteFound-container">
        <h1>Oops! You seem to be lost.</h1>
        <p> You will be navigated back home in 3 seconds!</p>
        <Link to="/"><img src='https://i.imgur.com/gxL6GG0.png' /></Link>       
    </div>
  )
}

export default PageNotFound