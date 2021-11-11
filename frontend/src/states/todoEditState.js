import { atom, useRecoilState, useSetRecoilState } from 'recoil'
import ApiScaffold from '../customs/api'
import { useTodos } from './todosState'
import { editTodoFormState } from './ui/editTodoFormState'
import { toastState } from './ui/toastState'

export const todoEditState = atom({
  key: 'todoEditState', // unique ID (with respect to other atoms/selectors)
  default: {
    id: '',
    title: '',
    description: '',
    isFinished: '',
  }, // default value (aka initial value)
})

export const useTodoEdit = () => {
  const setToast = useSetRecoilState(toastState)
  const { refreshTodos } = useTodos()
  const [todoEdit, setTodoEdit] = useRecoilState(todoEditState)
  const [editTodoForm, setEditTodoForm] = useRecoilState(editTodoFormState)

  const changeTodoEditIsFinished = async (item) => {
    const formData = new FormData()
    formData.append('id', item.id)
    formData.append('isFinished', !item.isFinished ? 1 : 0)
    await ApiScaffold({
      method: 'put',
      url: `/todos/${item.id}`,
      data: formData,
    })
    await refreshTodos()
  }
  const editFormOpenEvent = (todo) => {
    setTodoEdit({
      ...todoEdit,
      id: todo.id,
      title: todo.title,
      description: todo.description,
      isFinished: todo.isFinished,
    })
    setEditTodoForm(true)
  }

  const closeTodoEditForm = () => setEditTodoForm(false)

  const changeTodoEditInputs = (e) => {
    const name = e.target.name
    const value = e.target.value
    if (name === 'title') setTodoEdit({ ...todoEdit, title: value })
    else if (name === 'description')
      setTodoEdit({ ...todoEdit, description: value })
  }

  const submitTodoEdit = async () => {
    if (!todoEdit.title)
      return setToast({
        open: true,
        message: '제목은 필수입니다!',
        type: 'WARNING',
        second: 2000,
      })

    const formData = new FormData()
    formData.append('id', todoEdit.id)
    formData.append('title', todoEdit.title)
    formData.append('description', todoEdit.description)
    await ApiScaffold({
      method: 'put',
      url: `/todos/${todoEdit.id}`,
      data: formData,
    })
    await refreshTodos()
    closeTodoEditForm()
  }

  const deleteTodoEvent = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm('일정을 삭제하시겠습니까?')
    if (result) {
      await ApiScaffold({
        method: 'delete',
        url: `/todos/${id}`,
      })
      await refreshTodos()
    }
  }

  return {
    setToast,
    editTodoForm,
    todoEdit,
    deleteTodoEvent,
    editFormOpenEvent,
    changeTodoEditIsFinished,
    submitTodoEdit,
    changeTodoEditInputs,
    closeTodoEditForm,
  }
}
