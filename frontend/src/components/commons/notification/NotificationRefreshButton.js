import React from "react";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {userState} from "../../../atoms/userState";
import {toastState} from "../../../atoms/ui/toastState";
import ApiScaffold from "../../../shared/api";
import {notificationsState} from "../../../atoms/notificationsState";

const NotificationRefreshButton = () => {
    const user = useRecoilValue(userState);
    const setNotifications = useSetRecoilState(notificationsState);
    const setToast = useSetRecoilState(toastState);


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
    return(
    <button
        className="text-xs cursor-pointer"
        onClick={refreshNotificationModal}
    >
        <i className="mr-1 fas fa-redo-alt"></i>
        새로고침
    </button>
    )
}
export default NotificationRefreshButton;