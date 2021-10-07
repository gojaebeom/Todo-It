import { useEffect } from "react";
import { useHistory } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { calendarDetailState } from "../../atoms/calendarDetailState";
import { calendarEditState } from "../../atoms/calendarEditState";
import { calendarsState } from "../../atoms/calendarsState";
import { inviteInputState } from "../../atoms/inviteInputState";
import { notificationsState } from "../../atoms/notificationsState";
import { creationCalendarModalState } from "../../atoms/ui/creationCalendarModalState";
import { editCalendarModalState } from "../../atoms/ui/editCalendarModalState";
import { notificationModalState } from "../../atoms/ui/notificationModalState";
import { updateUserModalState } from "../../atoms/ui/updateUserModalState";
import { userEditState } from "../../atoms/userEditState";
import { userState } from "../../atoms/userState";
import ApiScaffold from "../../shared/api";

const defaultLayoutEvent = (DefaultLayout) => {
    return ({ children }) => {
        const history = useHistory();

        const user = useRecoilValue(userState);
        const calendars = useRecoilValue(calendarsState);
        const [userEdit, setUserEdit] = useRecoilState(userEditState);

        const [createionCalendarModalOpen, setCreationCalendarModalOpen] = useRecoilState(creationCalendarModalState);
        const [userModalOpen, setUserModalOpen] = useRecoilState(updateUserModalState);
        const [calendarDetail, setCalendarDetail] = useRecoilState(calendarDetailState);
        const [calendarEditModal, setCalendarEditModal] = useRecoilState(editCalendarModalState);
        const [calendarEdit, setCalendarEdit] = useRecoilState(calendarEditState);

        const [inviteInput, setInviteInput] = useRecoilState(inviteInputState);

        const [notificationModal, setNotificationModal ] = useRecoilState(notificationModalState);
        const [notifications, setNotifications ] = useRecoilState(notificationsState);

        useEffect(() => {
            console.debug(notifications);
        }, [notifications]);


        useEffect(() => {
            console.debug(calendars);
            console.debug(calendarDetail);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [calendarDetail]);
        
        const clickLogoutEvent = async () => {
            // eslint-disable-next-line no-restricted-globals
            const result = confirm("로그아웃 하시겠습니까?");
            if(!result) return;
            
            await ApiScaffold({
                method: "get",
                url: `/users/logout`,
            });
            // history.push("/login");
            window.location.href = "/login";
        }

        const clickCreationCalendarModalOpenEvent = () => 
            setCreationCalendarModalOpen({...createionCalendarModalOpen, open:true});

        const clickUpdateUserModalOpenEvent = () => {
            setUserEdit({
                ...userEdit,
                id: user.id,
                email: user.email,
                nickname: user.nickname,
                userCode: user.userCode,
                createdAt: user.createdAt,
            });
            setUserModalOpen({...userModalOpen, open:true});
        }

        const clickCalendarSelectEvent = async ( item ) => {
            console.debug(item.id);
            for(let calendar of calendars){
                if(calendar.id === item.id){
                    setCalendarDetail({...calendar});
                }
            }    
            history.push("/");
        }

        const editCalendarModalOpen = () => {
            setCalendarEdit({
                ...calendarEditState, 
                id:calendarDetail.id,
                name:calendarDetail.name,
                isPrivate: calendarDetail.isPrivate
            });
            setCalendarEditModal({...calendarEditModal, open:true});
        }

        const changeInviteInput = ( e ) => {
            setInviteInput(e.target.value);
        }
        const submitInviteInput = async ( ) => {

            const formData = new FormData();
            formData.append("fromUserId", user.id);
            formData.append("toUserCode", inviteInput);
            formData.append("type", "CALENDAR_INVITE");
            formData.append("actionUrl", `/calendars/${calendarDetail.id}/invite/users/${inviteInput}`);
            formData.append("content", `'${calendarDetail.name}' 그룹에서 당신을 초대합니다!`);

            await ApiScaffold({
                method: "post",
                url: `/notifications`,
                data: formData
            });
            
            setInviteInput("");
        }

        const toggleNotificationModal =  () => {
            
            setNotificationModal(!notificationModal);
        }

        const refreshNotificationModal = async () => {
            if(notificationModal){
                const res = await ApiScaffold({
                    method: "get",
                    url: `/notifications?toUserId=${user.id}`,
                });
                console.debug(res.data);

                setNotifications([...res.data]);
            }
        }

        return (
        <DefaultLayout
            children={children}
            user={user}
            clickLogoutEvent={clickLogoutEvent}

            calendars={calendars}
            calendarDetail={calendarDetail}
            clickCreationCalendarModalOpenEvent={clickCreationCalendarModalOpenEvent}
            clickUpdateUserModalOpenEvent={clickUpdateUserModalOpenEvent}
            clickCalendarSelectEvent={clickCalendarSelectEvent}

            editCalendarModalOpen={editCalendarModalOpen}

            inviteInput={inviteInput}
            changeInviteInput={changeInviteInput}
            submitInviteInput={submitInviteInput}

            toggleNotificationModal={toggleNotificationModal}
            refreshNotificationModal={refreshNotificationModal}
            notificationModal={notificationModal}
            notifications={notifications}
        />
        );
    }
}
export default defaultLayoutEvent;