import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, LOCAL_LOGIN_STATE, USER_LOCAL } from '../api/constants'
import { loginWithUsernamePassword, registerWithAPI } from '../api/functions'
import CustomButton from './CustomButton'
import default_image from '../images/default.png'
import { updateLoginState } from '../store/actions'
import { useStore } from '../store'

const RegisterForm = () => {
  const [state, dispatch] = useStore()
  const [full_name, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState('')
  const [isLoading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [statusRegister, setStatus] = useState('')
  const registerUser = async () => {
    setLoading(true)
    let User = {
      full_name,
      email: email.toLocaleLowerCase(),
      username: username.toLocaleLowerCase(),
      gender: parseInt(gender),
      password
    }

    let result = await registerWithAPI(User);
    if(result.status === 'SUCCESS'){
      let DataUser = {
        username: username.toLocaleLowerCase(),
        password
      }
      let login = await loginWithUsernamePassword(DataUser)
      if (login.status == 200) {

        var user = login.data.user
        localStorage.setItem(USER_LOCAL, JSON.stringify(user))
        localStorage.setItem(LOCAL_LOGIN_STATE, true)
        localStorage.setItem(ACCESS_TOKEN, user.token)

        dispatch(updateLoginState(true))
        navigate("/")
      }else{
        
      setStatus("Login fail")
      setLoading(false)
      }
    }else{
      setLoading(false)
      setStatus("Register fail")
    }
    setLoading(false)
  }


  return (
    <div className='w-full '>
        <p className='text-xl text-center mb-5'>Welcome to Diary</p>
        <div className='form-authen w-full'>
        <label className='w-full text-sm p-1' htmlFor="fullname">Full name</label>
          <input onChange={e => setFullName(e.target.value)} value={full_name} className='w-full rounded-md p-2 mb-2' id='fullname' type={'text'} placeholder="Full name" />
          <label className='w-full text-sm p-1' htmlFor="email">Email</label>
          <input onChange={e => setEmail(e.target.value)} value={email} className='w-full rounded-md p-2 mb-2' id='email' type={'email'} placeholder="Email" />
          <label className='w-full text-sm p-1' htmlFor="username">Username</label>
          <input onChange={e => setUsername(e.target.value)} value={username} className='w-full rounded-md p-2 mb-2' id='username' type={'text'} placeholder="Username" />
          <label className='w-full text-sm p-1' htmlFor="password">Password</label>
          <input security={'true'} onChange={e => setPassword(e.target.value)} className='w-full rounded-md p-2 mb-2' id='password' type={'password'} placeholder="Password" />
      
          <select className='my-3 p-2 w-full rounded-md' value={gender} onChange={e => setGender(e.target.value)}>
            <option value="1">Male</option>
            <option value="2">Female</option>
            <option value="3">Unknow</option>
            <option value="" hidden>Select your gender</option>
          </select>
          <CustomButton onClick={() => registerUser()} isLoading={isLoading} style={"bg-cyan-700 text-white text-base mt-3"} title={"Join now"} />
          <p className='text-base text-red-500 m-auto text-center my-1 '>{statusRegister}</p>
          <p className='text-sm my-2'><Link to={"/forgot"} >Forgot password ?</Link></p>
        </div>
      </div>
  )
}

export default RegisterForm