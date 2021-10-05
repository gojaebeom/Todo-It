import { atom } from "recoil";

export const todosInitState = [];
export const todosState = atom({
    key: 'todosState', // unique ID (with respect to other atoms/selectors)
    default: todosInitState, // default value (aka initial value)
});