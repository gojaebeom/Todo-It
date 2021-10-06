import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { calendarDetailState } from "../../atoms/calendarDetailState";
import { todosByMonthState } from "../../atoms/todosByMonthState";
import { userState } from "../../atoms/userState";
import ApiScaffold from "../../shared/api";

const widthHomeEvent = (Home) => {
    return () => {
        const calendarDetail = useRecoilValue(calendarDetailState);
        const user = useRecoilValue(userState);
        const [todosByMonth, setTodosByMonth ] = useRecoilState(todosByMonthState);

        const [today, setToday] = useState(moment());
        const firstWeek = today.clone().startOf('month').week();
        const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();

        // eslint-disable-next-line react-hooks/exhaustive-deps
        useEffect(async () => {
            if(calendarDetail.id){
                const loadRes = await ApiScaffold({
                    method: "get",
                    url: `/todos?calendarId=${calendarDetail.id}&userId=${user.id}`
                });
                console.debug(loadRes);
                setTodosByMonth(loadRes.data);
            }
        }, [calendarDetail.id, setTodosByMonth, user.id]);
    
        const calendarArray = () =>{
            let result = [];
            let week = firstWeek;
            console.debug(week);
            console.debug(lastWeek);
            console.debug(today);
            for(week; week <= lastWeek; week++){
                result = result.concat(
                    <tr key={week}>
                        {
                            // eslint-disable-next-line no-loop-func
                            Array(7).fill(0).map((data, index) => {
                                let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day');
                                return(
                                    <td key={index} className={`
                                        table-fixed min-h-120
                                        ${ index % 7 === 0 || index % 6 === 0 ? 'bg-gray-100':'' }
                                        hover:shadow-inner
                                        `}
                                    >
                                        <Link 
                                            to={`/calendars/${calendarDetail.id}/days/${days.format('YYYY-MM-DD')}`} 
                                            className={`${days.format('MM') !== today.format('MM') && 'opacity-30'} flex flex-col justify-start items-end min-h-100 max-h-100 overflow-hidden`}
                                        >
                                            <span className={`mb-2 ${moment().format('YYYYMMDD') === days.format('YYYYMMDD') && 'bg-red-400  text-white rounded-2xl px-2'}`}>
                                                {days.format('D')}
                                            </span>
                                            <div className="flex flex-col items-start justify-center w-full">
                                                {
                                                    // eslint-disable-next-line array-callback-return
                                                    todosByMonth.map((item, index) => {
                                                        if(days.format('YYYY-MM-DD') === item.matchedDate) {
                                                            return(
                                                            <div className="relative w-auto overflow-hidden truncate overflow-ellipsis custom-shadow-blue whitespace-nowrap " key={item.id}>
                                                                <div className="absolute bottom-0 left-0 w-full h-2 bg-yellow-300 bg-opacity-70" ></div>
                                                                { item.title }
                                                            </div>
                                                            )
                                                        }
                                                        
                                                    })
                                                }
                                            </div>
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
export default widthHomeEvent;