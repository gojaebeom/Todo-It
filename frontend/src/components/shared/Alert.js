import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import alertImg from '../../assets/images/fanfare.png'
import { patchNoteState } from '../../states/patchNoteState'

const Alert = () => {
  const [open, setOpen] = useState(true)
  const setPatchNoteOpen = useSetRecoilState(patchNoteState)

  const confirm = () => {
    window.localStorage.removeItem('todoit-alert-1')
    window.localStorage.removeItem('todoit-alert-2')
    window.localStorage.removeItem('todoit-alert-3')
    window.localStorage.setItem('todoit-alert-4', 'ok')
    setOpen(false)
  }

  const PatchNoteOpen = () => {
    window.localStorage.setItem('todoit-alert-4', 'ok')
    setOpen(false)
    setPatchNoteOpen(true)
  }

  return (
    window.localStorage.getItem('todoit-alert-4') !== 'ok' &&
    open && (
      <div
        className={
          'alert-position-wrap absolute left-0 top-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80 z-50'
        }
      >
        <div className="z-50 p-6 bg-white rounded-lg shadow-md w-[95%] sm:w-[400px] font-noto-light">
          <div className="relative w-16 mx-auto mb-3 -mt-10">
            <img
              className="ml-2 -mt-10"
              src={alertImg}
              alt="cookie"
              style={{ width: '200px' }}
            />
          </div>
          <span className="block w-full mt-2 mb-3 leading-normal text-gray-800 text-md">
            이제 캘린더 참여인원의 프로필을 클릭하면 회원 상세정보를 볼 수 있습니다! 
            그 밖에 반응형 디자인 개선이 완료되었습니다~
          </span>
          <br />
          <div className="flex items-center justify-between">
            <button
              className="mr-1 text-sm text-gray-400 hover:text-gray-800"
              onClick={PatchNoteOpen}
            >
              패치내역
            </button>
            <div className="w-1/2">
              <button
                type="button"
                onClick={confirm}
                className="w-full px-1 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 "
              >
                확인했어요
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  )
}
export default Alert
