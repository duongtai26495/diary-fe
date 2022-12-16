import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { HOST_URL, LOCAL_LOGIN_STATE, SORT_LAST_EDITED_DESC, USER_LOCAL } from '../api/constants'
import { useStore } from '../store'
import NewComment from './NewComment'
import ReplyRow from './ReplyRow'
import defaul_image from '../images/default.png'
import { sortList } from '../api/functions'
const CommentRow = (props) => {
    var { comment = {}, replies = [] } = props
    var author = comment.author
    var style = ""

    const reply_list = () => {
        var data = {
            list: replies,
            sort: SORT_LAST_EDITED_DESC
        }

        return sortList(data)
    }
    var url_image = author ? HOST_URL + "image/profile/" + author.profile_image : defaul_image
    return (
        <div className={`mt-2 ${style}`}>
            <div className=' rounded bg-cyan-100 p-2'>
                <div className='w-full flex flex-row border-b border-white py-2 items-center justify-between'>
                    <div className=' flex flex-row  items-center'>
                        <div className='w-full author-comment-img mr-2' style={{backgroundImage : `url(${url_image})`}} ></div>
                        <p className='text-sm font-bold'>{author && author.full_name}</p>
                    </div>

                    <span className='text-xs text-gray-400 ml-2'><em>{comment.last_edited}</em></span>
                </div>
                <p className='flex flex-row items-center pt-2 text-base ' dangerouslySetInnerHTML={{ __html: comment.content }}></p>
                {
                    (localStorage.getItem(LOCAL_LOGIN_STATE) && localStorage.getItem(USER_LOCAL) != null)
                        ?
                        <NewComment comment={comment} diaryId={comment.diary_id} />
                        :
                        ""
                }

            </div>

            {
                reply_list()?.map((reply) => {
                    return (
                        <ReplyRow key={reply.id} reply={reply} parent={comment} />
                    )
                })
            }


        </div>
    )
}

export default CommentRow