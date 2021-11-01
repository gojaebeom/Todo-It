import { useTodoEdit } from '../../../states/todoEditState'

const TodoEditForm = () => {
  const {
    editTodoForm,
    todoEdit,
    changeTodoEditInputs,
    submitTodoEdit,
    closeTodoEditForm,
  } = useTodoEdit()

  return (
    editTodoForm && (
      <div className="flex flex-col items-center justify-center w-full mb-4">
        <div className="z-10 flex flex-col items-center justify-center w-full bg-white border rounded-md">
          <input
            className="w-full p-2 text-xl rounded-md outline-none"
            placeholder="일정"
            name="title"
            onChange={changeTodoEditInputs}
            value={todoEdit.title}
            maxLength={30}
          />
          <textarea
            className="w-full p-2 border-t outline-none rounded-b-md"
            placeholder="상세내용"
            name="description"
            onChange={changeTodoEditInputs}
            value={todoEdit.description}
          ></textarea>
        </div>

        <div className="flex items-center justify-start w-full mt-2">
          <button
            className="px-5 py-2 mr-3 text-white bg-red-400 rounded-md"
            onClick={submitTodoEdit}
          >
            일정 수정
          </button>
          <button
            className="px-5 py-2 border rounded-md"
            onClick={closeTodoEditForm}
          >
            취소
          </button>
        </div>
      </div>
    )
  )
}
export default TodoEditForm
