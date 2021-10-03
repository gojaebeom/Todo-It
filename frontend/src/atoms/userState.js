import { atom } from "recoil";

export const userInitState = {
    userId: "",
    name: "",
    nickname: "",
    profileImg: "",
    profilePreviewImg: "",
    createdAt: "",
}
export const userState = atom({
    key: 'userState', // unique ID (with respect to other atoms/selectors)
    default: userInitState, // default value (aka initial value)
});