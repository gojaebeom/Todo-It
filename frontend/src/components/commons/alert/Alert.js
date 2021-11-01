import alertImg from '../../../assets/images/fanfare.png'

const Alert = () => {
  const confirm = () => {
    window.localStorage.setItem('todoit-alert-2', 'ok')
    window.location.href = '/'
  }

  return (
    <div className="z-50 p-6 bg-white rounded-lg shadow-md w-72 font-noto-light">
      <div className="relative w-16 mx-auto mb-3 -mt-10">
        <img
          className="ml-2 -mt-10"
          src={alertImg}
          alt="cookie"
          style={{ width: '200px' }}
        />
      </div>
      <span className="block w-full mt-2 mb-3 leading-normal text-gray-800 text-md">
        오래 기다렸습니다~ 이제 모바일 기기에서도 편하게 확인할 수 있게 반응형 레이아웃을 적용했어요!
      </span>
      <div className="flex items-center justify-between">
        <button className="mr-1 text-sm text-gray-400 hover:text-gray-800"></button>
        <div className="w-1/2">
          <button
            type="button"
            onClick={confirm}
            className="w-full px-1 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 "
          >
            알겠어요.
          </button>
        </div>
      </div>
    </div>
  )
}
export default Alert
