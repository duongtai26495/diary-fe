import { ADD_DIARY, GET_DIARIES, SORT_DIARY, UPDATE_LOGIN_STATE, UPDATE_SHOW_MENU_BAR, UPDATE_USER_INFO } from "../api/constants";

export const updateLoginState = payload => ({
    type:UPDATE_LOGIN_STATE,
    payload
})

export const switchMenuBarShow = payload => ({
    type:UPDATE_SHOW_MENU_BAR,
    payload
})

export const getDiariesList = payload => ({
    type:GET_DIARIES,
    payload
})

export const addMoreDiary = payload => ({
    type:ADD_DIARY,
    payload
})

export const changeSort = payload => ({
    type:SORT_DIARY,
    payload
})


export const updateUserInfo = payload => ({
    type:UPDATE_USER_INFO,
    payload
})