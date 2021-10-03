import { Link, withRouter } from "react-router-dom";
import withDefaultEvent from "./withDefaultEvent";
import profileSampleImg from "../../assets/images/bgmCover01.png";
import CalendarCreateModal from "../../components/calendarCreateModal/CalendarCreateModal";
import UserUpdateModal from "../../components/userUpdateModal/UserUpdateModal";

function DefaultLayout({ 
    children, 
    clickLogoutEvent, 
    userInfo, 
    creationCalendarModalOpen, 
    clickCreationCalendarModalOpenEvent,
    userModalOpen,
    clickUpdateUserModalOpenEvent
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
                        onClick={clickCreationCalendarModalOpenEvent}
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
                            <button onClick={clickUpdateUserModalOpenEvent}><i className="mx-2 fas fa-cog"></i></button>
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
        { creationCalendarModalOpen && <CalendarCreateModal/> }
        { userModalOpen && <UserUpdateModal/> }
    </div>
    )
}
export default withRouter(withDefaultEvent(DefaultLayout));