import { combineReducers } from "redux";
import profileMenu from "./modules/profileMenu";

const mainReducer = combineReducers({
    profileMenu
});
export default mainReducer;