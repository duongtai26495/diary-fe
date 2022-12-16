import React, { useState } from 'react'
import { MAX_PAGE_DIARY } from '../api/constants'
import { useStore } from '../store'
import { setDiaryPagination } from '../store/actions'

const PaginationControls = () => {

    const [state, dispatch] = useStore()
    const { diaryPagination } = state

    var maxPage = Number(localStorage.getItem(MAX_PAGE_DIARY))

    var pageNumber = []

    for (var i = 1; i <= maxPage; i++) {
        pageNumber.push(i)
    }

    const selectPage = (pageNumber) => {
        dispatch(setDiaryPagination(pageNumber))
    }

    const nextPage = () => {
        var max = maxPage - 1
        if (diaryPagination < max) {
            
            var increase = diaryPagination + 1
            dispatch(setDiaryPagination(increase))
        }
    }

    const prevPage = () => {
        if (diaryPagination > 0) {
            var decrease = diaryPagination - 1
            diaryPagination >= 0 && dispatch(setDiaryPagination(decrease))
        }
    }

    const goTop = () => {
        if (diaryPagination > 0) {
            dispatch(setDiaryPagination(0))
        }
    }

    const goEnd = () => {
        if (diaryPagination < maxPage) {
            dispatch(setDiaryPagination(maxPage - 1))
        }
    }


    return (
        <div className='p-2 bg-white bg-opacity-50 rounded-md mt-5 mb-5 flex flex-row justify-center'>
            <span disabled={diaryPagination < 1 ? true : false} onClick={() => { goTop() }} className={'cursor-pointer mx-1 '} ><i className={`fa-solid fa-angles-right rotate-180  ${diaryPagination < 1 ? 'bg-gray-500 text-white' : 'bg-white hover:bg-cyan-600 hover:text-white'} p-2 border rounded-full`}></i></span>
            <span disabled={diaryPagination < 1 ? true : false} onClick={() => { prevPage() }} className={'cursor-pointer '} ><i className={`fa-solid fa-angle-right rotate-180 ${diaryPagination < 1 ? 'bg-gray-500 text-white' : 'bg-white hover:bg-cyan-600 hover:text-white'} py-2 px-3 border rounded-full`}></i></span>
            <div className='flex flex-row items-center' >
                {
                    pageNumber.map((number, index) => {
                        return (
                            <p key={index} onClick={() => { selectPage(number - 1) }} className={`cursor-pointer  hover:text-white content-center flex justify-center px-5 ${number == diaryPagination + 1 ? 'text-white font-bold' : ''} `}>{number}</p>
                        )
                    })
                }
            </div>
            <span disabled={diaryPagination == maxPage - 1 ? true : false} onClick={() => { nextPage() }} className={'cursor-pointer mx-1 '} ><i className={`fa-solid fa-angle-right ${diaryPagination >= maxPage -1 ? 'bg-gray-500 text-white' : 'hover:bg-cyan-600 hover:text-white bg-white text-cyan-600'}  py-2 px-3 border rounded-full`}></i></span>
            <span disabled={diaryPagination == maxPage - 1 ? true : false} onClick={() => { goEnd() }} className={'cursor-pointer '} ><i className={`fa-solid fa-angles-right ${diaryPagination >= maxPage -1 ? 'bg-gray-500 text-white' : 'hover:bg-cyan-600 hover:text-white bg-white text-cyan-600'}  p-2 border rounded-full`}></i></span>
        </div>
    )
}

export default PaginationControls