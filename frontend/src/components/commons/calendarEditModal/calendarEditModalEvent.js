import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil'
import { calendarDetailState } from '../../../states/calendarDetailState'
import { calendarEditState } from '../../../states/calendarEditState'
import { calendarsState } from '../../../states/calendarsState'
import { editCalendarModalState } from '../../../states/ui/editCalendarModalState'
import { toastState } from '../../../states/ui/toastState'
import { userState } from '../../../states/userState'
import ApiScaffold from '../../../shared/api'
import readImgFile from '../../../shared/readImgFile'

const calendarEditModalEvent = (Compoent) => {
  return () => {
    const setToast = useSetRecoilState(toastState)

    const user = useRecoilValue(userState)
    const [calendarDetail, setCalendarDetail] = useRecoilState(
      calendarDetailState,
    )
    const [calendarEdit, setCalendarEdit] = useRecoilState(calendarEditState)
    const [calendarEditModal, setCalendarEditModal] = useRecoilState(
      editCalendarModalState,
    )
    const setCalendars = useSetRecoilState(calendarsState)
    const resetCalendarEdit = useResetRecoilState(editCalendarModalState)

    const calendarEditModalClose = (e) => {
      resetCalendarEdit()
      setCalendarEditModal({ open: false, submit: false })
    }

    const changeImage = (e) => {
      readImgFile(e, (event, file) => {
        setCalendarEdit({
          ...calendarEdit,
          thumbnail: event.target.result,
          thumbnailFile: file,
        })
      })
    }

    const deleteImage = async (calendarId) => {
      // eslint-disable-next-line no-restricted-globals
      const result = confirm('이미지를 초기화하시겠습니까?')
      setCalendarEdit({ ...calendarEdit, thumbnail: '' })
      if (!result) return false
      await ApiScaffold(
        {
          method: 'delete',
          url: `/calendars/${calendarId}/images`,
        },
        (err) => {
          setCalendarEditModal({ ...calendarEditModal, submit: false })
          setToast({ open: true, message: err, type: 'WARNING', second: 2000 })
        },
      )
      setToast({
        open: true,
        message: '썸네일이 초기화 되었습니다',
        type: 'SUCCESS',
        second: 2000,
      })

      const calendarsRes = await ApiScaffold({
        method: 'get',
        url: `/calendars?userId=${user.id}`,
      })
      setCalendars([...calendarsRes.data])
      for (let calendar of calendarsRes.data) {
        if (calendar.id === calendarDetail.id) {
          setCalendarDetail({ ...calendar })
        }
      }
    }

    const changeCalendarEditInputs = (e) => {
      const name = e.target.name
      const value = e.target.value

      if (name === 'isPrivate') {
        setCalendarEdit({
          ...calendarEdit,
          isPrivate: !calendarEdit.isPrivate ? 1 : 0,
        })
      } else {
        setCalendarEdit({ ...calendarEdit, name: value })
      }
    }

    const submitCalendarEdit = async () => {
      if (!calendarEdit.name)
        return setToast({
          open: true,
          message: '캘린더 이름은 필수값입니다!',
          type: 'WARNING',
          second: 2000,
        })

      setCalendarEditModal({ ...calendarEditModal, submit: true })

      const formData = new FormData()
      formData.append('userId', user.id)
      if (calendarEdit.name) formData.append('name', calendarEdit.name)
      if (calendarEdit.thumbnailFile)
        formData.append('thumbnail', calendarEdit.thumbnailFile)
      formData.append('isPrivate', !calendarEdit.isPrivate ? 0 : 1)

      await ApiScaffold(
        {
          method: 'put',
          url: `/calendars/${calendarDetail.id}`,
          data: formData,
        },
        (err) => {
          setCalendarEditModal({ ...calendarEditModal, submit: false })
          setToast({ open: true, message: err, type: 'WARNING', second: 2000 })
        },
      )

      const calendarsRes = await ApiScaffold({
        method: 'get',
        url: `/calendars?userId=${user.id}`,
      })
      setCalendars([...calendarsRes.data])
      for (let calendar of calendarsRes.data) {
        if (calendar.id === calendarDetail.id) {
          setCalendarDetail({ ...calendar })
        }
      }

      setCalendarEditModal({ ...calendarEditModal, open: false, submit: false })
    }

    const deleteCalendarEdit = async () => {
      // eslint-disable-next-line no-restricted-globals
      const result = confirm('캘린더를 삭제하시겠습니까?')
      if (result) {
        await ApiScaffold({
          method: 'delete',
          url: `/calendars/${calendarDetail.id}`,
        })

        const calendarsRes = await ApiScaffold({
          method: 'get',
          url: `/calendars?userId=${user.id}`,
        })
        console.debug(calendarsRes)

        setCalendars([...calendarsRes.data])
        for (let calendar of calendarsRes.data) {
          if (calendar.id === calendarDetail.id) {
            setCalendarDetail({ ...calendar })
          }
        }
        setCalendarEditModal({
          ...calendarEditModal,
          open: false,
          submit: false,
        })
      }
    }

    return (
      <Compoent
        calendarDetail={calendarDetail}
        calendarEditModal={calendarEditModal}
        calendarEdit={calendarEdit}
        changeImage={changeImage}
        deleteImage={deleteImage}
        changeCalendarEditInputs={changeCalendarEditInputs}
        calendarEditModalClose={calendarEditModalClose}
        submitCalendarEdit={submitCalendarEdit}
        deleteCalendarEdit={deleteCalendarEdit}
      />
    )
  }
}
export default calendarEditModalEvent
