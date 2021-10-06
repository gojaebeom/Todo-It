import { atom } from "recoil";

export const todosByMonthState = atom({
    key: 'todosByMonthState', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});