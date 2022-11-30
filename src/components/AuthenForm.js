import React, { useState } from 'react'
import CustomButton from './CustomButton'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const AuthenForm = () => {

    const [authenSwitch, setAuthenSwitch] = useState(true)

    const switchMode = () => setAuthenSwitch(!authenSwitch)


    return (
        <div className='w-full flex flex-col md:flex-row gap-1 columns-2'>
            <div className='w-full lg:w-1/3 bg-white bg-opacity-70 authen-wrapper p-5 rounded-md shadow-lg flex flex-row authen-box'>
                {authenSwitch ?
                    <LoginForm />
                    :
                    <RegisterForm />}
            </div>

            <div className='w-full lg:w-2/3 p-2 bg-white rounded-md'>
                <CustomButton title={!authenSwitch ? 'Login' : 'Register'} onClick={() => switchMode()} style={'bg-cyan-700 text-white'} />
            </div>
        </div>

    )
}

export default AuthenForm