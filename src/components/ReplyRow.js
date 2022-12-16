import React from 'react'
import { HOST_URL } from '../api/constants'
import defaul_image from '../images/default.png'
const ReplyRow = (props) => {

    var { reply = {}, parent = {}, sub_parent = {} } = props
    var replyText = 'Reply to: '
    var author = reply.author
    var url_image = author ? HOST_URL + "image/profile/" + author.profile_image : defaul_image

    return (
        reply.parent_id == parent.id ?
            <div className={`mt-2 ml-5`}>
                <div className=' rounded bg-cyan-100 p-2'>
                    <p className='w-full text-xs py-2 font-black'>{replyText + " " + parent.author.full_name}</p>
                    <div className='w-full flex flex-row border-b border-white py-2 items-center justify-between'>
                        <div className=' flex flex-row  items-center'>
                        <div className='w-full author-comment-img mr-2' style={{backgroundImage : `url(${url_image})`}} ></div>

                            <p className='text-sm font-bold'>{author && author.full_name}</p>
                        </div>

                        <span className='text-xs text-gray-400 ml-2'><em>{reply.last_edited}</em></span>
                    </div>
                    <p className='flex flex-row items-center pt-2 text-base ' dangerouslySetInnerHTML={{ __html: reply.content }}></p>
                </div>
            </div>
            :
            ""
    )
}

export default ReplyRow