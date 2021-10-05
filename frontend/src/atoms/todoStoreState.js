import { atom } from "recoil";

export const todoStoreInitState = {
    userId: "",
    calendarId: "",
    title: "",
    description:"",
    matchedDate: "",
}
export const todoStoreState = atom({
    key: 'todoStoreState', // unique ID (with respect to other atoms/selectors)
    default: todoStoreInitState, // default value (aka initial value)
});