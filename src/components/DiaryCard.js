import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HOST_URL } from '../api/constants'
import { useStore } from '../store'

const DiaryCard = ({diary}) => {

  
  const [state, dispatch] = useStore()
  const { userDataLocalState } = state
  const [author, setAuthor] = useState(diary.author)
  const [isAuthor, setIsAuthor] = useState(false)
  
  useEffect(()=>{
    checkAuthor()
  },[author])

  const checkAuthor = () => {
    if(userDataLocalState){
      userDataLocalState.username === diary.author.username ? setIsAuthor(true) : setIsAuthor(false)
    }
    
  }

  const Display = () => {
    return(
        diary.display ? <i className="fa-sharp fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>
    )
  }

  var image = HOST_URL + "images/" +diary.image_url
  var content = diary.content
  return (
    <div className={'card-box'}>
      <Link to={`/diary=${diary.id}`}>
      <h4 className='text-black text-sm font-semibold'>{diary.title}</h4>
      <p className='text-xs my-1 text-gray-500'><em>At: {diary.last_edited}</em></p>
      <div className='image-box my-5'>
      {
        diary.image_url !== "" ?
        <img className='m-auto' src={image} />
        : ""
      }
        </div>
        <div className='card-content-inner'>
            <div className='card-content text-sm '  dangerouslySetInnerHTML={{ __html: content?.length > 155 ? content?.slice(0,150) + '...' : content  }}>
            </div>
            {
              content?.length > 150
              ? 
              <span className='text-sm text-cyan-700'><em>read more</em></span> 
              : 
              ""
            }
            
        </div>
        <p className='text-sm my-1 text-gray-500'>
          By: <em>{diary.author.username}</em>
        </p>
        {isAuthor ? <Display /> : ''}
        </Link>
    </div>
  )
}

export default DiaryCard