import React, { useEffect, useState } from 'react'
import { HOST_URL, SORT_LAST_EDITED_DESC, USER_LOCAL } from '../api/constants'
import { getAllDiaryByAuthor, getDiaryByAuthor, logoutUser, sortDiaries, uploadImageAPI } from '../api/functions'
import { useStore } from '../store'
import { loadUserLocal, updateLoginState } from '../store/actions'
import CustomButton from './CustomButton'
import CardList from './CardList'
import GenderView from './GenderView'

const ProfileView = () => {

  const [state, dispatch] = useStore()
  const { userDataLocal } = state
  const [labelUpload, setLabelUpload] = useState('Edit Image')
  const [diaries, setDiaries] = useState([])
  const [imageSelected, setImageSelected] = useState()
  const [sort, setSort] = useState(SORT_LAST_EDITED_DESC)

  var user = userDataLocal ? userDataLocal : JSON.parse(localStorage.getItem(USER_LOCAL))
  const logout = () => {
    logoutUser()
    dispatch(updateLoginState(false))
  }

  useEffect(() => {
    getDiary()
  }, [userDataLocal])

  const getDiary = async () => {
    if (userDataLocal) {
      var data = {
        token: userDataLocal.token
      }
      const result = await getAllDiaryByAuthor(data)
      const listDiaries = updateSort(result)
      setDiaries(listDiaries)
    }

  }

  const updateSort = list => {
    var data = {
      sort,
      list
    }

    return sortDiaries(data)
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
    if (imageSelected && userDataLocal) {
      var data = {
        username: userDataLocal.username,
        token: userDataLocal.token,
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
    <div className='w-full rounded-md flex flex-col md:flex-row md:columns-2 columns-1 gap-2'>
      <div className='md:w-1/3 w-full shadow p-2 rounded-md bg-white'>
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
      </div>
      <div className='md:w-2/3 w-full shadow p-2 rounded-md bg-white bg-opacity-90'>
        <CardList styles={'columns-2 lg:columns-3'} listDiaries={diaries} />
      </div>
      {
        imageSelected
          ?
          <ConfirmSelectedImage />
          :
          ""
      }

    </div>
  )
}

export default ProfileView