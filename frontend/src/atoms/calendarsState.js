import { atom } from "recoil";

export const calendarsState = atom({
    key: 'calendarsState', // unique ID (with respect to other atoms/selectors)
    default: [
        {
            id: "",
            name: "",
            thumbnail: "",
            thumbnailPreview: "",
            isPrivate: 0,
        }
    ], // default value (aka initial value)
});