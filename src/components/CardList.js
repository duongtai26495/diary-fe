import React from 'react'
import DiaryCard from "./DiaryCard"



const CardList = ({listDiaries}) => {

    var diaries = listDiaries
  
    return (
        <div className='list-card-wrapper columns-2 md:columns-3 lg:columns-4 xl:columns-5'>
           {
             diaries?.map((diary, index) => {
                return (
                    <DiaryCard key={diary.id} diary={diary} />
                )
            })
           }
        </div>

    )
}

export default CardList