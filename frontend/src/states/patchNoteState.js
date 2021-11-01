import { atom } from 'recoil'

export const patchNoteState = atom({
  key: 'patchNoteState', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})
