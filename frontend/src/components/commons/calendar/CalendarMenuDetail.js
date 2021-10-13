import Notification from "../notification/Notification";
import React from "react";
import {useRecoilState} from "recoil";
import {calendarDetailState} from "../../../atoms/calendarDetailState";
import CalendarEditModalOpenButton from "../calendarEditModal/CalendarEditModalOpenButton";
import {userState} from "../../../atoms/userState";
import CalendarMenuDetailInvitor from "./CalendarMenuDetailInvitor";
import CalendarMenuDetailItem from "./CalendarMenuDetailItem";
import UserLogoutButton from "../user/UserLogoutButton";
import UserUpdateModalOpenButton from "../userUpdateModal/UserUpdateModalOpenButton";

const CalendarMenuDetail = () => {

    const [calendarDetail, setCalendarDetail] = useRecoilState(calendarDetailState);
    const [user, setUser] = useRecoilState(userState);

    return(
    <div className="relative flex flex-col items-center justify-start w-full h-full rounded-tl-xl bg-gray-50">
            <Notification/>

            <div className="flex items-center justify-between w-full h-12 pl-3 text-xl border-b font-noto-bold">
                <div>{calendarDetail.name}</div>
                { user.id === calendarDetail.userId && <CalendarEditModalOpenButton/> }
            </div>
            <div className="flex flex-col items-start justify-start w-full p-3">
                <CalendarMenuDetailInvitor/>
                <h1 className="text-md font-noto-regular">참여 인원 ({calendarDetail.members.length})</h1>
                <div className="flex flex-col items-start justify-start w-full pt-3 pl-3">
                {
                    calendarDetail.members.map(( item ) => {
                        return( <CalendarMenuDetailItem key={item.id} item={item} /> )
                    })
                }
                </div>
            </div>
            <div className="absolute bottom-0 left-0 flex items-center justify-between w-full h-12 border-t">
                <div className="flex items-center justify-start">
                    {
                        user.profilePreviewImg ?
                        <img src={`${process.env.REACT_APP_API_URL}/images${user.profilePreviewImg}`} alt="img" className="w-8 h-8 mx-2 border border-gray-300 rounded-full"/> :
                        <div className="flex items-center justify-center w-8 h-8 mx-2 border border-gray-500 rounded-full">
                            <i className="far fa-user"></i>
                        </div>
                    }
                    <div className="flex flex-col">
                        <p className="text-xs">@{user.userCode}</p>
                    </div>
                </div>
                <div className="flex items-center justify-end">
                    <UserLogoutButton />
                    <UserUpdateModalOpenButton />
                </div>
            </div>
        </div>
    )
}
export default CalendarMenuDetail;