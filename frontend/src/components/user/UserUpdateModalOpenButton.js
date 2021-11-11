import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userEditState } from '../../states/userEditState'
import { userState } from '../../states/userState'
import { updateUserModalState } from '../../states/ui/updateUserModalState'

const UserUpdateModalOpenButton = () => {
  const [userEdit, setUserEdit] = useRecoilState(userEditState)
  const user = useRecoilValue(userState)
  const [userModalOpen, setUserModalOpen] = useRecoilState(updateUserModalState)

  const clickUpdateUserModalOpenEvent = () => {
    setUserEdit({
      ...userEdit,
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      userCode: user.userCode,
      createdAt: user.createdAt,
    })
    setUserModalOpen({ ...userModalOpen, open: true })
  }

  return (
    <button onClick={clickUpdateUserModalOpenEvent}>
      <i className="mx-2 fas fa-cog"></i>
    </button>
  )
}
export default UserUpdateModalOpenButton
