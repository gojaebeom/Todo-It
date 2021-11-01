import { atom, useRecoilState } from 'recoil'

export const todoDetailState = atom({
  key: 'todoDetailState',
  default: {
    id: '',
    description: '',
  },
})

export const useTodoDetail = () => {
  const [todoDetail, setTodoDetail] = useRecoilState(todoDetailState)

  const todoDetailToggle = (todo) => {
    if (!todoDetail.id) {
      setTodoDetail({
        ...todoDetail,
        id: todo.id,
        description: todo.description,
      })
    } else {
      setTodoDetail({ ...todoDetail, id: '', description: '' })
    }
  }

  return {
    todoDetail,
    todoDetailToggle,
  }
}
