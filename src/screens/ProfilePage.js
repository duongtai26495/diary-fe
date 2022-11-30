import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LOCAL_LOGIN_STATE } from '../api/constants'
import AuthenForm from '../components/AuthenForm'
import ProfileView from '../components/ProfileView'
import { useStore } from '../store'

const ProfilePage = () => {

    const [state, dispatch] = useStore()
    const { userLoginState } = state

    return (
        localStorage.getItem(LOCAL_LOGIN_STATE)
        ?
        <ProfileView />
        :
        <AuthenForm />
    )
}

export default ProfilePage