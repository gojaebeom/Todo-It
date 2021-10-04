import { atom } from "recoil";

export const calendarStoreInitState = {
    name: "",
    thumbnail: "",
    thumbnailFile: null,
    isPrivate: 0,
}
export const calendarStoreState = atom({
    key: 'calendarStoreState', // unique ID (with respect to other atoms/selectors)
    default: calendarStoreInitState, // default value (aka initial value)
});