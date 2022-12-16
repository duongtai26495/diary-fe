import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { HOST_URL, LOCAL_LOGIN_STATE, USER_LOCAL } from '../api/constants'
import { getCommentsOfDiary, getDiary } from '../api/functions'
import AuthorBox from '../components/AuthorBox'
import { useStore } from '../store'
import default_image from '../images/default_diary.png'
import CommentView from '../components/CommentView'
import NewComment from '../components/NewComment'
import CustomButton from '../components/CustomButton'
const DiaryContent = () => {

    const [state, dispatch] = useStore()
    const { userDataLocalState, userLoginState, updateComment } = state

    const [diary, setDiary] = useState({})
    const { id } = useParams()
    const [author, setAuthor] = useState({})
    const [isAuthor, setIsAuthor] = useState(false)
    const navigate = useNavigate()
    const [loaded, setLoaded] = useState(false)
    const [comments, setComment] = useState([])
    useEffect(() => {

        const checkAuthorDisplayTools = (author) => {
            if (userDataLocalState) {
                userDataLocalState.username === author.username ? setIsAuthor(true) : setIsAuthor(false)
            }
        }

        const loadDiary = async () => {
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
        }

        const loadComment = async () => {
            if (id) {
                const result = await getCommentsOfDiary(id);
                if (result) {
                    setComment(result)
                }
            }
        }

        loadComment()
        loadDiary()
    }, [userDataLocalState, updateComment])


    return (
        <div className='w-full flex flex-col md:flex-row columns-1 md:columns-2 gap-2'>
            <div className='w-full md:w-2/3 flex flex-col rounded-md overflow-hidden'>
                {
                    diary.image_url !== "" ?
                        <img className='w-full feature-img m-auto'
                            alt={diary.title}
                            onLoad={() => setLoaded(true)}
                            src={loaded ? HOST_URL + 'image/' + diary.image_url : default_image} 
                            onError={(e)=> { e.target.onerror = null; e.target.src = default_image}}
                            
                            />
                        : ""
                }
                <div className='w-full p-5 px-2 md:px-10  flex flex-col bg-white shadow'>

                    <p className='text-3xl font-bold mb-2 m-auto'>{diary.title}</p>

                    <div className='w-full p-2 '>

                        <p className='text-sm text-gray-500'><em>{diary.last_edited}</em> </p>
                        <div className='w-full mt-2 text-justify bg-slate-100 p-5 rounded-md' dangerouslySetInnerHTML={{ __html: diary.content }}>
                        </div>
                    </div>
                    <div className='w-full border-t my-5 py-1'>
                        {
                            comments.length == 0 && <p className='text-lg font-bold'>No comment on this diary</p>
                        }
                        {
                            (localStorage.getItem(LOCAL_LOGIN_STATE) && localStorage.getItem(USER_LOCAL) != null)
                                ?
                                <NewComment diaryId={id} />
                                :
                                <CustomButton title={'Login to add a comment'} onClick={() => navigate("/profile")} style={'bg-yellow-700 text-white my-3'} />
                        }



                        {
                            comments.length > 0 &&
                            <>
                                <p>Comment ({comments.length}) :</p> <CommentView data={comments} />
                            </>
                        }

                    </div>
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
                </div>


            </div>

            <div className='sticky-side-bar w-full md:w-1/3 p-2 rounded-md bg-white sticky top-2 lg:top-16 shadow'>

                <AuthorBox author={author} />

            </div>
        </div>
    )
}

export default DiaryContent