import { useRecoilValue } from 'recoil'
import { userState } from '../../../atoms/userState'
import { useTodoEdit } from '../../../atoms/todoEditState'

const TodoGroupItem = ({ item, writer }) => {
  const user = useRecoilValue(userState)
  const {
    setToast,
    changeTodoEditIsFinished,
    editFormOpenEvent,
    deleteTodoEvent,
  } = useTodoEdit()
  // const { todoDetail, todoDetailToggle } = useTodoDetail();

  return (
    <div
      key={item.id}
      className="flex flex-col items-center justify-center w-full p-2 mb-2 bg-gray-100 border-2 border-gray-200 border-dashed rounded-md shadow-sm cursor-pointer"
      style={{ borderRadius: '3px' }}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex justify-start itmes-center">
          <label className="flex items-center mr-2 cursor-pointer">
            <label
              className={`w-5 h-5 flex justify-center items-center border border-gray-200 rounded-sm outline-none cursor-pointer mr-2
                                                ${
                                                  item.isFinished
                                                    ? 'bg-indigo-400'
                                                    : 'bg-white'
                                                }`}
            >
              {item.isFinished ? (
                <i className="pt-1 text-xs text-white fas fa-check"></i>
              ) : (
                ''
              )}
              <input
                type="checkbox"
                name="isFinished"
                defaultChecked={item.isFinished ? true : false}
                onChange={async () => {
                  if (user.id !== writer.id) {
                    setToast({
                      open: true,
                      message: '다른 맴버의 글을 토글할 수 없어요!',
                      type: 'WARNING',
                      second: 2000,
                    })
                    return false
                  }
                  await changeTodoEditIsFinished(item)
                }}
                className="w-0 h-0"
              />
            </label>
            <p className={'hover:text-indigo-500'}>{item.title}</p>
          </label>
          {/* <button
                    onClick={() => todoDetailToggle(item)}
                    className="mt-1 text-xs hover:text-indigo-400"
                >{(todoDetail.id && todoDetail.id === item.id ) ? '..접기' : '..자세히'}</button> */}
        </div>
        {writer.id === user.id && (
          <div className="flex items-center justify-center w-auto p-1 bg-gray-200 border border-dashed rounded-sm">
            {/* <i className="mr-4 far fa-caret-square-up"></i>
                     <i className="mr-4 far fa-caret-square-down"></i> */}
            <i
              className="mx-2 far fa-edit hover:text-yellow-500"
              onClick={() => editFormOpenEvent(item)}
            ></i>
            <i
              className="mx-2 far fa-trash-alt hover:text-red-500"
              onClick={() => deleteTodoEvent(item.id)}
            ></i>
          </div>
        )}
      </div>
      {item.description && (
        <div className="flex items-center justify-start w-full mt-2">
          <pre className="px-2 py-1 font-noto-light">{item.description}</pre>
        </div>
      )}
    </div>
  )
}
export default TodoGroupItem
