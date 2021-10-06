import { atom } from "recoil";

export const userState = atom({
    key: 'userState', // unique ID (with respect to other atoms/selectors)
    default: {
        id: "",
        email:"",
        userCode: "",
        nickname: "",
        profileImg: "",
        profilePreviewImg: "",
        createdAt: "",
    }, // default value (aka initial value)
});