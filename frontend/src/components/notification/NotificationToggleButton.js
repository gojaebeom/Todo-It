import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { notificationModalState } from '../../states/ui/notificationModalState'
import { notificationsState } from '../../states/notificationsState'

const NotificationToggleButton = () => {
  const [notificationModal, setNotificationModal] = useRecoilState(
    notificationModalState,
  )
  const notifications = useRecoilValue(notificationsState)
  const toggleNotificationModal = () => setNotificationModal(!notificationModal)

  return (
    <div
      className="relative flex items-center justify-center w-12 h-12 mt-2 rounded-full cursor-pointer bg-gray-50"
      title="초대 알림"
      onClick={toggleNotificationModal}
    >
      <i className="text-2xl text-indigo-300 fab fas fa-bell"></i>
      {notifications.length !== 0 && (
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-indigo-500 rounded-full animate-bounce"></div>
      )}
    </div>
  )
}
export default NotificationToggleButton
