import { atom } from 'recoil'

export const editCalendarModalState = atom({
  key: 'editCalendarModalState', // unique ID (with respect to other atoms/selectors)
  default: {
    open: false,
    submit: false,
  }, // default value (aka initial value)
})
