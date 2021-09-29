import { combineReducers } from "redux";
import profileMenu from "./modules/profileMenu";
import userInfo from "./modules/userInfo";

const mainReducer = combineReducers({
    userInfo,
    profileMenu
});
export default mainReducer;