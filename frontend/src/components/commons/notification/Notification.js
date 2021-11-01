import notificationImg from '../../../assets/images/notification2.png'
import fanfareImg from '../../../assets/images/fanfare.png'
import React from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { notificationsState } from '../../../atoms/notificationsState'
import { notificationModalState } from '../../../atoms/ui/notificationModalState'
import ApiScaffold from '../../../shared/api'
import { userState } from '../../../atoms/userState'
import { toastState } from '../../../atoms/ui/toastState'
import NotificationRefreshButton from './NotificationRefreshButton'
import { calendarsState } from '../../../atoms/calendarsState'
import { calendarDetailState } from '../../../atoms/calendarDetailState'

const Notification = () => {
  const [notifications, setNotifications] = useRecoilState(notificationsState)
  const notificationModal = useRecoilValue(notificationModalState)
  const [user, setUser] = useRecoilState(userState)
  const setToast = useSetRecoilState(toastState)
  const setCalendars = useRecoilState(calendarsState)
  const setCalendarDetail = useSetRecoilState(calendarDetailState)

  const refreshNotificationModal = async () => {
    if (user.id) {
      const res = await ApiScaffold(
        {
          method: 'get',
          url: `/notifications?toUserId=${user.id}`,
        },
        (err) =>
          setToast({ open: true, message: err, type: 'ERROR', second: 2000 }),
      )
      setNotifications([...res.data])
      // setToast({open:true, message:"새로고침 완료!", type:"SUCCESS",second:2000});
    }
  }

  const acceptNotification = async (id, actionUrl) => {
    await ApiScaffold(
      {
        method: 'get',
        url: actionUrl,
      },
      (err) =>
        setToast({ open: true, message: err, type: 'ERROR', second: 2000 }),
    )
    await ApiScaffold(
      {
        method: 'put',
        url: `/notifications/${id}/is-confirmed`,
      },
      (err) =>
        setToast({ open: true, message: err, type: 'ERROR', second: 2000 }),
    )
    refreshNotificationModal()

    const userRes = await ApiScaffold(
      {
        method: 'get',
        url: `/users/${user.id}`,
      },
      (err) =>
        setToast({ open: true, message: err, type: 'ERROR', second: 2000 }),
    )
    setUser({ ...userRes.data.user })
    if (userRes.data.calendars.length !== 0) {
      setCalendars([...userRes.data.calendars])
      setCalendarDetail({ ...userRes.data.calendars[0] })
    }
  }

  const refusalNotification = async (id) => {
    await ApiScaffold(
      {
        method: 'put',
        url: `/notifications/${id}/is-confirmed`,
      },
      (err) =>
        setToast({ open: true, message: err, type: 'ERROR', second: 2000 }),
    )
    refreshNotificationModal()
  }

  return (
    notificationModal && (
      <div className="absolute z-40 flex flex-col items-center justify-start p-2 bg-white border border-gray-200 rounded-md shadow-lg notification -left-2 top-4 w-[250px] max-w-[250px]">
        <div className="flex justify-end w-full mb-4">
          <NotificationRefreshButton />
        </div>
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full">
            <img src={notificationImg} alt="img" className="w-32" />
            <p className="text-md">알림이 없어요!</p>
          </div>
        ) : (
          <div className="overflow-y-auto max-h-400 custom-scroll">
            {
              // eslint-disable-next-line array-callback-return
              notifications.map((item, index) => {
                if (item.type === 'JOIN_CALENDAR') {
                  return (
                    <div
                      className="flex flex-col items-center justify-center w-full mb-2 border rounded-sm bg-gray-50"
                      key={item.id}
                    >
                      <div className="flex flex-col items-center p-2">
                        <img src={fanfareImg} alt="img" className="w-20" />
                        <p className="mt-4">{item.content}</p>
                      </div>
                      <div className="flex justify-between w-full border-t">
                        <button
                          className="w-1/2 p-2 border-r"
                          onClick={() =>
                            acceptNotification(item.id, item.actionUrl)
                          }
                        >
                          수락
                        </button>
                        <button
                          className="w-1/2 p-2"
                          onClick={() => refusalNotification(item.id)}
                        >
                          거절
                        </button>
                      </div>
                    </div>
                  )
                } else if (item.type === 'WELCOME') {
                  return (
                    <div
                      className="flex flex-col items-center justify-center w-full mt-2 border rounded-sm bg-gray-50"
                      key={item.id}
                    >
                      <div className="flex flex-col items-center p-4">
                        <p className="text-6xl">👋</p>
                        <p className="mt-4">{item.content}</p>
                      </div>
                      <div className="flex justify-center w-full border-t">
                        <button
                          className="w-full p-2"
                          onClick={() => refusalNotification(item.id)}
                        >
                          확인
                        </button>
                      </div>
                    </div>
                  )
                }
              })
            }
          </div>
        )}
      </div>
    )
  )
}
export default Notification
