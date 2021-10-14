import CalendarCreateModal from "../../commons/calendarCreateModal/CalendarCreateModal";
import UserUpdateModal from "../../commons/userUpdateModal/UserUpdateModal";
import LoadingPage from "../../commons/loadingPage/LoadingPage";
import CalendarEditModal from "../../commons/calendarEditModal/CalendarEditModal";

import React from "react";
import CalendarMenu from "../../commons/calendar/CalendarMenu";
import CalendarMenuDetail from "../../commons/calendar/CalendarMenuDetail";
import waitingImg from "../../../assets/images/wait.svg";

const DefaultLayout = ({ children }) => {
    return(
    <div className="fixed top-0 left-0 flex items-center w-full h-full text-black bg-red-300 font-noto-regular">
        <div className="flex items-center justify-start w-full h-full">
            <aside className="flex w-2/12 h-full border-r min-w-350">
                <CalendarMenu/>
                <CalendarMenuDetail/>
            </aside>

            <section className="flex flex-col items-start justify-start w-full h-full bg-white">
                <div className="flex items-center w-full pl-3 text-2xl border-b h-13 font-noto-bold"></div>
                <div className="flex flex-col items-center justify-start w-full h-full p-5 overflow-y-auto custom-scroll">
                    { children }
                </div>
            </section>

            <aside className="flex-col items-start justify-start hidden w-2/12 h-full bg-white border-l border-r 2xl:flex min-w-350 ">
                <div className="flex items-center w-full pl-3 text-xl border-b h-13 font-noto-bold">
                    생산성 🍬
                </div>
                <div className="flex flex-col items-center justify-center h-full">
                    <img src={waitingImg} alt="img" className="w-10/12"/>
                    <p>준비중이에요..!</p>
                </div>
            </aside>
        </div>
        <CalendarCreateModal/>
        <CalendarEditModal/>
        <UserUpdateModal/> 
        <LoadingPage/>
    </div>
    )
}
export default DefaultLayout;