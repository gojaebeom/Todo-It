import { atom } from "recoil";

export const todosState = atom({
    key: 'todosState', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});