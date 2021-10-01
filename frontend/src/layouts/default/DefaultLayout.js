import { Link, withRouter } from "react-router-dom";
import withDefaultEvent from "./withDefaultEvent";
import profileSampleImg from "../../assets/images/bgmCover01.png";

function DefaultLayout({ 
    children, 
    clickLogoutEvent, 
    userInfo, 
    isCalendarModalOpen, 
    clickCalendarModalToggleEvent,
    changeImageEvent,
    changeInputEvent,
    submitCalendarEvent,
    storeCalendar,
}){
    return(
    <div className="fixed top-0 left-0 flex items-center w-full h-full text-black bg-red-300 font-noto-light">
        <div className="flex items-center justify-start w-full h-full">
            <aside className="flex w-2/12 h-full border-r min-w-350">
                <div className="flex flex-col items-center justify-start h-full py-3 min-w-80">
                    <div className="flex items-center justify-center w-12 h-12 mb-2 overflow-hidden rounded-full cursor-pointer">
                        <img src={profileSampleImg} alt="img" className="w-full h-full rounded-full"/>
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 mb-2 overflow-hidden rounded-full cursor-pointer bg-gray-50"
                        onClick={clickCalendarModalToggleEvent}
                    >
                        <i className="text-xl text-gray-300 fas fa-plus"></i>
                    </div>
                </div>
                <div className="relative flex flex-col items-center justify-start w-full h-full rounded-tl-xl bg-gray-50">
                    <div className="flex items-center w-full h-12 pl-3 text-xl border-b font-noto-bold">
                        # 개인 일정 ✍
                    </div>
                    <div className="flex flex-col items-start justify-start w-full p-3">
                        <h1 className="text-md font-noto-regular">캘린더</h1>
                        <div className="flex flex-col items-start justify-start w-full pl-3">
                            <Link to="/" className="flex items-center justify-start w-full p-1 pl-2 rounded-md text-md hover:bg-gray-100">캘린더 홈</Link>
                            <Link to="/days/2021-09-21" className="flex items-center justify-start w-full p-1 pl-2 rounded-md text-md hover:bg-gray-100">당일 일정</Link>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 flex items-center justify-between w-full h-12 border-t">
                        <div className="flex items-center justify-start">
                            <img src={profileSampleImg} alt="img" className="w-8 h-8 mx-2 rounded-full"/>
                            <div className="flex flex-col">
                                <p className="text-xs">{userInfo.nickname}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-end">
                            <button onClick={clickLogoutEvent}><i className="mx-1 fas fa-sign-out-alt"></i></button>
                            <button><i className="mx-2 fas fa-cog"></i></button>
                        </div>
                    </div>
                </div>
            </aside>

            <section className="flex flex-col items-start justify-start w-full h-full bg-white ">
                <div className="flex items-center w-full pl-3 text-2xl border-b h-13 font-noto-bold"></div>
                <div className="flex flex-col items-center justify-start w-full h-full p-5 overflow-y-auto custom-scroll">
                    { children }
                </div>
            </section>

            <aside className="flex flex-col items-start justify-start w-2/12 h-full bg-white border-l border-r min-w-350">
                <div className="flex items-center w-full h-12 pl-3 text-xl border-b font-noto-bold">
                    @생산성 🍬
                </div>
            </aside>
        </div>

        {/* 캘린더 생성 모달 */}
        {
            isCalendarModalOpen &&
            <div className={`fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50`}>
                <div className={`flex flex-col items-center p-5 bg-white rounded-sm w-400 overflow-hidden`}>
                    <p className="text-2xl font-noto-medium">새로운 캘린더 생성</p>
                    <p className="text-sm">목적에 맞는 캘린더를 생성하고 일정을 가득 채워보세요 :D</p>
                
                    <label className="flex flex-col items-center justify-center w-20 h-20 my-5 border-2 border-gray-500 border-dashed rounded-full cursor-pointer" htmlFor="file">
                        {
                            !storeCalendar.thumbnail ?
                            <>
                                <i className="text-2xl fas fa-camera"></i>
                                <span className="text-sm">UPLOAD</span>
                            </> : 
                            <img src={storeCalendar.thumbnail} alt="img" className="w-full h-full rounded-full"/>
                        }
                        <input id="file" type="file" className="w-0 h-0"
                            onChange={changeImageEvent}
                        />
                    </label>

                    <div className="w-full">
                        <label className="text-xs">캘린더 이름</label>
                        <input className="w-full p-3 border rounded-sm outline-none" placeholder="ex) 여행계획일정"
                            value={storeCalendar.name}
                            onChange={changeInputEvent}
                        />
                    </div>

                    <div className="flex justify-between w-full">
                        <button className="px-5 py-2 mt-5 rounded-sm font-noto-medium"
                            onClick={clickCalendarModalToggleEvent}
                        >
                            취소
                        </button>
                        <button className="px-5 py-2 mt-5 text-white bg-red-400 rounded-sm font-noto-medium"
                            onClick={submitCalendarEvent}
                        >
                            만들기
                        </button>
                    </div>
 
                </div>
            </div>
        }
    </div>
    )
}
export default withRouter(withDefaultEvent(DefaultLayout));