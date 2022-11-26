import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='container header-wrapper-inner m-auto flex flex-row  align-items-center'>
          <Link to={"/"} className="logo-text cursor-pointer">
            Diary
          </Link>
        <ul className='menu-wrapper'>
          <li className='menu-item cursor-pointer text-sm xl:text-base'><Link to={"/"}>Home</Link></li>
          <li className='menu-item cursor-pointer text-sm xl:text-base'><Link to={"/"}>Contact</Link></li>
          <li className='menu-item cursor-pointer text-sm xl:text-base'><Link to={"/"}>About us</Link></li>
          <li className='menu-item cursor-pointer text-sm xl:text-base join-now-item'><Link to={"/login"}>Join now</Link>
          </li>
        </ul>
    </div>
  )
}

export default Header