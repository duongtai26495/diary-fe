import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ACCESS_TOKEN, LOCAL_LOGIN_STATE } from '../api/constants'
import { useStore } from '../store'
const Header = () => {
  const [state, dispatch] = useStore()
  const { userLoginState, updateUserInfo } = state

  useEffect(() => {

  }, [userLoginState])

  const logout = () => {

  }

  return (
    <div className='header-wrapper-inner m-auto flex flex-row  align-items-center'>
      <Link to={"/"} className="logo-text cursor-pointer">
        Diary
      </Link>
      <ul className='menu-wrapper'>
        <li className='menu-item cursor-pointer text-sm xl:text-base'><Link to={"/"}>Home</Link></li>
        <li className='menu-item cursor-pointer text-sm xl:text-base'><Link to={"/"}>Contact</Link></li>
        <li className='menu-item cursor-pointer text-sm xl:text-base'><Link to={"/"}>About us</Link></li>
        {
          localStorage.getItem(LOCAL_LOGIN_STATE)  === 'true'
            ?
            <li className='menu-item cursor-pointer text-sm xl:text-base join-now-item'>LOG OUT</li>
            :
            <li className='menu-item cursor-pointer text-sm xl:text-base join-now-item'><Link to={"/login"}>Join Now</Link> </li>
        }
      </ul>
    </div>
  )
}

export default Header