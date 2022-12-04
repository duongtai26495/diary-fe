import React, { useEffect, useRef, useState } from 'react'
import JoditEditor from 'jodit-react';
import { uploadImageAPI, newPostAPI } from '../api/functions';
import CustomButton from '../components/CustomButton';
import { ACCESS_TOKEN } from '../api/constants';
import { useNavigate } from 'react-router-dom';

import lazyload from '../images/lazyload-image.png'
const NewDiary = () => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [featureImage, setFeatureImage] = useState()
    const titleRef = useRef()
    const [isLoading, setLoading] = useState(false)
    const [saveResult, setSaveResult] = useState('')
    const navigate = useNavigate()
    const inputImageRef = useRef()
    useEffect(() => {
        titleRef.current.focus()
    }, [])

    const selectImageClick = () => {
        inputImageRef.current.click()
    }

    useEffect(() => {
        return (() => {
            featureImage && URL.revokeObjectURL(featureImage.preview)
        })
    }, [featureImage])


    const saveNewPost = async () => {
        setLoading(true)
        let post = {
            title,
            content
        }
        let data = {
            image: featureImage,
            token: localStorage.getItem(ACCESS_TOKEN)
        }

        if (featureImage != null) {
            const image_url = await uploadImageAPI(data)
            const result = await newPostAPI(image_url, post)
            if (result.status === 'SUCCESS') {
                navigate("/")
            } else {
                setLoading(false)
                setSaveResult('Create new diary failed. Try again')
            }
        } else {
            const result = await newPostAPI("", post)
            if (result.status === 'SUCCESS') {
                navigate("/")
            } else {
                setLoading(false)
                setSaveResult('Create new diary failed. Try again')
            }
        }
        setLoading(false)
    }


    return (
        <div className='w-full flex flex-col md:flex-row columns-1 md:columns-2 gap-2 '>
            <div className='w-full lg:w-3/5 bg-white bg-opacity-90 p-5 rounded-md'>
                <input
                    value={title}
                    ref={titleRef}
                    placeholder='How are you today?'
                    className='w-full bg-slate-300 p-2 rounded text-black'
                    onChange={e => setTitle(e.target.value)} />
                <div className='mt-5'>
                    <JoditEditor
                        value={content}
                        tabIndex={1} // tabIndex of textarea
                        onChange={e => { setContent(e) }}
                    />

                </div>
                <CustomButton isLoading={isLoading} title={'Save & Close'} onClick={() => saveNewPost()} style={'mt-5 w-full bg-cyan-700 text-white mt-3'} />
                {
                    saveResult !== '' ? <p className='w-full text-red-700 text-center p-3'><em>{saveResult}</em></p> : ""
                }
            </div>


            <div className='w-full lg:w-2/5 p-2 bg-slate-100 rounded-md' >
                <div className='flex flex-row justify-between items-center p-2'>
                    <p className='text-sm'>Feature image</p>
                    {
                        featureImage != null
                            ?
                            <button className=' remove-preview cursor-pointer' onClick={()=> setFeatureImage()}>
                                <i className="fa-solid fa-trash mr-2"></i>
                                Remove
                            </button>
                            :
                            ""
                    }

                </div>

                <div className='preview-image-diary w-full my-2 rounded-md' style={{ backgroundImage: `url( ${featureImage != null ? featureImage.preview : ''})` }}>

                    <img className='w-full' src={featureImage != null ? featureImage.preview : lazyload} />

                    <CustomButton
                        onClick={() => selectImageClick()}
                        title={'Select Image'}
                        style={'w-full bg-cyan-600 text-white bottom-0 absolute bg-opacity-50 rounded-none mt-3'}
                    />
                    <input className='hidden w-full' id='select-image' type={'file'}
                        ref={inputImageRef}
                        onChange={(e) => {
                            var file = e.target.files[0]
                            file.preview = URL.createObjectURL(file)
                            setFeatureImage(file)
                        }}
                    />

                </div>
            </div>
        </div>
    )
}

export default NewDiary