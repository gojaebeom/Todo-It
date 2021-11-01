import { Link } from 'react-router-dom'
import moment from 'moment'
import { useCalendars } from '../../../atoms/calendarsState'
import { useEffect, useRef } from 'react'

const CalendarCell = ({ index, week }) => {
  const {
    calendarDetail,
    todosByMonth,
    contextMenu,
    setContextMenu,
    changeTdColor,
    customizes,
    today,
  } = useCalendars()
  let days = today
    .clone()
    .startOf('year')
    .week(week)
    .startOf('week')
    .add(index, 'day')

  const tdRef = useRef()

  const changeBgColor = (el, color) => {
    for (let i = 0; i < el.classList.length; i++) {
      const className = el.classList.item(i)
      if (className.includes('bg-')) {
        el.classList.remove(className)
      }
    }

    if (!color) {
      if (index % 7 === 0 || index % 6 === 0) {
        el.classList.add('bg-gray-100')
      }
    } else {
      el.classList.add(color)
    }
  }

  useEffect(() => {
    let matched = false
    for (let c of customizes) {
      if (c.matchedDate === days.format('YYYYMMDD')) {
        matched = true
        if (c.color === 'red') {
          changeBgColor(tdRef.current, 'bg-red-100')
        } else if (c.color === 'blue') {
          changeBgColor(tdRef.current, 'bg-blue-100')
        } else if (c.color === 'green') {
          changeBgColor(tdRef.current, 'bg-green-100')
        } else if (c.color === 'yellow') {
          changeBgColor(tdRef.current, 'bg-yellow-100')
        } else if (c.color === 'purple') {
          changeBgColor(tdRef.current, 'bg-purple-100')
        } else if (c.color === 'indigo') {
          changeBgColor(tdRef.current, 'bg-indigo-100')
        } else {
          changeBgColor(tdRef.current, '')
        }
      }
    }

    if (!matched) {
      changeBgColor(tdRef.current, '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customizes, today])

  return (
    <td
      className={`border h-[50px] sm:h-[80px] md:h-[120px] hover:shadow-inner text-xs md:text-base   ${
        index % 7 === 0 || index % 6 === 0 ? 'bg-gray-100' : ''
      } `}
      onContextMenu={(event) => {
        setContextMenu({
          isOpen: true,
          matchedCalendarId: calendarDetail.id,
          matchedDate: days.format('YYYYMMDD'),
        })
        event.preventDefault()
      }}
      ref={tdRef}
    >
      <Link
        to={`/calendars/${calendarDetail.id}/days/${days.format('YYYY-MM-DD')}`}
        className={`${
          days.format('MM') !== today.format('MM') && 'opacity-30'
        } relative flex flex-col justify-start items-end h-full px-0 sm:px-1`}
      >
        <span
          className={`mb-1 sm:mb-2 ${
            moment().format('YYYYMMDD') === days.format('YYYYMMDD') &&
            'bg-red-400 text-white rounded-full px-1 md:px-2'
          }`}
        >
          {days.format('D')}
        </span>
        <ul className="flex flex-col items-start justify-center w-full">
          {
            // eslint-disable-next-line array-callback-return
            todosByMonth.map((item, index) => {
              if (days.format('YYYY-MM-DD') === item.matchedDate) {
                return (
                  <li
                    className={'relative w-full text-sm truncate overflow-ellipsis '.concat(
                      item.isFinished === '1' && 'line-through',
                    )}
                    key={item.id}
                  >
                    ·{item.title}
                  </li>
                )
              }
            })
          }
        </ul>
        {days.format('MM') === today.format('MM') &&
          contextMenu.isOpen &&
          contextMenu.matchedCalendarId === calendarDetail.id &&
          contextMenu.matchedDate === days.format('YYYYMMDD') && (
            <div className="absolute left-0 z-50 flex items-center justify-center w-full shadow-lg calendar-cell-customize-bar bottom-2">
              <button
                className="flex-1 h-5 bg-white border-gray-400 border-1 hover:bg-gray-50"
                onClick={(e) =>
                  changeTdColor(e, days.format('YYYYMMDD'), 'white')
                }
              />
              <button
                className="flex-1 h-5 bg-red-100 border-gray-400 border-1 hover:bg-red-200"
                onClick={(e) =>
                  changeTdColor(e, days.format('YYYYMMDD'), 'red')
                }
              />
              <button
                className="flex-1 h-5 bg-blue-100 border-gray-400 border-1 hover:bg-blue-200"
                onClick={(e) =>
                  changeTdColor(e, days.format('YYYYMMDD'), 'blue')
                }
              />
              <button
                className="flex-1 h-5 bg-green-100 border-gray-400 border-1 hover:bg-green-200"
                onClick={(e) =>
                  changeTdColor(e, days.format('YYYYMMDD'), 'green')
                }
              />
              <button
                className="flex-1 h-5 bg-yellow-100 border-gray-400 border-1 hover:bg-yellow-200"
                onClick={(e) =>
                  changeTdColor(e, days.format('YYYYMMDD'), 'yellow')
                }
              />
              <button
                className="flex-1 h-5 bg-purple-100 border-gray-400 border-1 hover:bg-purple-200"
                onClick={(e) =>
                  changeTdColor(e, days.format('YYYYMMDD'), 'purple')
                }
              />
              <button
                className="flex-1 h-5 bg-indigo-100 border-gray-400 border-1 hover:bg-indigo-200"
                onClick={(e) =>
                  changeTdColor(e, days.format('YYYYMMDD'), 'indigo')
                }
              />
            </div>
          )}
      </Link>
    </td>
  )
}
export default CalendarCell
