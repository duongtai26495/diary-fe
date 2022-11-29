import React from 'react'
import { Link } from 'react-router-dom'
import { HOST_URL } from '../api/constants'
const DiaryCard = ({diary}) => {

  var image = HOST_URL + "images/" +diary.image_url

  return (
    <div className='card-box'>
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
            <div className='card-content text-sm '  dangerouslySetInnerHTML={{ __html: diary.content.slice(0,155)}}>
              
            </div>
            <span className='text-sm text-cyan-700'>...<em>read more</em></span>
        </div>
        <p className='text-sm my-1 text-gray-500'>
          By: <em>{diary.author.username}</em>
        </p>
        </Link>
    </div>
  )
}

export default DiaryCard