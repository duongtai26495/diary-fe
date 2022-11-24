import React from 'react'

const Header = () => {
  return (
    <div className='container m-auto'>
        <div className='header-logo'>
          <img className='image-logo' src='images/logo.png' />
        </div>
        <ul className='menu-wrapper'>
          <li className='menu-item'>Home</li>
          <li className='menu-item'>Category</li>
          <li className='menu-item'>Contact</li>
          <li className='menu-item'>About us</li>
        </ul>
    </div>
  )
}

export default Header