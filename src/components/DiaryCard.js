import React, { useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'
import { HOST_URL } from '../api/constants'
import { useStore } from '../store'
import lazyload from '../images/lazyload-image.png'
const DiaryCard = ({ diary }) => {


  const [state, dispatch] = useStore()
  const { userDataLocalState } = state
  const [author, setAuthor] = useState(diary.author)
  const [isAuthor, setIsAuthor] = useState(false)
  useEffect(() => {
    checkAuthor()
  }, [author])

  const checkAuthor = () => {
    if (userDataLocalState) {
      userDataLocalState.username === diary.author.username ? setIsAuthor(true) : setIsAuthor(false)
    }

  }

  const Display = () => {
    return (
      diary.display ? <i className="fa-sharp fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>
    )
  }

  var image = HOST_URL + "images/" + diary.image_url
  var content = diary.content
  return (
    <div className={'card-box'}>
      <Link to={`/diary=${diary.id}`}>
        <h4 className='text-black text-sm font-semibold'>{diary.title}</h4>
        <p className='text-xs my-1 text-gray-500'><em>At: {diary.last_edited}</em></p>
        <div className='image-box my-5'>
          {
            diary.image_url !== "" ?
              <LazyLoadImage
                className='image-card rounded-md m-auto w-full'
                alt={diary.title}
                visibleByDefault={lazyload}
                placeholderSrc={lazyload}
                effect="blur"
                src={image} />
              : ""
          }
        </div>
        <div className='card-content-inner'>
          <div className='card-content text-sm ' dangerouslySetInnerHTML={{ __html: content?.length > 155 ? content?.slice(0, 150) + '...' : content }}>
          </div>
          {
            content?.length > 150
              ?
              <span className='text-sm text-cyan-700'><em>read more</em></span>
              :
              ""
          }

        </div>
        <p className='text-sm my-1 text-gray-500 flex flex-row items-center justify-between'>
          <em className='mr-2'>By: {diary.author.username}</em>
          {isAuthor ? <Display /> : ''}
        </p>
       
      </Link>
    </div>
  )
}

export default DiaryCard