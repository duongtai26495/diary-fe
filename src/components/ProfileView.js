import React, { useEffect, useState } from 'react'
import { ACCESS_TOKEN, HOST_URL, SORT_LAST_EDITED_DESC, USER_LOCAL } from '../api/constants'
import { getAllDiaryByAuthor, getDiaryByAuthor, logoutUser, sortDiaries, uploadImageAPI } from '../api/functions'
import { useStore } from '../store'
import { loadUserLocal, updateLoginState } from '../store/actions'
import CustomButton from './CustomButton'
import CardList from './CardList'
import GenderView from './GenderView'
import { useNavigate } from 'react-router-dom'
import ProfileCard from './ProfileCard'

const ProfileView = () => {

  const [state, dispatch] = useStore()
  const { userDataLocalState, userLoginState } = state
  const [diaries, setDiaries] = useState([])
  var user = userDataLocalState ? userDataLocalState : JSON.parse(localStorage.getItem(USER_LOCAL))

  useEffect(() => {
    const updateSort = list => {
      var data = {
        sort:SORT_LAST_EDITED_DESC,
        list
      }
      return sortDiaries(data)
    }
  
    const getDiary = async () => {
      if (userDataLocalState) {
        var data = {
          token: localStorage.getItem(ACCESS_TOKEN)
        }
        const result = await getAllDiaryByAuthor(data)
        const listDiaries = updateSort(result)
        setDiaries(listDiaries)
      }
  
    }
    
  
    getDiary()
  }, [userLoginState])

  

  


  return (
    <div className='w-full rounded-md flex flex-col md:flex-row md:columns-2 columns-1 gap-2'>
      <div className='md:w-1/3 h-fit w-full shadow p-2 rounded-md bg-white sticky top-2 lg:top-16'>
        <ProfileCard user={user} />
      </div>
      <div className='md:w-2/3 w-full shadow p-2 rounded-md bg-white bg-opacity-90'>
        <CardList styles={'columns-2 lg:columns-3'} listDiaries={diaries} />
      </div>
     
    </div>
  )
}

export default ProfileView