const initialState = {
    token: "",
    iss: "",
    sub: "",
    id: "",
    exp: "",
    iat: "",
}
function tokenInfo(state=initialState, action){
    switch(action.type){
        case "LOGIN":
            return {...state, ...action.payload};
        case "LOGOUT":
            return {...initialState};
        default:
            return state;
    }
}
export default tokenInfo;