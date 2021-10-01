const initialState = {
    email: "",
    nickname: "",
    profileImg: "",
}
function userInfo(state=initialState, action){
    switch(action.type){
        // case "LOGIN":
        //     return {...state, token: action.payload};
        // case "LOGOUT":
        //     return {...initialState};
        default:
            return state;
    }
}
export default userInfo;