import moment from "moment";
import { useState } from "react";
import { Link } from "react-router-dom";

function widthHomeEvent(Home){
    return () => {
        const [today, setToday] = useState(moment());
        const firstWeek = today.clone().startOf('month').week();
        const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();
    
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
                                        ${index % 7 === 0 || index % 6 === 0 ? 'bg-gray-100' :''}
                                        ${moment().format('YYYYMMDD') === days.format('YYYYMMDD') && 'bg-red-200'}
                                        `}
                                    >
                                        <Link to={`/days/${days.format('YYYYMMDD')}`} className={`${days.format('MM') !== today.format('MM') && 'opacity-30'} flex flex-col items-end`}>
                                            {days.format('D')}일
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