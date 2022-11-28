import React, { useEffect, useState } from 'react'
import { HOST_URL, USER_LOCAL } from '../api/constants'
import { logoutUser } from '../api/functions'
import { useStore } from '../store'
import { updateLoginState } from '../store/actions'
import CustomButton from './CustomButton'

const ProfileView = ({user}) => {

    const [state, dispatch] = useStore()

    const logout = () =>{
        logoutUser()
        dispatch(updateLoginState(false))
    }

  return (
    <div className='w-full bg-white bg-opacity-50 p-2 rounded-md flex flex-row columns-2 gap-2'>
        <div className='w-1/3 shadow p-2 rounded-md'>
                <div className=' profile-view-image m-auto' style={{backgroundImage: `url(${HOST_URL+"user/images/"}${user.username})`}}></div>
                <p className='text-lg font-semibold w-full text-center uppercase mt-1'>{user.full_name}</p>
                <ul className='mt-2'>
                    <li><p>Username: {user.username}</p></li>
                    <li><p>Email: {user.email ?? 'Not update'}</p></li>
                    <li><p>Gender: {user.gender}</p></li>
                    <li><p>Joined at: {user.joined_at}</p></li>
                </ul>
                <CustomButton style={'bg-red-700 text-white'} title={"Logout"} onClick={logout} />
        </div>
        <div className='w-2/3 shadow p-2 rounded-md'>

        </div>
    </div>
  )
}

export default ProfileView