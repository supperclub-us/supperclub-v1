import React from 'react'
import { SearchBar } from '../index'
import { useSelector } from 'react-redux';

const Header = () => {
  const user = useSelector((state) => state.auth.me);


  return (
    <div>
      {user.role === "CHEF" ? null : <SearchBar />}
    </div>
  )
}

export default Header

