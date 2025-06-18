import React from 'react'
import { useState } from 'react'    
import './Header.css'
import popcorn from '../../assets/popcorn.png';

const Header = () => {

  
  
  return (
    <>
    <div className = 'header'>
        <h1>FLIXSTER</h1> 
        <img className="popcorn" src={popcorn} alt="popcorn" />
    </div>
    </>
  )
}

export default Header