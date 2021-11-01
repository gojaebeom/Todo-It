import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { calendarsState } from '../../../states/calendarsState'
import NotificationToggleButton from '../notification/NotificationToggleButton'
import CalendarMenuItem from './CalendarMenuItem'
import CalendarCreateModalOpenButton from '../calendarCreateModal/CalendarCreateModalOpenButton'
import { patchNoteState } from '../../../states/patchNoteState'

const CalendarMenu = () => {
  const calendars = useRecoilValue(calendarsState)
  const setPatchNoteOpen = useSetRecoilState(patchNoteState)
  return (
    <div className="flex flex-col items-center w-[60px] md:w-[80px] h-full p-2 bg-red-300">
      <NotificationToggleButton />
      <div className="w-2/5 my-3 border-t border-white border-dashed"></div>
      {calendars &&
        calendars.map((item) => {
          return <CalendarMenuItem item={item} key={item.id} />
        })}
      <CalendarCreateModalOpenButton />
      <div
        className="flex items-center justify-center w-12 h-12 mb-2 overflow-hidden rounded-full cursor-pointer bg-gray-50"
        title="패치노트"
        onClick={() => setPatchNoteOpen(true)}
      >
        <i className="text-2xl text-red-400 far fa-clipboard"></i>
      </div>
    </div>
  )
}
export default CalendarMenu
