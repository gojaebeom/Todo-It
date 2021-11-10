import { atom } from 'recoil'

export const userDetailState = atom({
  key: 'userDetailState', // unique ID (with respect to other atoms/selectors)
  default: {
    id: '',
    email: '',
    userCode: '',
    nickname: '',
    profileImg: '',
    profilePreviewImg: '',
    createdAt: '',
    isOpen: false,
  }, // default value (aka initial value)
})
