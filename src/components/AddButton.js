import React from 'react'
import { Link } from 'react-router-dom'

const AddButton = () => {
  return (    <Link to={"/diary/new"} >
    <div id='add_more' className='flex flex-row bg-cyan-50 p-2 rounded cursor-pointer hover:bg-pink-500 hover:text-white justify-center items-center shadow-md'>
    <i className="fa-regular fa-face-smile"></i>
    <p className='ml-2'> How was your day today ?</p>
    </div>
    </Link>
  )
}

export default AddButton