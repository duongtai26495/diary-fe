import { 
    GET_USER_DIARIES, 
    SORT_DIARY,
    UPDATE_LOGIN_STATE, 
    SORT_LAST_EDITED_DESC,
    LOCAL_LOGIN_STATE,
    USER_LOCAL,
    USER_DATA} from "../api/constants";
    
const initState = {
    userLoginState: localStorage.getItem(LOCAL_LOGIN_STATE) ?? false,
    userDataLocalState : JSON.parse(localStorage.getItem(USER_LOCAL)) ?? {},
    userDiaries: [],
    sort: SORT_LAST_EDITED_DESC
}


function reducer(state, action) {
    switch (action.type) {
        case UPDATE_LOGIN_STATE:
            return {
                ...state.userLoginState,
                userLoginState: action.payload
            }
        case SORT_DIARY:
            return {
                ...state.diaries,
                sort: action.payload
            }
        case GET_USER_DIARIES:
            return {
                ...state.diaries,
                userDiaries : action.payload
            }
        case USER_DATA:
            return {
                ...state.userDataLocalState,
                userDataLocalState: action.payload
            }
        default:
            throw new Error('Sai action')
    }

}

export { initState };
export default reducer;