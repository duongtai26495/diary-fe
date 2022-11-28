import React from 'react'
import { Link } from 'react-router-dom'
import { USER_LOCAL } from '../api/constants'
import { useStore } from '../store'
import ProfileImageHeader from './ProfileImageHeader'
const Header = () => {
  const [state, dispatch] = useStore()
  const { userLoginState, userDataLocal } = state

  var user = userDataLocal ? userDataLocal : JSON.parse(localStorage.getItem(USER_LOCAL))

  return (
    <div className='header-wrapper-inner m-auto flex flex-row  align-items-center'>
      <Link to={"/"} className="logo-text cursor-pointer">
        Diary
      </Link>
      <ul className='menu-wrapper'>
        <li className='menu-item cursor-pointer text-sm xl:text-base'><Link to={"/"}>Home</Link></li>
        <li className='menu-item cursor-pointer text-sm xl:text-base'><Link to={"/"}>Contact</Link></li>
        <li className='menu-item cursor-pointer text-sm xl:text-base'><Link to={"/"}>About us</Link></li>
        <li className='menu-item cursor-pointer text-sm xl:text-base join-now-item'><Link to={"/profile"}>
          {userLoginState ? <ProfileImageHeader username={user.username} />: "Join now"}
          </Link></li>
        
      </ul>
    </div>
  )
}

export default Header