const initialState = {
    isLogin: false,
    email:"",
    nickname:"",
    profileImg:"",
}
function userInfo(state=initialState, action){
    switch(action.type){
        case "IS_LOGIN":
            return {...action.payload, isLogin: true};
        case "IS_LOGOUT" :
            return {...initialState, isLogin: false};
        default:
            return state;
    }
}
export default userInfo;