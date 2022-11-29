import React from 'react'
import { LOCAL_LOGIN_STATE, USER_LOCAL } from '../api/constants'
import LoginForm from '../components/LoginForm'
import ProfileView from '../components/ProfileView'
import { useStore } from '../store'

const ProfilePage = () => {

    const [state, dispatch] = useStore()
    const { userLoginState } = state


    return (
        <div>
            {
                localStorage.getItem(LOCAL_LOGIN_STATE)
                    ?
                    <ProfileView/>
                    :
                    <LoginForm />
            }

        </div>
    )
}

export default ProfilePage