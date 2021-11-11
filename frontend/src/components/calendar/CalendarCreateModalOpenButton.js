import React from 'react'
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil'
import { calendarsState } from '../../states/calendarsState'
import { toastState } from '../../states/ui/toastState'
import { calendarStoreState } from '../../states/calendarStoreState'
import { creationCalendarModalState } from '../../states/ui/creationCalendarModalState'

const CalendarCreateModalOpenButton = () => {
  const calendars = useRecoilValue(calendarsState)
  const setToast = useSetRecoilState(toastState)
  const resetCalendarStore = useResetRecoilState(calendarStoreState)
  const [
    creationCalendarModalOpen,
    setCreationCalendarModalOpen,
  ] = useRecoilState(creationCalendarModalState)

  const clickCreationCalendarModalOpenEvent = () => {
    if (calendars.length >= 5) {
      setToast({
        open: true,
        message: '한 계정당 5개까지 캘린더를 만들 수 있습니다.',
        type: 'INFO',
        second: 2000,
      })
      return false
    }
    resetCalendarStore()
    setCreationCalendarModalOpen({ ...creationCalendarModalOpen, open: true })
  }

  return (
    <div
      className="flex items-center justify-center w-12 h-12 mb-2 overflow-hidden rounded-full cursor-pointer bg-gray-50"
      onClick={clickCreationCalendarModalOpenEvent}
    >
      <i className="text-xl text-gray-300 fas fa-plus"></i>
    </div>
  )
}
export default CalendarCreateModalOpenButton
