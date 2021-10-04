import { atom } from "recoil";

export const calendarDetailInitState = {
    id: "",
    name: "",
    thumbnail: "",
    thumbnailPreview: "",
    isPrivate: 0,
};

export const calendarDetailState = atom({
    key: 'calendarDetailState', // unique ID (with respect to other atoms/selectors)
    default: calendarDetailInitState, // default value (aka initial value)
});