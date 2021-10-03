import { atom } from "recoil";

export const updateUserModalState = atom({
    key: 'updateUserModalState', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
});