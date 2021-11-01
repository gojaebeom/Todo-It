import { atom } from 'recoil'

export const calendarDetailState = atom({
  key: 'calendarDetailState', // unique ID (with respect to other atoms/selectors)
  default: {
    id: '',
    userId: '',
    name: '',
    thumbnailPreview: '',
    isPrivate: 0,
    isDefault: 0,
    members: [],
  }, // default value (aka initial value)
})
