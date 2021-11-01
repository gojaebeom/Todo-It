import { atom } from 'recoil'

export const notificationModalState = atom({
  key: 'notificationModalState', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})
