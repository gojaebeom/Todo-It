const initialState = {
    isLogin: false,
    email:"",
    nickname:"",
    profileImg:"",
}
function userInfo(state= initialState, action){
    switch(action.type){
        case "IS_LOGIN":
            return {...action.payload, isLogin: true};
        case "IS_LOGGED_OUT" :
            return {...state, isLogin: false};
        default:
            return initialState;
    }
}
export default userInfo;