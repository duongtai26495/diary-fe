import React, { useEffect, useState } from 'react'
import { render } from 'react-dom'
import { useParams } from 'react-router-dom'
import { HOST_URL } from '../api/constants'
import { getDiary } from '../api/functions'
import GenderView from '../components/GenderView'

const DiaryContent = () => {

    const [diary, setDiary] = useState({})
    const { id } = useParams()
    const [author, setAuthor] = useState({})
    useEffect(() => {
        loadDiary()
    }, [])


    const loadDiary = async () => {
        if (id) {
            const result = await getDiary(id);
            setDiary(result)
            setAuthor(result.author)
            console.log(author)
        }
    }


    return (
        <div className='w-full flex flex-col md:flex-row columns-1 md:columns-2 gap-2'>
            <div className='w-full md:w-3/4 p-5 px-2 md:px-20  flex flex-col rounded-md bg-white shadow'>

                <p className='text-xl font-bold mb-5 m-auto'>{diary.title}</p>
                {
                    diary.image_url !== ""
                        ?
                        <div className='w-full feature-image-diary rounded-md' style={{ backgroundImage: "url(" + HOST_URL + 'images/' + diary.image_url + ")" }}></div>
                        :
                        ""
                }

                <div className='w-full p-2 mt-5'>
                    <p className='text-sm text-gray-500'><em>{diary.last_edited}</em></p>
                    <div className='w-full mt-5 text-justify' dangerouslySetInnerHTML={{ __html: diary.content }}>

                    </div>
                </div>
            </div>
            <div className='sticky-side-bar w-full md:w-1/4 p-2 rounded-md bg-white sticky shadow'>
                <div className='w-full mt-2' >
                    <p className='text-lg w-full text-center rounded bg-opacity-60'>Diary author:</p>
                    <div className='w-full mt-2  shadow-md p-2'>
                        <div className='profile-view-image m-auto' style={{ backgroundImage: "url(" + HOST_URL + 'user/images/' + author.username + ")" }} ></div>
                        <p className='text-md w-full font-bold mt-3'>{author.full_name}</p>
                        <p className='text-sm'><em>Joined at : {author.joined_at}</em></p>
                        <p className='text-sm'>{<GenderView gender={author.gender} />}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiaryContent