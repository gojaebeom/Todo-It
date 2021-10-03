import withUserUpdateEvent from "./withUserUpdateEvent";

function UserUpdateModal({
    clickUpdateUserModalCloseEvent
}){
    return(
    <div className={`fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50`}>
        <div className={`flex flex-col items-center p-5 bg-white rounded-sm w-400 overflow-hidden`}>
            <p className="text-2xl font-noto-medium">회원 정보 수정</p>
            {/* <p className="text-sm">목적에 맞는 캘린더를 생성하고 일정을 가득 채워보세요 :D</p> */}
        
            <div className="flex justify-between w-full">
                <button className="px-5 py-2 mt-5 rounded-sm font-noto-medium"
                    onClick={clickUpdateUserModalCloseEvent}
                >
                    취소
                </button>
                <button className="px-5 py-2 mt-5 text-white bg-red-400 rounded-sm font-noto-medium"
                >
                    만들기
                </button>
            </div>
        </div>
    </div>
    )
}
export default withUserUpdateEvent(UserUpdateModal);