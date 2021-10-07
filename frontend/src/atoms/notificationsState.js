import { atom } from "recoil";

export const notificationsState = atom({
    key: 'notificationsState', // unique ID (with respect to other atoms/selectors)
    default: [
        {
            id: "",
            type: "",
            actionUrl: "",
            content: ""
        }
    ], // default value (aka initial value)
});