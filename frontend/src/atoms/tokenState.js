import { atom } from "recoil";

export const tokenInitState = {
    token: "",
    iss: "",
    sub: "",
    id: "",
    exp: "",
    iat: "",
}
export const tokenState = atom({
    key: 'tokenState', // unique ID (with respect to other atoms/selectors)
    default: tokenInitState, // default value (aka initial value)
});