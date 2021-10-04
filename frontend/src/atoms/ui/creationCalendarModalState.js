import { atom } from "recoil";
export const creationCalendarModalInitState = {
    open: false,
    submit: false
}
export const creationCalendarModalState = atom({
    key: 'creationCalendarModalState', // unique ID (with respect to other atoms/selectors)
    default: creationCalendarModalInitState, // default value (aka initial value)
});