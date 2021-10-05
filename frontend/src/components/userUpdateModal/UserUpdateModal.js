import withUserUpdateEvent from "./withUserUpdateEvent";

function UserUpdateModal({
    updateUserModalOpen,
    clickUpdateUserModalCloseEvent,
    changeImageEvent,
    changeInputEvent,
    clickDeleteUserEvent,
    userEdit,
    submitEvent
}){
    return(
    updateUserModalOpen.open &&
    <div className={`fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50`}>
        <div className={`flex flex-col items-center p-5 bg-white rounded-sm w-400 overflow-hidden`}>
            <p className="text-2xl font-noto-medium">회원 정보 수정</p>
            <p className="text-sm">{userEdit.email}</p>
            <label className="flex flex-col items-center justify-center w-20 h-20 my-5 border-2 border-gray-500 border-dashed rounded-full cursor-pointer" htmlFor="file">
                {
                    !userEdit.profilePreviewImg ?
                    <>
                        <i className="text-2xl fas fa-camera"></i>
                        <span className="text-sm">UPLOAD</span>
                    </> : 
                    <img src={`${process.env.REACT_APP_API_URL}/images${userEdit.profilePreviewImg}`} alt="img" className="w-full h-full rounded-full"/>
                }
                <input id="file" type="file" className="w-0 h-0"
                    onChange={changeImageEvent}
                />
            </label>
            <div className="w-full">
                <label className="text-xs">유저코드</label>
                <input className="w-full p-3 border rounded-sm outline-none" placeholder="회원코드"
                    value={userEdit.userCode}
                    onChange={changeInputEvent}
                    name="userCode"
                    disabled
                />
            </div>
            <div className="w-full mt-5">
                <label className="text-xs">닉네임</label>
                <input className="w-full p-3 border rounded-sm outline-none" placeholder="이름 또는 닉네임을 적어주세요."
                    value={userEdit.nickname || ''}
                    onChange={changeInputEvent}
                    name="nickname"
                />
            </div>
            <div className="flex justify-end w-full mt-5">
                <button onClick={clickDeleteUserEvent}>회원 탈퇴</button>
            </div>
            <div className="flex justify-between w-full">
                <button className="px-5 py-2 mt-5 rounded-sm font-noto-medium"
                    onClick={clickUpdateUserModalCloseEvent}
                >
                    취소
                </button>
                <button className="flex items-center justify-center px-5 py-2 mt-5 text-white bg-red-400 rounded-sm font-noto-medium"
                    onClick={submitEvent}
                >
                    {
                        updateUserModalOpen.submit ?
                        <div className="w-3 h-3 mx-2 border-t-2 border-r-2 rounded-full animate-spin"></div> : 
                        "수정"
                    }
                </button>
            </div>
        </div>
    </div>
    )
}
export default withUserUpdateEvent(UserUpdateModal);