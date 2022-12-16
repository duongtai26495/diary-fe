import React from 'react'
import JoditEditor from 'jodit-react';
import { useState } from 'react';
import CustomButton from './CustomButton';
import { saveNewComment } from '../api/functions';
import { useStore } from '../store';
import {updateNewComment} from '../store/actions'
const NewComment = (props) => {

    const [state, dispatch] = useStore()
    const {updateComment } = state
    var { comment = {} } = props
    var diary_id = props.diaryId
    var parent_id = comment.id ?? ''
    var author = comment.author ?? ''
    const [isReply, setReply] = useState(false)
    const [content, setContent] = useState('')
    const addNewComment = async () => {
        var data = {
            content,
            diary_id,
            parent_id
        }
        const result = await saveNewComment(data)
        if(result.status === 'SUCCESS'){
            dispatch(updateNewComment(!updateComment))
            setReply(false)
        }
        setContent('')
    }

    return (
        parent_id !== ''
        ?
        <div id='comment-form' className='w-full py-2'>
            {
                isReply
                    ?
                    <div className='mt-5'>
                        <p className='text-sm font-bold'>
                                Reply to : {author.full_name}
                        </p>

                        <JoditEditor
                            value={content}
                            tabIndex={1} // tabIndex of textarea
                            onChange={e => { setContent(e) }}
                        />

                        <div className='w-full flex flex-row columns-1 md:columns-2 gap-1'>
                            <CustomButton disabled={content === '' ? true : false} onClick={() => { addNewComment() }} title={'Send'} style={'bg-cyan-600 mt-2 text-white font-bold'} />
                            <CustomButton onClick={() => { setReply(false) }} title={'Cancel'} style={'bg-yellow-600 mt-2 text-white font-bold'} />
                        </div>
                    </div>

                    :
                    <p onClick={() => { setReply(true) }} className={'text-cyan-500 font-bold cursor-pointer'} >Reply</p>
            }
        </div>
        :
        <div className='w-full my-5'>
                        <p className='text-sm font-bold'>
                                Add new comment:
                        </p>

                        <JoditEditor
                            value={content}
                            tabIndex={1} // tabIndex of textarea
                            onChange={e => { setContent(e) }}
                        />

                        <div className='w-full flex flex-row columns-1 md:columns-2 gap-1'>
                            <CustomButton disabled={content === '' ? true : false} onClick={() => { addNewComment() }} title={'Send'} style={'bg-cyan-600 mt-2 text-white font-bold'} />
                           </div>
                    </div>
    )
}

export default NewComment