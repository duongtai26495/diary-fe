import React from 'react'
import LoginForm from '../components/LoginForm'
import ProfileView from '../components/ProfileView'
import { useStore } from '../store'

const ProfilePage = () => {

    const [state, dispatch] = useStore()
    const { userLoginState } = state


    return (
        <div>
            {
                userLoginState
                    ?
                    <ProfileView/>
                    :
                    <LoginForm />
            }

        </div>
    )
}

export default ProfilePage