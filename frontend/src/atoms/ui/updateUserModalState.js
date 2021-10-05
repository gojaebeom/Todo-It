import { atom } from "recoil";
const updateUserModalInitState ={
    open: false,
    submit: false
}
export const updateUserModalState = atom({
    key: 'updateUserModalState', // unique ID (with respect to other atoms/selectors)
    default: updateUserModalInitState, // default value (aka initial value)
});