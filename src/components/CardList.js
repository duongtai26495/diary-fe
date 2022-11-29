import React from 'react'
import DiaryCard from "./DiaryCard"



const CardList = ({listDiaries, styles}) => {

    var diaries = listDiaries
    return (
        <div className={'list-card-wrapper '+styles}>
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