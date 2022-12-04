import React from 'react'
import { Link } from 'react-router-dom'
import { HOST_URL, LOCAL_LOGIN_STATE, USER_LOCAL } from '../api/constants'
import { useStore } from '../store'
import AddButton from './AddButton'
import ProfileImageHeaderUnName from './ProfileImageHeaderUnName'

const FunctionsBar = () => {

    const [state, dispatch] = useStore()
    const { userLoginState, userDataLocalState } = state
    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
    var user = userDataLocalState ? userDataLocalState : JSON.parse(localStorage.getItem(USER_LOCAL))
  
    return (
        <div className='container m-auto flex flex-row columns-3 gap-1 '>

            {localStorage.getItem(LOCAL_LOGIN_STATE) ? <AddButton /> : ""}

            <Link to={"/"} className='shadow w-full bg-white rounded p-2 text-black cursor-pointer text-center self-center' >
                <i className="fa-solid fa-house"></i>
            </Link>
            <button onClick={() => scrollToTop()}
                className={'shadow mt-0 w-full bg-white rounded p-2 text-black cursor-pointer text-center self-center'}>
                <i className="fa-sharp fa-solid fa-arrow-up"></i>
            </button>
            {
                <Link to={"/profile"} className='shadow w-full bg-white rounded p-2 text-black cursor-pointer  text-center self-center'>
                    <ProfileImageHeaderUnName user={user} />
                </Link>
            }

        </div>
    )
}

export default FunctionsBar