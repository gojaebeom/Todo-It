import { atom } from 'recoil'

export const inviteInputState = atom({
  key: 'inviteInputState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
})
