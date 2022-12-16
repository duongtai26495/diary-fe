import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { SORT_CREATED_ASC, SORT_CREATED_DESC, SORT_LAST_EDITED_DESC } from '../api/constants'
import { sortList } from '../api/functions'
import { useStore } from '../store'
import CommentRow from './CommentRow'

const CommentView = (props) => {

    const listComments = () => {
        var data = {
            sort:SORT_CREATED_DESC,
            list: comments
        }
       return sortList(data)
    }
    const [comments, setComments] = useState([])
    const [replies, setReplies] = useState([])

    useEffect(()=>{
        var {data = []} = props
    
        var list_comment = data.filter((comment)=>{
            return comment.parent_id == ""
        })
        setComments(list_comment)

        var list_reply = data.filter((comment)=>{
            return comment.parent_id != ""
        })

        setReplies(list_reply)
    },[props])

    return (
        <div className={'list-card-wrapper '}>
            {
                listComments()?.map((comment) => {
                    return (
                        <CommentRow 
                        key={comment.id} 
                        comment = {comment}
                        replies = {replies}
                        />
                    )
                })
            }
        </div>

    )
}

export default CommentView