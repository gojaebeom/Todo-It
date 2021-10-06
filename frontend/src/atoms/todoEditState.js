import { atom } from "recoil";

export const todoEditState = atom({
    key: 'todoEditState', // unique ID (with respect to other atoms/selectors)
    default: {
        id: "",
        title: "",
        description:"",
        isFinished:"",
    }, // default value (aka initial value)
});