import { ADD_DIARY, GET_USER_DIARIES, SORT_DIARY, UPDATE_LOGIN_STATE, UPDATE_SHOW_MENU_BAR, USER_DATA } from "../api/constants";

export const updateLoginState = payload => ({
    type:UPDATE_LOGIN_STATE,
    payload
})
export const getUserDiaries = payload => ({
    type:GET_USER_DIARIES,
    payload
})

export const changeSort = payload => ({
    type:SORT_DIARY,
    payload
})

export const loadUserLocal = payload => ({
    type: USER_DATA,
    payload
})