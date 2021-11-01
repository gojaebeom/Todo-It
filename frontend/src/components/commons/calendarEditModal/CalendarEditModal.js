import calendarEditModalEvent from './calendarEditModalEvent'

const CalendarEditModal = ({
  calendarDetail,
  calendarEditModal,
  calendarEdit,
  changeImage,
  deleteImage,
  changeCalendarEditInputs,
  calendarEditModalClose,
  submitCalendarEdit,
  deleteCalendarEdit,
}) => {
  return (
    calendarEditModal.open && (
      <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
        <div className="flex flex-col items-center p-5 overflow-hidden bg-white rounded-sm w-full h-full sm:w-[400px] sm:h-auto">
          <p className="text-2xl font-noto-medium">캘린더 수정</p>
          {/* <p className="text-sm">목적에 맞는 캘린더를 생성하고 일정을 가득 채워보세요 :D</p> */}

          <label
            className="flex flex-col items-center justify-center w-20 h-20 my-5 border-2 border-gray-500 border-dashed rounded-full cursor-pointer"
            htmlFor="file"
          >
            {!calendarEdit.thumbnail && calendarDetail.thumbnailPreview ? (
              <img
                src={`${process.env.REACT_APP_API_URL}/images${calendarDetail.thumbnailPreview}`}
                alt="img"
                className="w-full h-full rounded-full"
              />
            ) : (
              <>
                {calendarEdit.thumbnail ? (
                  <img
                    src={calendarEdit.thumbnail}
                    alt="img"
                    className="w-full h-full rounded-full"
                  />
                ) : (
                  <>
                    <i className="text-2xl fas fa-camera"></i>
                    <span className="text-sm">UPLOAD</span>
                  </>
                )}
              </>
            )}

            <input
              id="file"
              type="file"
              className="w-0 h-0"
              onChange={changeImage}
            />
          </label>
          <button
            className="text-xs"
            onClick={() => deleteImage(calendarDetail.id)}
          >
            이미지 초기화
          </button>

          <div className="w-full mt-4">
            <label className="mb-1 text-xs">캘린더 이름</label>
            <input
              className="w-full p-3 border rounded-sm outline-none"
              placeholder="ex) 여행계획일정"
              value={calendarEdit.name}
              onChange={changeCalendarEditInputs}
              maxLength={10}
            />
          </div>

          {!calendarDetail.isDefault && (
            <div className="flex flex-col w-full mt-5">
              <label className="mb-1 text-xs">공개여부</label>
              <div className="flex items-center justify-start">
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    name="isPrivate"
                    id="checkbox"
                    className={`absolute block w-6 h-6 duration-200 ease-in  border-4 rounded-full outline-none appearance-none cursor-pointer focus:outline-none 
                                ${
                                  !calendarEdit.isPrivate
                                    ? 'right-0 bg-red-400'
                                    : 'right-4 bg-white'
                                }`}
                    onChange={changeCalendarEditInputs}
                  />
                  <label
                    htmlFor="checkbox"
                    className="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer"
                  ></label>
                </div>
                <div>{calendarEdit.isPrivate ? '비공개' : '공개'}</div>
              </div>
            </div>
          )}

          <div className="flex justify-between w-full">
            <button
              className="px-5 py-2 mt-5 rounded-sm font-noto-medium"
              onClick={calendarEditModalClose}
            >
              취소
            </button>
            <div className="flex">
              {!calendarDetail.isDefault && (
                <button
                  className="flex items-center justify-center px-5 py-2 mt-5 mr-2 text-white bg-gray-300 rounded-sm font-noto-medium"
                  onClick={deleteCalendarEdit}
                >
                  삭제
                </button>
              )}
              <button
                className="flex items-center justify-center px-5 py-2 mt-5 text-white bg-red-400 rounded-sm font-noto-medium"
                onClick={submitCalendarEdit}
              >
                {calendarEditModal.submit ? (
                  <div className="w-3 h-3 mx-2 border-t-2 border-r-2 rounded-full animate-spin"></div>
                ) : (
                  '수정'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  )
}
export default calendarEditModalEvent(CalendarEditModal)
