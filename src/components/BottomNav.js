import React, { useEffect, useState } from 'react'
import AddButton from './AddButton'
import FunctionsBar from './FunctionsBar'

const BottomNav = () => {

  const [isShow, setShow] = useState(false)
  const controlBottomNav = () => {
    if(window.scrollY > 50){
      setShow(true)
    }else{
      setShow(false)
    }
  }

  useEffect(()=>{
    window.addEventListener('scroll', controlBottomNav)
    return () => {
      window.removeEventListener('scroll', controlBottomNav)
    }
  },[])

  return (
    <div className={`p-2 fixed bg-white bg-opacity-60 bottom-nav w-full ${isShow && 'slide-up'} lg:hidden` }>
      <FunctionsBar />
    </div>
  )
}

export default BottomNav