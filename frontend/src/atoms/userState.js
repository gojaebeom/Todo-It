import { atom } from "recoil";

export const userInitState = {
    id: "",
    email:"",
    userCode: "",
    nickname: "",
    profileImg: "",
    profilePreviewImg: "",
    createdAt: "",
}
export const userState = atom({
    key: 'userState', // unique ID (with respect to other atoms/selectors)
    default: userInitState, // default value (aka initial value)
});