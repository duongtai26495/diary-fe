import React from 'react'
import { HOST_URL } from '../api/constants'
import default_image from '../images/default.png'
const ProfileImageHeaderUnName = ({user}) => {
  var image_url = default_image
  if(user){
    image_url = user.profile_image ? HOST_URL + "user/images/"+ user.username : default_image
  }


  return (
    <div className='flex flex-row w-full'>
<div className='profile_image_header m-auto' style={{backgroundImage: `url(${image_url})`}}></div>
</div>
    
  )
}

export default ProfileImageHeaderUnName