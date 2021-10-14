import React from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {calendarsState} from "../../../atoms/calendarsState";
import NotificationToggleButton from "../notification/NotificationToggleButton";
import CalendarMenuItem from "./CalendarMenuItem";
import CalendarCreateModalOpenButton from "../calendarCreateModal/CalendarCreateModalOpenButton";



const CalendarMenu = () => {
    const calendars = useRecoilValue(calendarsState);
    return(
    <div className="flex flex-col items-center justify-start h-full py-3 min-w-80">
        <NotificationToggleButton />
        <div className="w-2/5 my-3 border-t border-white border-dashed"></div>
        {
            calendars &&
            calendars.map((item)=>{
                return(
                <CalendarMenuItem item={item} key={item.id}/>
                )
            })
        }
<<<<<<< HEAD
=======

>>>>>>> 37eb860fe05fa445dc37d2f788d841dadce1554d
        <CalendarCreateModalOpenButton/>
        <div className="flex items-center justify-center w-12 h-12 mb-2 overflow-hidden rounded-full cursor-pointer bg-gray-50"
             title="공개 캘린더"
             onClick={() => alert("준비중인 기능입니다!")}
        >
            <i className="text-2xl text-red-400 fab fa-bandcamp"></i>
        </div>
    </div>
  )
}
export default CalendarMenu;