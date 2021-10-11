import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { calendarDetailState } from "../../atoms/calendarDetailState";
import { todosByMonthState } from "../../atoms/todosByMonthState";
import { toastState } from "../../atoms/ui/toastState";
import { userState } from "../../atoms/userState";
import ApiScaffold from "../../shared/api";

const homeEvent = (Home) => {
    return () => {

        const setToast = useSetRecoilState(toastState);

        const calendarDetail = useRecoilValue(calendarDetailState);
        const user = useRecoilValue(userState);
        const [todosByMonth, setTodosByMonth ] = useRecoilState(todosByMonthState);

        const [today, setToday] = useState(moment());
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
                                let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day');
                                return(
                                    <td key={index} className={`
                                        border h-120
                                        ${ index % 7 === 0 || index % 6 === 0 ? 'bg-gray-100':'' }
                                        hover:shadow-inner
                                        `}
                                    >
                                        <Link 
                                            to={`/calendars/${calendarDetail.id}/days/${days.format('YYYY-MM-DD')}`} 
                                            className={`${days.format('MM') !== today.format('MM') && 'opacity-30'} flex flex-col justify-start items-end h-full`}
                                        >
                                            <span className={`mb-2 ${moment().format('YYYYMMDD') === days.format('YYYYMMDD') && 'bg-red-400  text-white rounded-2xl px-2'}`}>
                                                {days.format('D')}
                                            </span>
                                            <ul className="flex flex-col items-start justify-center w-full">
                                                {
                                                    // eslint-disable-next-line array-callback-return
                                                    todosByMonth.map((item, index) => {
                                                        if(days.format('YYYY-MM-DD') === item.matchedDate) {
                                                            return(
                                                            <li className="relative w-full text-sm truncate overflow-ellipsis" key={item.id}>
                                                                ·{ item.title }
                                                            </li>
                                                            )
                                                        }
                                                        
                                                    })
                                                }
                                            </ul>
                                        </Link>
                                    </td>
                                );
                            })
                        }
                    </tr>
                )
            }
            return result; 
        }

        return (
        <Home
            today={today}
            setToday={setToday}
            calendarArray={calendarArray}
        />
        )
    }
}
export default homeEvent;