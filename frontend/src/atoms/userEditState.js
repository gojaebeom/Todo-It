import { atom } from "recoil";

export const userEditState = atom({
    key: 'userEditState', // unique ID (with respect to other atoms/selectors)
    default: {
        id: "",
        email:"",
        userCode: "",
        nickname: "",
        profileImgFile:null,
        profilePreviewImg: "",
        createdAt: "",
    }, // default value (aka initial value)
});