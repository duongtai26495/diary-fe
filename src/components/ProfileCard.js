import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { HOST_URL, SORT_LAST_EDITED_DESC, USER_LOCAL } from '../api/constants'
import { logoutUser, uploadImageAPI } from '../api/functions'
import { useStore } from '../store'
import { loadUserLocal, updateLoginState } from '../store/actions'
import CustomButton from './CustomButton'
import GenderView from './GenderView'

const ProfileCard = ({user}) => {

    const [state, dispatch] = useStore()
    const { userDataLocalState } = state
    const [labelUpload, setLabelUpload] = useState('Edit Image')
    const [imageSelected, setImageSelected] = useState()
    const navigate = useNavigate()
  
    const logout = () => {
      logoutUser()
      dispatch(updateLoginState(false))
    }
  
    useEffect(() => {
        return (() => {
          imageSelected && URL.revokeObjectURL(imageSelected.preview)
        })
      }, [imageSelected])
    
      const clearSelectedImage = () => {
        imageSelected && URL.revokeObjectURL(imageSelected.preview)
        setImageSelected()
      }
    
      const confirmUpload = async () => {
        if (imageSelected && userDataLocalState) {
          var data = {
            username: userDataLocalState.username,
            token: userDataLocalState.token,
            image: imageSelected
          }
    
          const result = await uploadImageAPI(data)
          if (result) {
            let user_local = JSON.parse(localStorage.getItem(USER_LOCAL))
            user_local.profile_image = result
            localStorage.setItem(USER_LOCAL, JSON.stringify(user_local))
            dispatch(loadUserLocal(user_local))
          }
          setLabelUpload("Image changed")
          clearSelectedImage()
        }
    
      }

      
  const ConfirmSelectedImage = () => {
    if (imageSelected) {
      return (
        <div className='w-full preview-select-image rounded-md bg-white p-2 flex flex-col'>
          <div className='w-full profile-view-image m-auto' style={{ backgroundImage: `url(${imageSelected.preview})` }}></div>
          <div className='flex flex-row columns-2 gap-2'>
            <CustomButton
              onClick={() => confirmUpload()}
              title={'Upload'}
              style={'bg-cyan-700 text-white'} />
            <CustomButton onClick={() => clearSelectedImage()}
              title={'Cancel'} style={'bg-orange-700 text-white'} />
          </div>
        </div>
      )
    }


  }


  return (
    <React.Fragment>
        <div className=' profile-view-image m-auto w-full ' style={{ backgroundImage: `url(${HOST_URL + "user/images/"}${user.username})` }}>
          <div className='change-iamge-profile bg-white bg-opacity-40 w-full pb-2 flex flex-cols'>
            <label htmlFor='update_image_label' className='w-full text-center text-sm cursor-pointer'>{labelUpload}</label>
            <input
              id='update_image_label' type={'file'}
              className="hidden"
              onChange={(e) => {
                var file = e.target.files[0]
                file.preview = URL.createObjectURL(file)
                setImageSelected(file)
              }}
            />
          </div>

        </div>
        <p className='text-lg font-semibold w-full text-center uppercase mt-1'>{user.full_name}</p>
        <ul className='mt-2'>
          <li><p>Username: {user.username}</p></li>
          <li><p>Email: {user.email ?? 'Not update'}</p></li>
          <li><GenderView gender={user.gender} /></li>
          <li><p>Joined at: {user.joined_at}</p></li>
        </ul>
        <CustomButton style={'bg-red-700 text-white'} title={"Logout"} onClick={logout} />
        {
        imageSelected
          ?
          <ConfirmSelectedImage />
          :
          ""
      }

    </React.Fragment>
  )
}

export default ProfileCard