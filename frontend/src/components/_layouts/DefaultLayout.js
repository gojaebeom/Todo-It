import CalendarCreateModal from '../calendar/CalendarCreateModal'
import UserUpdateModal from '../user/UserUpdateModal'
import LoadingPage from '../shared/LoadingPage'
import CalendarEditModal from '../calendar/CalendarEditModal'

import React, { useEffect, useState } from 'react'
import CalendarMenu from '../calendar/CalendarMenu'
import CalendarMenuDetail from '../calendar/CalendarMenuDetail'

import PatchNoteModal from '../shared/PatchNoteModal'
import UserDetailModal from '../user/UserDetailModal'
import Productivity from '../shared/Productivity'
import ChatContainer from '../chat/ChatContainer'

const DefaultLayout = ({ children }) => {
  const [leftAside, setLeftAside] = useState(true)
  const [rightAside, setRightAside] = useState(true)

  useEffect(() => {
    changeOfStatusByCondition()
    window.addEventListener('resize', () => changeOfStatusByCondition())
  }, [])

  const changeOfStatusByCondition = () => {
    if (window.innerWidth <= 1200) {
      setRightAside(false)
    } else {
      setRightAside(true)
    }
    if (window.innerWidth <= 1000) {
      setLeftAside(false)
    } else {
      setLeftAside(true)
    }
  }

  return (
    <div className="top-0 left-0 fixed flex w-full h-full bg-white font-noto-regular text-[#424242] border-red-400">
      {leftAside && (
        <aside className="absolute left-0 w-full sm:static sm:w-[380px] h-full flex transition duration-100 z-30">
          <CalendarMenu />
          <CalendarMenuDetail setLeftAside={setLeftAside} />
        </aside>
      )}

      <section className="w-full h-full bg-white">
        <div className="flex items-center justify-between w-full h-[50px] border-b px-4">
          <button onClick={() => setLeftAside(!leftAside)}>
            <i className="cursor-pointer fas fa-hamburger hover:text-indigo-400"></i>
          </button>
          <button onClick={() => setRightAside(!rightAside)}>
            <i className="cursor-pointer fas fa-ellipsis-h hover:text-indigo-400 "></i>
          </button>
        </div>
        <div className="w-full h-full p-3 pb-20 overflow-y-auto custom-scroll">
          {children}
        </div>
      </section>

      {rightAside && <Productivity setRightAside={setRightAside} />}

      <CalendarCreateModal />
      <CalendarEditModal />
      <UserUpdateModal />
      <PatchNoteModal />
      <LoadingPage />
      <UserDetailModal />
      <ChatContainer />
    </div>
  )
}
export default DefaultLayout
