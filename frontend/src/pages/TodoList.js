import DefaultLayout from '../components/_layouts/DefaultLayout'
import TodoEditForm from '../components/todo/TodoEditForm'
import TodoCreateForm from '../components/todo/TodoCreateForm'
import TodoGroup from '../components/todo/TodoGroup'
import TodoIsNull from '../components/todo/TodoIsNull'
import { useHistory } from 'react-router-dom'
import dateFormat from '../customs/dateFormat'

const TodoList = () => {
  const history = useHistory()
  const { filterDay } = dateFormat(history)

  return (
    <DefaultLayout>
      <div className="relative flex flex-col items-center w-full">
        <div className="flex items-center justify-between w-full mb-2 md:p-0">
          <div className="flex items-center text-xl font-noto-medium group">
            <button
              className="p-4 py-1 mr-2 rounded-xl group-hover:bg-red-300"
              onClick={() => history.goBack()}
            >
              <i className="text-xl text-red-400 fas fa-chevron-left group-hover:text-white"></i>
            </button>
            <span>{filterDay}</span>
          </div>
          <div>필터</div>
        </div>
        <TodoEditForm />
        <TodoCreateForm />
        <TodoGroup />
        <TodoIsNull />
      </div>
    </DefaultLayout>
  )
}
export default TodoList
