import React from 'react'
import { HOST_URL } from '../api/constants'

const ProfileImageHeader = ({username}) => {
  
    let url = HOST_URL+"user/images/"+username
  return (
    <div className='flex flex-row'>
<div className='profile_image_header' style={{backgroundImage: `url(${url})`}}></div>
<p className='text-base mx-1'>{username}</p>
</div>
    
  )
}

export default ProfileImageHeader