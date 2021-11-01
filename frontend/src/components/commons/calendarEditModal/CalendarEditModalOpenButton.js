import { calendarEditState } from '../../../states/calendarEditState'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { calendarDetailState } from '../../../states/calendarDetailState'
import { editCalendarModalState } from '../../../states/ui/editCalendarModalState'

const CalendarEditModalOpenButton = () => {
  const setCalendarEdit = useSetRecoilState(calendarEditState)
  const calendarDetail = useRecoilValue(calendarDetailState)
  const [calendarEditModal, setCalendarEditModal] = useRecoilState(
    editCalendarModalState,
  )

  const editCalendarModalOpen = () => {
    setCalendarEdit({
      ...calendarEditState,
      id: calendarDetail.id,
      name: calendarDetail.name,
      isPrivate: calendarDetail.isPrivate,
    })
    setCalendarEditModal({ ...calendarEditModal, open: true })
  }

  return (
    <button onClick={editCalendarModalOpen}>
      <i className="mx-2 fas fa-cog"></i>
    </button>
  )
}
export default CalendarEditModalOpenButton
