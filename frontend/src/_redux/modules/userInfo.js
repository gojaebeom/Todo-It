const initialState = {
    token: "",
    email:"",
    nickname:"",
    profileImg:"",
}
function userInfo(state=initialState, action){
    switch(action.type){
        case "SET_TOKEN":
            return {...state, token: action.payload};
        default:
            return state;
    }
}
export default userInfo;