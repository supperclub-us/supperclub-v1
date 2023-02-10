import React from 'react'
import { SearchBar } from '../index'


const Header = () => {

  return (
    <div>
      <h1>A tight-knit dining experience</h1>
      {user.role === "CHEF" ? null : <SearchBar />}
    </div>
  )
}

export default Header

