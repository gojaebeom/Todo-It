import { atom } from "recoil";

export const userEditInitState = {
    id: "",
    email:"",
    userCode: "",
    nickname: "",
    profileImgFile:null,
    profilePreviewImg: "",
    createdAt: "",
}
export const userEditState = atom({
    key: 'userEditState', // unique ID (with respect to other atoms/selectors)
    default: userEditInitState, // default value (aka initial value)
});