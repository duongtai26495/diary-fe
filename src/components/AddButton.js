import React from 'react'
import { Link } from 'react-router-dom'

const AddButton = () => {
  return (
    <Link id='add_more' to={"/diary/new"}
      className='w-full flex flex-row bg-cyan-50 p-2 rounded  hover:bg-pink-500 hover:text-white justify-center items-center shadow-md' >
      <div className='block md:hidden cursor-pointer'>
      <i className="fa-sharp fa-solid fa-pen-nib"></i>
      </div>
      <div className='hidden md:flex flex-row justify-center items-center cursor-pointer'>
        <i className="fa-regular fa-face-smile"></i>
        <p className='ml-2'> How was your day today ?</p>
      </div>

    </Link>
  )
}

export default AddButton