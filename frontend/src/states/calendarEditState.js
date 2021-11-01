import { atom } from 'recoil'

export const calendarEditState = atom({
  key: 'calendarEditState', // unique ID (with respect to other atoms/selectors)
  default: {
    id: '',
    name: '',
    thumbnail: '',
    thumbnailFile: null,
    isPrivate: '',
  }, // default value (aka initial value)
})
