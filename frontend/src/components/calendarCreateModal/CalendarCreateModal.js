import withCalendarCreateEnvet from "./withCalendarCreateEvent";

function CalendarCreateModal({ 
    storeCalendar,
    changeImageEvent,
    changeInputEvent,
    clickCalendarModalToggleEvent,
    submitCalendarEvent
}){
    
    return(
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
    )
}
export default  withCalendarCreateEnvet(CalendarCreateModal);