import React from 'react'
import { Link } from 'react-router-dom'
import { LOCAL_LOGIN_STATE, USER_LOCAL } from '../api/constants'
import { useStore } from '../store'
import ProfileImageHeader from './ProfileImageHeader'
import ProfileImageHeaderUnName from './ProfileImageHeaderUnName'

const Header = () => {
  const [state, dispatch] = useStore()
  const { userLoginState, userDataLocalState } = state

  var user = userDataLocalState ? userDataLocalState : JSON.parse(localStorage.getItem(USER_LOCAL))

  const LogoHeader = () => {
    return (
      <Link to={"/"} className="logo-text cursor-pointer">
        <p className='app-name'>Diary</p>
      </Link>
    )

  }

  return (
    <React.Fragment>
      <div className='lg:sticky top-0 p-2 bg-opacity-80 bg-white m-auto hidden md:flex flex-row items-center justify-between shadow rounded-md header-desktop'>
        <LogoHeader />
        <ul className='menu-wrapper flex '>
          <li className='menu-item cursor-pointer text-sm xl:text-base'><Link to={"/"}>Home</Link></li>
          <li className='menu-item cursor-pointer text-sm xl:text-base'><Link to={"/"}>About us</Link></li>
          <li className='menu-item cursor-pointer text-sm xl:text-base join-now-item'><Link to={"/profile"}>
            {localStorage.getItem(LOCAL_LOGIN_STATE) ? <ProfileImageHeader user={user} /> : "Join now"}
          </Link></li>
        </ul>
      </div>
      <div className='p-2 m-auto flex md:hidden flex-row bg-white rounded-md justify-between'>
        <LogoHeader />
        <ul className='menu-wrapper flex flex-row items-center'>
          <li className='menu-item cursor-pointer text-xl'><Link to={"/"}><i className="fa-solid fa-house"></i></Link></li>
          <li className='menu-item cursor-pointer'>
          <Link to={"/profile"} className="text-xl">
            {localStorage.getItem(LOCAL_LOGIN_STATE) ? <ProfileImageHeaderUnName user={user} /> : <i className="fa-solid fa-right-to-bracket"></i>}
          </Link></li>
        </ul>
      </div>

    </React.Fragment>
  )
}

export default Header