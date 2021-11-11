import waitingImg from '../../assets/images/wait.svg'

function Productivity({ setRightAside }) {
  return (
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
          <span className="text-3xl text-purple-500 font-noto-black">1</span>
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
  )
}

export default Productivity
