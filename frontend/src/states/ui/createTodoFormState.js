import {
  atom,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil'
import ApiScaffold from '../../customs/api'
import { toastState } from './toastState'
import { useHistory } from 'react-router-dom'
import { calendarDetailState } from '../calendarDetailState'
import dateFormat from '../../customs/dateFormat'
import { editTodoFormState } from './editTodoFormState'
import { todoStoreState } from '../todoStoreState'
import { userState } from '../userState'
import { useTodos } from '../todosState'

export const createTodoFormState = atom({
  key: 'createTodoFormState', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})

export const useCreateTodoForm = () => {
  const setToast = useSetRecoilState(toastState)
  const history = useHistory()
  const calendar = useRecoilValue(calendarDetailState)
  const [createTodoForm, setCreateTodoForm] = useRecoilState(
    createTodoFormState,
  )
  const [editTodoForm, setEditTodoForm] = useRecoilState(editTodoFormState)
  const resetTodoStore = useResetRecoilState(todoStoreState)
  const [todoStore, setTodoStore] = useRecoilState(todoStoreState)
  const user = useRecoilValue(userState)
  const { day } = dateFormat(history)

  const { refreshTodos } = useTodos()

  const storeTodoFormToggle = () => {
    resetTodoStore()
    setCreateTodoForm(!createTodoForm)
  }

  const changeStoreHandler = (e) => {
    const name = e.target.name
    const value = e.target.value

    if (name === 'title') {
      setTodoStore({ ...todoStore, title: value })
    } else if (name === 'description') {
      setTodoStore({ ...todoStore, description: value })
    } else if (name === 'calendarIdList') {
      const checked = e.target.checked
      if (checked === true) {
        setTodoStore({
          ...todoStore,
          calendarId: [...todoStore.calendarId].concat(value),
        })
      } else {
        const newCalendarIdList = todoStore.calendarId.filter(
          (item) => item !== value,
        )
        console.debug(newCalendarIdList)
        setTodoStore({ ...todoStore, calendarId: newCalendarIdList })
      }
    }
  }

  const clickTodoCreateHandler = async (e) => {
    if (!todoStore.title)
      return setToast({
        open: true,
        message: '제목은 필수입니다!',
        type: 'WARNING',
        second: 2000,
      })
    if (todoStore.calendarId.length === 0) {
      return setToast({
        open: true,
        message: '한 개 이상의 캘린더를 채크해주세요!',
        type: 'WARNING',
        second: 2000,
      })
    }
    setEditTodoForm(false)
    const formData = new FormData()
    formData.append('title', todoStore.title)
    formData.append('description', todoStore.description)
    formData.append('matchedDate', day)
    formData.append('userId', user.id)
    formData.append('calendarIdList', todoStore.calendarId)
    await ApiScaffold({
      method: 'post',
      url: '/todos',
      data: formData,
    })
    resetTodoStore()
    await refreshTodos()
    storeTodoFormToggle()
  }

  return {
    calendar,
    createTodoForm,
    clickTodoCreateHandler,
    changeStoreHandler,
    storeTodoFormToggle,
    todoStore,
    setTodoStore,
    editTodoForm,
  }
}
