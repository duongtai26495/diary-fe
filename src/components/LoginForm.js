import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, LOCAL_LOGIN_STATE, USER_LOCAL } from '../api/constants'
import { getAllDiaryByAuthor, loginWithUsernamePassword } from '../api/functions'
import CustomButton from '../components/CustomButton'
import { useStore } from '../store'
import { getUserDiaries, loadUserLocal, updateLoginState } from '../store/actions'
const LoginForm = () => {

  const [state, dispatch] = useStore()
  const { userDiaries, userDataLocalState } = state
  const [isLoading, setLoading] = useState(false)
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [statusLogin, setStatusLogin] = useState('')
  const navigate = useNavigate()

  const LoginWithAPI = async () => {
    setLoading(true)

    var User = {
      username: username.toLowerCase(),
      password
    }
    setStatusLogin('')
    const result = await loginWithUsernamePassword(User);

    if (result) {
      var user = result.user
      localStorage.setItem(USER_LOCAL, JSON.stringify(user))
      localStorage.setItem(LOCAL_LOGIN_STATE, true)
      localStorage.setItem(ACCESS_TOKEN, user.token)

      dispatch(updateLoginState(true))
      setLoading(false)
      navigate("/")

    }
  }

  return (
      <div className='w-full '>
        <p className='text-xl text-center mb-5'>Welcome back</p>
        <div className='form-authen w-full'>
          <label className='w-full text-sm p-1' htmlFor="username">Username</label>
          <input onChange={e => setUsername(e.target.value)} className='w-full rounded-md p-2 mb-2' id='username' type={'text'} placeholder="Username" />
          <label className='w-full text-sm p-1' htmlFor="username">Password</label>
          <input security={'true'} onChange={e => setPassword(e.target.value)} className='w-full rounded-md p-2 mb-2' id='password' type={'password'} placeholder="Password" />
          <CustomButton onClick={() => LoginWithAPI()} isLoading={isLoading} style={"bg-cyan-700 text-white text-base"} title={"Login"} />
          <p className='text-base text-red-500 m-auto text-center my-1 '>{statusLogin}</p>
          <p className='text-sm my-2'><Link to={"/fogot"} >Forgot password ?</Link></p>
        </div>
      </div>
  )
}


export default LoginForm