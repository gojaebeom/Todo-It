import { useEffect } from "react";
import { useHistory } from "react-router";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { calendarDetailState } from "../../atoms/calendarDetailState";
import { calendarEditState } from "../../atoms/calendarEditState";
import { calendarsState } from "../../atoms/calendarsState";
import { inviteInputState } from "../../atoms/inviteInputState";
import { notificationsState } from "../../atoms/notificationsState";
import { creationCalendarModalState } from "../../atoms/ui/creationCalendarModalState";
import { editCalendarModalState } from "../../atoms/ui/editCalendarModalState";
import { notificationModalState } from "../../atoms/ui/notificationModalState";
import { toastState } from "../../atoms/ui/toastState";
import { updateUserModalState } from "../../atoms/ui/updateUserModalState";
import { userEditState } from "../../atoms/userEditState";
import { userState } from "../../atoms/userState";
import ApiScaffold from "../../shared/api";

const defaultLayoutEvent = (DefaultLayout) => {
    return ({ children }) => {
        const history = useHistory();

        const setToast = useSetRecoilState(toastState);

        const [user, setUser] = useRecoilState(userState);
        const [calendars, setCalendars] = useRecoilState(calendarsState);

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
            refreshNotificationModal();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [user]);
        
        const clickLogoutEvent = async () => {
            // eslint-disable-next-line no-restricted-globals
            const result = confirm("로그아웃 하시겠습니까?");
            if(!result) return;
            
            await ApiScaffold({
                method: "get",
                url: `/users/logout`,
            }, (err) => setToast({open:true, message:err, type:"ERROR" ,second:2000}));
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
            console.debug(calendarDetail);
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
            if(!inviteInput){
                setToast({open:true, message:"유저코드를 입력하지 않았어요!", type:"WARNING",second:2000});
                setInviteInput("");
                return false;
            }
            if(inviteInput === user.userCode){
                setToast({open:true, message:"본인을 초대할 수 없어요!", type:"WARNING",second:2000});
                setInviteInput("");
                return false;
            }

            const formData = new FormData();
            formData.append("fromUserId", user.id);
            formData.append("toUserCode", inviteInput);
            formData.append("type", "JOIN_CALENDAR");
            formData.append("actionUrl", `/users/${inviteInput}/join/calendars/${calendarDetail.id}`);
            formData.append("content", `${user.nickname}님이 당신을 ${calendarDetail.name} 그룹에 초대했어요!`);

            await ApiScaffold({
                method: "post",
                url: `/notifications`,
                data: formData
            }, (err) => setToast({open:true, message:err, type:"ERROR" ,second:2000}));
            
            setToast({open:true, message:"초대 알림을 보냈어요!", type:"SUCCESS",second:2000});
            setInviteInput("");
        }

        const toggleNotificationModal =  () => setNotificationModal(!notificationModal);
        

        const refreshNotificationModal = async () => {
            if(user.id){
                const res = await ApiScaffold({
                    method: "get",
                    url: `/notifications?toUserId=${user.id}`,
                }, (err) => setToast({open:true, message:err, type:"ERROR", second:2000}));
                setNotifications([...res.data]);
                // setToast({open:true, message:"새로고침 완료!", type:"SUCCESS",second:2000});
            }
        }

        const acceptNotification = async ( id, actionUrl ) => {
            await ApiScaffold({
                method: "get",
                url: actionUrl,
            }, (err) => setToast({open:true, message:err, type:"ERROR" ,second:2000}));
            await ApiScaffold({
                method: "put",
                url: `/notifications/${id}/is-confirmed`,
            }, (err) => setToast({open:true, message:err, type:"ERROR" ,second:2000}));
            refreshNotificationModal();

            const userRes = await ApiScaffold({
                method: "get",
                url: `/users/${user.id}`
            }, (err) => setToast({open:true, message:err, type:"ERROR" ,second:2000}));
            setUser({...userRes.data.user});
            if(userRes.data.calendars.length !== 0){
                setCalendars([...userRes.data.calendars]);
                setCalendarDetail({...userRes.data.calendars[0]});
            }
        }

        const refusalNotification = async ( id ) => {
            await ApiScaffold({
                method: "put",
                url: `/notifications/${id}/is-confirmed`,
            }, (err) => setToast({open:true, message:err, type:"ERROR" ,second:2000}));
            refreshNotificationModal();
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
            refusalNotification={refusalNotification}
            acceptNotification={acceptNotification}
        />
        );
    }
}
export default defaultLayoutEvent;