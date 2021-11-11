import { useRecoilState } from 'recoil'
import { userDetailState } from '../../states/userDetailState'
import waitImg from '../../assets/images/wait.png'

function UserDetailModal() {
  const [userDetail, setUserDetail] = useRecoilState(userDetailState)

  return (
    userDetail.isOpen && (
      <div
        className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 cursor-pointer"
        onClick={() => setUserDetail({ ...userDetail, isOpen: false })}
      >
        <div
          className="relative flex flex-col items-center p-5 overflow-hidden bg-white rounded-sm w-full h-full sm:w-[400px] sm:h-auto sm:min-h-[300px] cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="absolute top-0 right-0 px-3 py-1 cursor-pointer"
            onClick={() => setUserDetail({ ...userDetail, isOpen: false })}
          >
            <i className="fas fa-times sm:text-xl"></i>
          </div>

          <div className="flex w-full">
            {userDetail.profilePreviewImg ? (
              <img
                src={`${process.env.REACT_APP_API_URL}/images${userDetail.profilePreviewImg}`}
                alt="img"
                className="w-[100px] h-[100px] mx-2 border border-gray-300 rounded-xl z-10"
              />
            ) : (
              <div className="flex items-center justify-center w-[100px] h-[100px] mx-2 border border-gray-500 rounded-xl">
                <i className="text-4xl far fa-user"></i>
              </div>
            )}
            <div className="z-10">
              <p className="text-2xl">{userDetail.nickname}</p>
              <p className="text-sm">@{userDetail.userCode}</p>
            </div>
          </div>
          <br />
          <img src={waitImg} alt="img" className="rounded-lg" />
          {/* <p>컨텐츠를 준비중이에요..!</p> */}
        </div>
      </div>
    )
  )
}

export default UserDetailModal
