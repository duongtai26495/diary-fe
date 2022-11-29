import React, { useEffect, useRef, useState } from 'react'
import JoditEditor from 'jodit-react';
import { uploadImageAPI, newPostAPI } from '../api/functions';
import CustomButton from '../components/CustomButton';
import { ACCESS_TOKEN } from '../api/constants';
const NewDiary = () => {

    const [title, setTitle] = useState()
    const [content, setContent] = useState()
    const [featureImage, setFeatureImage] = useState()
    const titleRef = useRef()
    useEffect(()=>{
        titleRef.current.focus()
    },[])

    useEffect(() => {
        return (() => {
            featureImage && URL.revokeObjectURL(featureImage.preview)
        })
      }, [featureImage])
    

    const saveNewPost = async () => {
        let post = {
            title,
            content
        }
        let data = {
            image: featureImage,
            token: localStorage.getItem(ACCESS_TOKEN)
        }

        const image_url = await uploadImageAPI(data)
        console.log(image_url)
        const result = await newPostAPI(image_url, post)
        console.log(result)

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
                <CustomButton title={'Save & Close'} onClick={()=>saveNewPost()} style={'mt-5 w-full bg-cyan-700 text-white'} />
            </div>


            <div className='w-2/5 p-2 bg-slate-100 rounded-md' >
                <p className='text-sm'>Feature image</p>
                 <div className='preview-image-diary w-full my-2 rounded-md' style={{ backgroundImage: `url( ${featureImage != null ? featureImage.preview : '' })`  }}>
                
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

export default NewDiary