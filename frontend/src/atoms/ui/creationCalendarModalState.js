import { atom } from "recoil";

export const creationCalendarModalState = atom({
    key: 'creationCalendarModalState', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
});