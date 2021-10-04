import { atom } from "recoil";

export const calendarsInitState = [
    {
        id: "",
        name: "",
        thumbnail: "",
        thumbnailPreview: "",
        isPrivate: 0,
    }
]
export const calendarsState = atom({
    key: 'calendarsState', // unique ID (with respect to other atoms/selectors)
    default: calendarsInitState, // default value (aka initial value)
});