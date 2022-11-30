import React, { useEffect, useState } from 'react'
import { render } from 'react-dom'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { HOST_URL } from '../api/constants'
import { getDiary } from '../api/functions'
import AuthorBox from '../components/AuthorBox'
import { useStore } from '../store'

const DiaryContent = () => {

    const [state, dispatch] = useStore()
    const { userDataLocalState } = state
    const [diary, setDiary] = useState({})
    const { id } = useParams()
    const [author, setAuthor] = useState({})
    const [isAuthor, setIsAuthor] = useState(false)
    const navigate = useNavigate()
    const [loadingPage, setLoadingPage] = useState(true)


    useEffect(() => {
        loadDiary()
    }, [userDataLocalState])

    const checkAuthorDisplayTools = (author) => {
        if (userDataLocalState) {
            userDataLocalState.username === author.username ? setIsAuthor(true) : setIsAuthor(false)
        }
    }


    const loadDiary = async () => {
        setLoadingPage(true)
        if (id) {
            const result = await getDiary(id);
            const diaryAuthor = result.author
            if (!result.display && diaryAuthor.username !== userDataLocalState.username) {
                navigate('/')
            }
            if (!result.display && diaryAuthor.username === userDataLocalState.username) {
                setDiary(result)
                setAuthor(diaryAuthor)
                checkAuthorDisplayTools(diaryAuthor)
            }
            if (result.display) {
                setDiary(result)
                setAuthor(diaryAuthor)
                checkAuthorDisplayTools(diaryAuthor)
            }
        }
        setLoadingPage(false)
    }

    const RenderContent = () => {
        return (
            <div className='w-full flex flex-col md:flex-row columns-1 md:columns-2 gap-2'>
                <div className='w-full md:w-3/4 p-5 px-2 md:px-20  flex flex-col rounded-md bg-white shadow'>
                    {

                        isAuthor ?
                            <div className='p-2 rounded mb-5 bg-blue-200 '>

                                <p className='cursor-pointer text-black text-md hover:text-teal-500'>
                                    <Link to={'/diary/edit/id=' + id} >
                                        <i className="fas fa-file-edit "></i> Edit
                                    </Link>
                                </p>
                            </div>
                            :
                            ""
                    }

                    <p className='text-xl font-bold mb-5 m-auto'>{diary.title}</p>
                    {
                        diary.image_url !== ""
                            ?
                            <div className='w-full feature-image-diary rounded-md' style={{ backgroundImage: "url(" + HOST_URL + 'images/' + diary.image_url + ")" }}></div>
                            :
                            ""
                    }

                    <div className='w-full p-2 mt-5'>

                        <p className='text-sm text-gray-500'><em>{diary.last_edited}</em> </p>
                        <div className='w-full mt-5 text-justify' dangerouslySetInnerHTML={{ __html: diary.content }}>
                        </div>
                    </div>
                </div>
                <div className='sticky-side-bar w-full md:w-1/4 p-2 rounded-md bg-white sticky shadow'>

                    <AuthorBox author={author} />

                </div>
            </div>
        )
    }

    return (
        <>
            {
                !loadingPage ?
                    <RenderContent />
                    :
                    <></>
            }
        </>

    )
}

export default DiaryContent