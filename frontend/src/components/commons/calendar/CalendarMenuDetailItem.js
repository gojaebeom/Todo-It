import { useRecoilValue } from 'recoil'
import { calendarDetailState } from '../../../atoms/calendarDetailState'

const CalendarMenuDetailItem = ({ item }) => {
  const calendarDetail = useRecoilValue(calendarDetailState)

  return (
    <div className="flex items-center justify-between w-full p-1 pl-2 rounded-md cursor-pointer text-md hover:bg-gray-100">
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
    </div>
  )
}
export default CalendarMenuDetailItem
