import { atom } from "recoil";

export const calendarStoreState = atom({
    key: 'calendarStoreState', // unique ID (with respect to other atoms/selectors)
    default: {
        name: "",
        thumbnail: "",
        thumbnailFile: null,
        isPrivate: 0,
    }, // default value (aka initial value)
});