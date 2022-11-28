import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ACCESS_TOKEN, LOCAL_LOGIN_STATE, USER_LOCAL } from '../api/constants'
import { loginWithUsernamePassword } from '../api/functions'
import CustomButton from '../components/CustomButton'
import { useStore } from '../store'
import { loadUserLocal, updateLoginState } from '../store/actions'
const LoginForm = () => {

    const [state, dispatch] = useStore()
    const [isLoading, setLoading] = useState(false)
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [statusLogin, setStatusLogin] = useState('')

    const LoginWithAPI = async () =>{
        setLoading(true)
        
        var User = {
            username,
            password
        }
        setStatusLogin('')
        const result = await loginWithUsernamePassword(User);
        if(result){
        dispatch(loadUserLocal(result))
        localStorage.setItem(USER_LOCAL,JSON.stringify(result))
        localStorage.setItem(LOCAL_LOGIN_STATE, true)
        localStorage.setItem(ACCESS_TOKEN,result.token)
        dispatch(updateLoginState(true))
        }
        setLoading(false)
    }

  return (
    <div className='w-full bg-white bg-opacity-70 authen-wrapper p-5 rounded-md shadow-lg flex flex-row'>
        <div className='w-full lg:w-1/3'>
               <p className='text-xl text-center mb-5'>Welcome back</p> 
               <div className='form-authen w-full'>
                    <label className='w-full text-sm p-1' htmlFor="username">Username</label>
                    <input onChange={e => setUsername(e.target.value)} className='w-full rounded-md p-2 mb-2' id='username' type={'text'} placeholder="Username" />
                    <label className='w-full text-sm p-1' htmlFor="username">Password</label>
                    <input security={'true'} onChange={e => setPassword(e.target.value)} className='w-full rounded-md p-2 mb-2' id='password' type={'password'} placeholder="Password" />
                    <CustomButton onClick={()=>LoginWithAPI()} isLoading={isLoading} style={"bg-cyan-700 text-white text-base"} title={"Login"} />
                    <p className='text-base text-red-500 m-auto text-center my-1 '>{statusLogin}</p>
                    <p className='text-sm my-2'><Link to={"/fogot"} >Forgot password ?</Link></p>
               </div>
        </div>
    </div>
  )
}


export default LoginForm