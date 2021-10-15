import { atom } from "recoil";

export const todoStoreState = atom({
    key: 'todoStoreState', // unique ID (with respect to other atoms/selectors)
    default: {
        userId: "",
        calendarId: [],
        title: "",
        description:"",
        matchedDate: "",
    }, // default value (aka initial value)
});