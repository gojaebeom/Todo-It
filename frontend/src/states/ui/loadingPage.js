import { atom } from 'recoil'

export const loadingPageState = atom({
  key: 'loadingPageState', // unique ID (with respect to other atoms/selectors)
  default: {
    step1: true,
    step2: true,
  }, // default value (aka initial value)
})
