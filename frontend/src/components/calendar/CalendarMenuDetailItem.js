import { useRecoilState, useRecoilValue } from 'recoil'
import { calendarDetailState } from '../../states/calendarDetailState'
import { userDetailState } from '../../states/userDetailState'

const CalendarMenuDetailItem = ({ item }) => {
  const calendarDetail = useRecoilValue(calendarDetailState)
  const [userDetail, setUserDetail] = useRecoilState(userDetailState)

  return (
    <button
      className="flex items-center justify-between w-full p-1 pl-2 rounded-md cursor-pointer text-md hover:bg-gray-100"
      onClick={() => {
        console.debug(item)
        setUserDetail({
          ...userDetail,
          nickname: item.nickname,
          profilePreviewImg: item.profilePreviewImg,
          profileImg: item.profileImg,
          userCode: item.userCode,
          isOpen: true,
        })
      }}
    >
      <div className="flex items-center justify-start">
        {item.profilePreviewImg ? (
          <img
            src={`${process.env.REACT_APP_API_URL}/images${item.profilePreviewImg}`}
            alt="img"
            className="w-8 h-8 mx-2 border border-gray-300 rounded-full"
          />
        ) : (
          <div className="flex items-center justify-center w-8 h-8 mx-2 border border-gray-500 rounded-full">
            <i className="far fa-user"></i>
          </div>
        )}
        {item.nickname}
      </div>
      {item.id === calendarDetail.userId && (
        <div className="mr-2">
          <i className="text-yellow-400 fas fa-crown"></i>
        </div>
      )}
    </button>
  )
}
export default CalendarMenuDetailItem
