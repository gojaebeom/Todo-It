import CalendarCreateModal from '../../commons/calendarCreateModal/CalendarCreateModal'
import UserUpdateModal from '../../commons/userUpdateModal/UserUpdateModal'
import LoadingPage from '../../commons/loadingPage/LoadingPage'
import CalendarEditModal from '../../commons/calendarEditModal/CalendarEditModal'

import React, { useEffect, useState } from 'react'
import CalendarMenu from '../../commons/calendar/CalendarMenu'
import CalendarMenuDetail from '../../commons/calendar/CalendarMenuDetail'
import waitingImg from '../../../assets/images/wait.svg'

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
    <div className="top-0 left-0 fixed flex w-full h-full bg-white font-noto-regular text-[#424242]">
      <div className="flex items-center justify-start w-full h-full">
        {leftAside && (
          <aside className="absolute left-0 w-full sm:static sm:w-[380px] h-full flex transition duration-100 z-30">
            <CalendarMenu />
            <CalendarMenuDetail setLeftAside={setLeftAside} />
          </aside>
        )}

        <section className="w-full h-full bg-white">
          <div className="flex items-center justify-between w-full h-[50px] border-b px-4 ">
            <button onClick={() => setLeftAside(!leftAside)}>
              <i className="cursor-pointer fas fa-hamburger hover:text-indigo-400"></i>
            </button>
            <button onClick={() => setRightAside(!rightAside)}>
              <i className="cursor-pointer fas fa-ellipsis-h hover:text-indigo-400"></i>
            </button>
          </div>
          <div className="w-full h-full p-3">{children}</div>
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
            <div className="flex flex-col items-center justify-center h-full">
              <img src={waitingImg} alt="img" className="w-10/12" />
              <p>준비중이에요..!</p>
            </div>
          </aside>
        )}
      </div>
      <CalendarCreateModal />
      <CalendarEditModal />
      <UserUpdateModal />
      <LoadingPage />
    </div>
  )
}
export default DefaultLayout
