import React, { useEffect } from 'react'
import { HOST_URL } from '../api/constants';
import GenderView from './GenderView';

const AuthorBox = ({ author }) => {

    var author = author;

    useEffect(() => {

    }, [author])

    return (
        <div className='w-full mt-2' >
            <p className='text-lg w-full text-center rounded bg-opacity-60'>Diary author:</p>
            <div className='w-full mt-2  shadow-md p-2'>
                <div className='profile-view-image m-auto' style={{ backgroundImage: "url(" + HOST_URL + 'user/images/' + author.username + ")" }} ></div>
                <p className='text-md w-full font-bold mt-3'>{author.full_name}</p>
                <p className='text-sm'><em>Joined at : {author.joined_at}</em></p>
                <p className='text-sm'>{<GenderView gender={author.gender} />}</p>
            </div>
        </div>
    )
}

export default AuthorBox