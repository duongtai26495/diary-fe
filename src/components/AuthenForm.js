import React, { useState } from 'react'
import CustomButton from './CustomButton'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const AuthenForm = () => {

    const [authenSwitch, setAuthenSwitch] = useState(true)

    const switchMode = () => setAuthenSwitch(!authenSwitch)


    return (
        <div className='w-full flex flex-col md:flex-row gap-1 columns-2'>
            <div className="w-full lg:w-1/2">
            <div className='w-full bg-white bg-opacity-70 authen-wrapper p-5 rounded-md shadow-lg flex flex-row authen-box'>
                {authenSwitch ?
                    <LoginForm />
                    :
                    <RegisterForm />}
            </div>
            <div className="w-full switch flex flex-row">
                <CustomButton title={!authenSwitch ? 'Have an account? Join now' : "Don't have an account? Register"} onClick={() => switchMode()} style={'bg-black text-white button-switch-mode '} />

            </div>
            </div>
           <div className='right-box-authen w-full lg:w-1/2 bg-white rounded-md'>

           </div>
        </div>

    )
}

export default AuthenForm