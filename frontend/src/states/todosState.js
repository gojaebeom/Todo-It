import { atom, useRecoilState, useRecoilValue } from 'recoil'
import ApiScaffold from '../customs/api'
import dateFormat from '../customs/dateFormat'
import { useHistory } from 'react-router-dom'
import { calendarDetailState } from './calendarDetailState'
import { userState } from './userState'

export const todosState = atom({
  key: 'todosState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
})

export const useTodos = () => {
  const [todos, setTodos] = useRecoilState(todosState)
  const { day } = dateFormat(useHistory())
  const calendar = useRecoilValue(calendarDetailState)
  const user = useRecoilValue(userState)

  const refreshTodos = async () => {
    if (calendar.id && user.id) {
      const loadRes = await ApiScaffold({
        method: 'get',
        url: `/todos?calendarId=${calendar.id}&matchedDate=${day}&userId=${user.id}`,
      })
      if (loadRes) {
        setTodos([...loadRes.data])
      }
    }
  }

  return {
    calendar,
    user,
    todos,
    refreshTodos,
  }
}
