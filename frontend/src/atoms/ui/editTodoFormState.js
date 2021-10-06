import { atom } from "recoil";

export const editTodoFormState = atom({
    key: 'editTodoFormState', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
});