import { ADD_DIARY, LOAD_DIARIES_LIST, GET_USER_DIARIES, SORT_DIARY, UPDATE_COMMENT, UPDATE_LOGIN_STATE, UPDATE_SHOW_MENU_BAR, USER_DATA, DIARY_PAGINATION_HOME } from "../api/constants";

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

export const updateNewComment = payload => ({
    type: UPDATE_COMMENT,
    payload
})

export const loadAllDiaries = payload => ({
    type: LOAD_DIARIES_LIST,
    payload
})

export const setDiaryPagination = payload => ({
    type: DIARY_PAGINATION_HOME,
    payload
})