import React from 'react'
import { HOST_URL } from '../api/constants'
import default_image from '../images/default.png'
const ProfileImageHeader = ({user}) => {

  var image_url = user.profile_image ? HOST_URL + "image/profile/"+ user.profile_image : default_image

  return (
    <div className='flex flex-row w-full'>
<div className='profile_image_header' style={{backgroundImage: `url(${image_url})`}}></div>
<p className='text-base mx-1'>{user.full_name}</p>
</div>
    
  )
}

export default ProfileImageHeader