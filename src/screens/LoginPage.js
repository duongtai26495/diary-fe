import React, { useState } from 'react'
import { loginWithUsernamePassword } from '../api/functions'
import CustomButton from '../components/CustomButton'

const LoginPage = () => {
    const [isLoading, setLoading] = useState(false)
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const LoginWithAPI = async () =>{
        setLoading(true)
        var User = {
            username,
            password
        }

        const result = loginWithUsernamePassword(User);
        console.log(result)
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
               </div>
        </div>
    </div>
  )
}

export default LoginPage