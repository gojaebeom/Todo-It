import CalendarCreateModal from '../../commons/calendarCreateModal/CalendarCreateModal'
import UserUpdateModal from '../../commons/userUpdateModal/UserUpdateModal'
import LoadingPage from '../../commons/loadingPage/LoadingPage'
import CalendarEditModal from '../../commons/calendarEditModal/CalendarEditModal'

import React, { useEffect, useState } from 'react'
import CalendarMenu from '../../commons/calendar/CalendarMenu'
import CalendarMenuDetail from '../../commons/calendar/CalendarMenuDetail'
import waitingImg from '../../../assets/images/wait.svg'
import PatchNoteModal from '../../commons/patchNote/PatchNoteModal'
import UserDetailModal from '../../commons/user/UserDetailModal'

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

      {rightAside && (
        <aside className="absolute sm:static block w-full sm:w-[300px] sm:min-w-[300px] h-full bg-white border-l">
          <div className="flex items-center justify-between w-full h-[50px] border-b pl-2 pr-4">
            생산성
            {window.innerWidth <= 1000 && (
              <button onClick={() => setRightAside(false)}>
                <i className="fas fa-times hover:text-indigo-400"></i>
              </button>
            )}
          </div>
          <div className="flex flex-col items-center justify-start h-full ">
            <img src={waitingImg} alt="img" className="w-10/12" />
            <br />
            <p className="text-2xl ">오늘의 업무</p>
            <p className="text-xm font-noto-light">-앱 업데이트 하기</p>
            <p className="text-xm font-noto-light">-앱 테스트 하기</p>
            <div>
              <span className="text-3xl text-purple-500 font-noto-black">
                1
              </span>
              <span className="text-xl font-noto-bold">/2</span>
            </div>
            <br />
            <p className="text-2xl">이번 달 달성률</p>
            <div>
              <span className="text-3xl text-red-400 font-noto-black">15</span>
              <span className="text-xl font-noto-bold">/20</span>
            </div>
          </div>
        </aside>
      )}
      <CalendarCreateModal />
      <CalendarEditModal />
      <UserUpdateModal />
      <PatchNoteModal />
      <LoadingPage />
      <UserDetailModal />
    </div>
  )
}
export default DefaultLayout
