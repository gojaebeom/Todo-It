import moment from "moment";
import ApiScaffold from "../../../shared/api";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import { useCalendars } from "../../../atoms/calendarsState";
import CalendarCell from "./CalendarCell";

const Calendar = () => {
    const {
        calendarDetail,
        user,
        setToast,
        setTodosByMonth,
        customizes,
        getCalendarCustomizes,
        today,
        setToday
    } = useCalendars();


    const firstWeek = today.clone().startOf('month').week();
    const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        if(calendarDetail.id && user.id){
            const loadRes = await ApiScaffold({
                method: "get",
                url: `/todos?calendarId=${calendarDetail.id}&userId=${user.id}`
            }, (err) => setToast({open:true, message:err, type:"ERROR",second:2000}));
            setTodosByMonth(loadRes.data);
            await getCalendarCustomizes();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [calendarDetail.id, setTodosByMonth, user.id]);

    const calendarArray = () =>{
        let result = [];
        let week = firstWeek;

        for(week; week <= lastWeek; week++){
            result = result.concat(
                <tr key={week}>
                    {
                        // eslint-disable-next-line no-loop-func
                        Array(7).fill(0).map((data, index) => {
                            return(
                            <CalendarCell key={index} index={index} today={today} week={week} />
                            );
                        })
                    }
                </tr>
            );
        }
        return result;
    }

    return (
    <>
        <div className="flex items-center justify-between w-full mb-5">
            <div className="flex items-center justify-start">
                <button
                    className="px-3"
                    onClick={() => setToday(today.clone().subtract(1, 'year'))}
                >
                    <i className="fas fa-angle-double-left"></i>
                </button>
                <div className="flex items-center justify-center">
                    <button
                        className="px-3"
                        onClick={() => setToday(today.clone().subtract(1, 'month'))}
                    >
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <div className="text-2xl">{today.format('YYYY 년 MM 월')}</div>
                    <button
                        className="px-3"
                        onClick={() => setToday(today.clone().add(1, 'month'))}
                    >
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
                <button
                    className="px-3"
                    onClick={() => setToday(today.clone().add(1, 'year'))}
                >
                    <i className="fas fa-angle-double-right"></i>
                </button>
            </div>
        </div>

        <table className="w-full mb-10 table-fixed">
            <thead>
            <tr className="text-right">
                <th>일</th>
                <th>월</th>
                <th>화</th>
                <th>수</th>
                <th>목</th>
                <th>금</th>
                <th>토</th>
            </tr>
            </thead>
            <tbody>
            { calendarArray() }
            </tbody>
        </table>
    </>
    )
}
export default Calendar;