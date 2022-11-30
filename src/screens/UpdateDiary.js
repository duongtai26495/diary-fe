import React, { useEffect, useRef, useState } from 'react'
import JoditEditor from 'jodit-react';
import { uploadImageAPI, newPostAPI, loadDiaryToUpdate, updateDiary } from '../api/functions';
import CustomButton from '../components/CustomButton';
import { ACCESS_TOKEN, HOST_URL } from '../api/constants';
import { useNavigate, useParams } from 'react-router-dom';


const UpdateDiary = () => {

    const { id } = useParams()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [isDisplay, setDisplay] = useState()
    const [featureImage, setFeatureImage] = useState()

    const titleRef = useRef()
    const [image_diary, setImageUrl] = useState()
    const [isLoading, setLoading] = useState(false)
    const [saveResult, setSaveResult] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        loadDiary()
        titleRef.current.focus()
    }, [])


    useEffect(() => {
        return (() => {
            featureImage && URL.revokeObjectURL(featureImage.preview)
        })
    }, [featureImage])


    const loadDiary = async () => {
        const result = await loadDiaryToUpdate(id);
        if (result) {
            setTitle(result.title)
            setContent(result.content)
            setImageUrl(result.image_url)
            setDisplay(result.display)
        }else{

            navigate('/')
        }

}

const updatePost = async () => {
    setLoading(true)
    let post = {
        title,
        content,
        id,
        display: isDisplay
    }


    if (featureImage != null) {
        let data = {
            image: featureImage,
            token: localStorage.getItem(ACCESS_TOKEN)
        }

        const image_url = await uploadImageAPI(data)
        const result = await updateDiary(image_url, post)
        if (result.status === 'SUCCESS') {
            navigate("/")
        } else {
            setLoading(false)
            setSaveResult('Update failed. Try again')
        }
    } else {
        const result = await updateDiary(image_diary, post)
        if (result.status === 'SUCCESS') {
            navigate("/")
        } else {
            setLoading(false)
            setSaveResult('Update failed. Try again')
        }
    }
}


return (
    <div className='w-full flex flex-col md:flex-row columns-1 md:columns-2 gap-2 '>
        <div className='w-3/5 bg-white bg-opacity-90 p-5 rounded-md'>
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
            <div className='w-full my-2 flex flex-row p-2 bg-slate-300 rounded-sm'>
                <p className='mr-2'>Display diary ?</p>
                <input id='yes' type="radio" onChange={() => setDisplay(true)} checked={isDisplay == true} value={true} name="true" /> <label htmlFor='yes' className='ml-1'>Yes</label>
                <input id='no' className='ml-2' onChange={() => setDisplay(false)} checked={isDisplay == false} type="radio" value={false} name="false" /> <label htmlFor='no' className='ml-1'>No</label>
            </div>
            <CustomButton isLoading={isLoading} title={'Save & Close'} onClick={() => updatePost()} style={'mt-5 w-full bg-cyan-700 text-white'} />
            {
                saveResult !== '' ? <p className='w-full text-red-700 text-center p-3'><em>{saveResult}</em></p> : ""
            }
        </div>


        <div className='w-2/5 p-2 bg-slate-100 rounded-md' >
            <p className='text-sm'>Feature image</p>
            <div className='preview-image-diary w-full my-2 rounded-md' style={{ backgroundImage: `url( ${featureImage != null ? featureImage.preview : HOST_URL + "images/" + image_diary})` }}>

                <div className='select-f-image bg-white bg-opacity-70  text-center flex-col'>
                    <label htmlFor='select-image' className='cursor-pointer w-full p-2'>Select Image</label>
                    <input className='hidden' id='select-image' type={'file'}
                        onChange={(e) => {
                            var file = e.target.files[0]
                            file.preview = URL.createObjectURL(file)
                            setFeatureImage(file)
                        }}
                    />
                </div>

            </div>
        </div>
    </div>
)
}

export default UpdateDiary