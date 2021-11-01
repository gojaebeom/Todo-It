import { useHistory } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { calendarDetailState } from '../../../atoms/calendarDetailState'
import { calendarsState } from '../../../atoms/calendarsState'
import React from 'react'

const CalendarMenuItem = ({ item }) => {
  const history = useHistory()

  const [calendarDetail, setCalendarDetail] = useRecoilState(
    calendarDetailState,
  )
  const calendars = useRecoilValue(calendarsState)
  const clickCalendarSelectEvent = async (item) => {
    console.debug(calendarDetail)
    for (let calendar of calendars) {
      if (calendar.id === item.id) {
        setCalendarDetail({ ...calendar })
      }
    }
    history.push('/')
  }
  return (
    <button
      onClick={() => clickCalendarSelectEvent(item)}
      className={`
            relative flex items-center justify-center w-12 h-12 mb-2 overflow-hidden
            cursor-pointer calendarSelector transition-all
            ${item.id === calendarDetail.id ? 'rounded-2xl' : 'rounded-full'}`}
      title={item.name}
    >
      {item.thumbnailPreview ? (
        <React.Fragment>
          <img
            src={`${process.env.REACT_APP_API_URL}/images${item.thumbnailPreview}`}
            alt="img"
            className="w-full h-full"
          />
          <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-white text-md font-noto-medium">
            {item.name[0]}
            {item.name[1]}
          </div>
        </React.Fragment>
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-white text-md font-noto-medium">
          {item.name[0]}
          {item.name[1]}
        </div>
      )}
    </button>
  )
}
export default CalendarMenuItem
