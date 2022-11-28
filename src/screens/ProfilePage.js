import React, { useState, useEffect } from 'react'
import { ACCESS_TOKEN, USER_LOCAL } from '../api/constants'
import LoginForm from '../components/LoginForm'
import ProfileView from '../components/ProfileView'
import { useStore } from '../store'

const ProfilePage = () => {

    const [state, dispatch] = useStore()
    const { userLoginState, updateUserInfo } = state
    const [user, setUser] = useState({})

    const loadUser = () => {
        let local_user = JSON.parse(localStorage.getItem(USER_LOCAL))
        if(local_user){
          setUser(local_user)
        }
    }
    
    useEffect(()=>{
        loadUser()
    },[userLoginState])

    return (
        <div>
            {
                localStorage.getItem(ACCESS_TOKEN)
                    ?
                    <ProfileView user={user} />
                    :
                    <LoginForm />
            }

        </div>
    )
}

export default ProfilePage