import Notification from '../notification/Notification'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { calendarDetailState } from '../../../atoms/calendarDetailState'
import CalendarEditModalOpenButton from '../calendarEditModal/CalendarEditModalOpenButton'
import { userState } from '../../../atoms/userState'
import CalendarMenuDetailInvitor from './CalendarMenuDetailInvitor'
import CalendarMenuDetailItem from './CalendarMenuDetailItem'
import UserLogoutButton from '../user/UserLogoutButton'
import UserUpdateModalOpenButton from '../userUpdateModal/UserUpdateModalOpenButton'

const CalendarMenuDetail = ({ setLeftAside }) => {
  const calendarDetail = useRecoilValue(calendarDetailState)
  const user = useRecoilValue(userState)

  return (
    <div className="relative w-full sm:w-[300px] sm:max-w-[300px] h-full bg-white sm:border-r">
      <Notification />
      <div className="flex items-center justify-between w-full h-[50px] border-b px-3">
        <div>{calendarDetail.name}</div>
        <div>
          {user.id === calendarDetail.userId && <CalendarEditModalOpenButton />}
          {window.innerWidth <= 1000 && (
            <button className="ml-3" onClick={() => setLeftAside(false)}>
              <i className="fas fa-times hover:text-indigo-400"></i>
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col items-start justify-start w-full p-3">
        <CalendarMenuDetailInvitor />
        <h1 className="text-md font-noto-regular">
          참여 인원 ({calendarDetail.members.length})
        </h1>
        <div className="flex flex-col items-start justify-start w-full pt-3 pl-3">
          {calendarDetail.members.map((item) => {
            return <CalendarMenuDetailItem key={item.id} item={item} />
          })}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 flex items-center justify-between w-full h-12 border-t">
        <div className="flex items-center justify-start">
          {user.profilePreviewImg ? (
            <img
              src={`${process.env.REACT_APP_API_URL}/images${user.profilePreviewImg}`}
              alt="img"
              className="w-8 h-8 mx-2 border border-gray-300 rounded-full"
            />
          ) : (
            <div className="flex items-center justify-center w-8 h-8 mx-2 border border-gray-500 rounded-full">
              <i className="far fa-user"></i>
            </div>
          )}
          <div className="flex flex-col">
            <p className="text-xs">@{user.userCode}</p>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <UserLogoutButton />
          <UserUpdateModalOpenButton />
        </div>
      </div>
    </div>
  )
}
export default CalendarMenuDetail
