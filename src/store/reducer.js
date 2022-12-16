import {
    GET_USER_DIARIES,
    SORT_DIARY,
    UPDATE_LOGIN_STATE,
    SORT_LAST_EDITED_DESC,
    LOCAL_LOGIN_STATE,
    USER_LOCAL,
    USER_DATA,
    UPDATE_COMMENT,
    LOAD_DIARIES_LIST,
    DIARY_PAGINATION_HOME
} from "../api/constants";

const initState = {
    userLoginState: localStorage.getItem(LOCAL_LOGIN_STATE) ?? false,
    userDataLocalState: JSON.parse(localStorage.getItem(USER_LOCAL)) ?? {},
    userDiaries: [],
    sort: SORT_LAST_EDITED_DESC,
    updateComment: false,
    diaryPagination: 0,
    listDiaries: [],
}


function reducer(state, action) {
    switch (action.type) {
        case UPDATE_LOGIN_STATE:
            return {
                ...state,
                userLoginState: action.payload
            }
        case SORT_DIARY:
            return {
                ...state,
                sort: action.payload
            }
        case GET_USER_DIARIES:
            return {
                ...state,
                userDiaries: action.payload
            }

        case UPDATE_COMMENT:
            return {
                ...state,
                updateComment: action.payload
            }
        case LOAD_DIARIES_LIST:
            return {
                ...state,
                listDiaries: action.payload
            }
        case DIARY_PAGINATION_HOME:
            return {
                ...state,
                diaryPagination: action.payload
            }
        case USER_DATA:
            return {
                ...state,
                userDataLocalState: action.payload
            }
        default:
            throw new Error('Sai action')
    }

}

export { initState };
export default reducer;