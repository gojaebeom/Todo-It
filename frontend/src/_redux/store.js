import { combineReducers } from "redux";
import profileMenu from "./modules/profileMenu";
import userInfo from "./modules/userInfo";
import tokenInfo from "./modules/tokenInfo";

const mainReducer = combineReducers({
    tokenInfo,
    userInfo,
    profileMenu
});
export default mainReducer;