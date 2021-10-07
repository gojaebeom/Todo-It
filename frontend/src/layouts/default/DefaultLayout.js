import defaultLayoutEvent from "./defaultLayoutEvent";
import CalendarCreateModal from "../../components/calendarCreateModal/CalendarCreateModal";
import UserUpdateModal from "../../components/userUpdateModal/UserUpdateModal";
import LoadingPage from "../../components/loadingPage/LoadingPage";
import waitingImg from "../../assets/images/wait.svg";
import CalendarEditModal from "../../components/calendarEditModal/CalendarEditModal";
import notificationImg from "../../assets/images/notification2.png";

const DefaultLayout = ({ 
    children, 
    user,
    
    calendars, 
    calendarDetail,
    clickLogoutEvent, 
    clickCreationCalendarModalOpenEvent,
    clickUpdateUserModalOpenEvent,
    clickCalendarSelectEvent,

    editCalendarModalOpen,

    inviteInput,
    changeInviteInput,
    submitInviteInput,

    toggleNotificationModal,
    refreshNotificationModal,
    notificationModal,
    notifications
}) => {
    return(
    <div className="fixed top-0 left-0 flex items-center w-full h-full text-black bg-red-300 font-noto-regular">
        <div className="flex items-center justify-start w-full h-full">
            <aside className="flex w-2/12 h-full border-r min-w-350">
                <div className="flex flex-col items-center justify-start h-full py-3 min-w-80">
                    <div className="relative flex items-center justify-center w-12 h-12 mt-2 rounded-full cursor-pointer bg-gray-50"
                        title="초대 알림"
                        onClick={toggleNotificationModal}
                    >
                        <i className="text-2xl text-indigo-300 fab fas fa-bell"></i>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-indigo-500 rounded-full animate-bounce"></div>
                    </div>
                    <div className="w-2/5 my-3 border-t border-white border-dashed"></div>
                    {
                        calendars &&
                        calendars.map((item)=>{
                            return(
                            <button
                                onClick={() => clickCalendarSelectEvent(item)}
                                className={`
                                relative flex items-center justify-center w-12 h-12 mb-2 border-red-200 
                                rounded-full cursor-pointer calendarSelector transition-all delay-75
                                ${item.id === calendarDetail.id && "border-4 border-gray-300"}`}
                                key={item.id} 
                                title={item.name}
                            >
                                {
                                    item.thumbnailPreview ?
                                    <img src={`${process.env.REACT_APP_API_URL}/images${item.thumbnailPreview}`} alt="img" className="w-full h-full rounded-full"/> :
                                    <div className="flex items-center justify-center w-full h-full bg-white rounded-full text-md font-noto-medium">{item.name[0]}{item.name[1]}</div>
                                }
                            </button>
                            )
                        })
                    }
                    
                    <div className="flex items-center justify-center w-12 h-12 mb-2 overflow-hidden rounded-full cursor-pointer bg-gray-50"
                        onClick={clickCreationCalendarModalOpenEvent}
                    >
                        <i className="text-xl text-gray-300 fas fa-plus"></i>
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 mb-2 overflow-hidden rounded-full cursor-pointer bg-gray-50"
                        title="공개 캘린더"
                        onClick={() => alert("준비중인 기능입니다!")}
                    >
                        <i className="text-2xl text-red-400 fab fa-bandcamp"></i>
                    </div>
                </div>
                <div className="relative flex flex-col items-center justify-start w-full h-full rounded-tl-xl bg-gray-50">
                    {
                        notificationModal &&
                        <div className="absolute z-50 flex flex-col items-center justify-start p-4 bg-white border border-gray-200 rounded-md -left-2 top-4 min-w-250">
                            <div className="flex justify-end w-full mb-4">
                                
                                <button className="text-xs cursor-pointer"
                                    onClick={refreshNotificationModal}
                                >
                                    <i className="mr-1 fas fa-redo-alt"></i>
                                    새로고침
                                </button>
                            </div>
                            {
                                notifications.length > 0 ?
                                <div>
                                    <img src={notificationImg} alt="img"/>
                                    <p className="text-xl font-noto-medium">알림이 없어요!</p>
                                </div> :
                                <div className="w-full border rounded-md">
                                    알림이 왔어요!
                                </div>
                            }

                        </div>
                    }
                    <div className="flex items-center justify-between w-full h-12 pl-3 text-xl border-b font-noto-bold">
                        <div>{calendarDetail.name}</div>
                        <button onClick={editCalendarModalOpen}><i className="mx-2 fas fa-cog"></i></button>
                    </div>
                    <div className="flex flex-col items-start justify-start w-full p-3">
                        <div className="flex justify-between w-full mb-4 border border-gray-200 rounded-md">
                            <input className="w-9/12 p-2 border-r outline-none rounded-l-md"
                                value={inviteInput}
                                onChange={changeInviteInput}
                            />
                            <button className="w-3/12 p-2 text-white bg-red-300 rounded-r-md"
                                onClick={submitInviteInput}
                            >초대</button>
                        </div>
                        <h1 className="text-md font-noto-regular">참여 인원 ({calendarDetail.members.length})</h1>
                        <div className="flex flex-col items-start justify-start w-full pt-3 pl-3">
                            {
                                calendarDetail.members.map((item, index) => {
                                    return(
                                    <div key={item.id} className="flex items-center justify-start w-full p-1 pl-2 rounded-md cursor-pointer text-md hover:bg-gray-100">
                                        {
                                            item.profilePreviewImg ?
                                            <img src={`${process.env.REACT_APP_API_URL}/images${item.profilePreviewImg}`} alt="img" className="w-8 h-8 mx-2 rounded-full"/> :
                                            <div className="flex items-center justify-center w-8 h-8 mx-2 border border-gray-500 rounded-full">
                                                <i className="far fa-user"></i>
                                            </div>
                                        }
                                        {item.nickname}
                                    </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 flex items-center justify-between w-full h-12 border-t">
                        <div className="flex items-center justify-start">
                            {
                                user.profilePreviewImg ? 
                                <img src={`${process.env.REACT_APP_API_URL}/images${user.profilePreviewImg}`} alt="img" className="w-8 h-8 mx-2 rounded-full"/> :
                                <div className="flex items-center justify-center w-8 h-8 mx-2 border border-gray-500 rounded-full">
                                    <i className="far fa-user"></i>
                                </div>
                            }
                            <div className="flex flex-col">
                                <p className="text-xs">@{user.userCode}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-end">
                            <button onClick={clickLogoutEvent}><i className="mx-1 fas fa-sign-out-alt"></i></button>
                            <button onClick={clickUpdateUserModalOpenEvent}><i className="mx-2 fas fa-cog"></i></button>
                        </div>
                    </div>
                </div>
            </aside>

            <section className="flex flex-col items-start justify-start w-full h-full bg-white">
                <div className="flex items-center w-full pl-3 text-2xl border-b h-13 font-noto-bold"></div>
                <div className="flex flex-col items-center justify-start w-full h-full p-5 overflow-y-auto custom-scroll">
                    { children }
                </div>
            </section>

            <aside className="flex-col items-start justify-start hidden w-2/12 h-full bg-white border-l border-r 2xl:flex min-w-350 ">
                <div className="flex items-center w-full pl-3 text-xl border-b h-13 font-noto-bold">
                    생산성 🍬
                </div>
                <div className="flex flex-col items-center justify-center h-full">
                    <img src={waitingImg} alt="img" className="w-10/12"/>
                    <p>준비중이에요..!</p>
                </div>
            </aside>
        </div>
        <CalendarCreateModal/>
        <CalendarEditModal/>
        <UserUpdateModal/> 
        <LoadingPage/>
    </div>
    )
}
export default defaultLayoutEvent(DefaultLayout);