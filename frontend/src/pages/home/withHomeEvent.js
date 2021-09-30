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
                                        
                                        hover:bg-red-100
                                        `}
                                    >
                                        <Link 
                                            to={`/days/${days.format('YYYY-MM-DD')}`} 
                                            className={`${days.format('MM') !== today.format('MM') && 'opacity-30'} flex flex-col items-end min-h-50 md:min-h-100`}
                                        >
                                            <span className={`mb-2 ${moment().format('YYYYMMDD') === days.format('YYYYMMDD') && 'bg-red-400 text-white rounded-2xl px-2'}`}>
                                                {days.format('D')}
                                            </span>
                                            {/* <div className="flex justify-center w-full mb-1 bg-green-200 rounded-md">달력만들기</div>
                                            <div className="flex justify-center w-full mb-1 bg-blue-200 rounded-md">달력만들기</div>
                                            <div className="flex justify-center w-full mb-1 bg-yellow-200 rounded-md">달력만들기</div>
                                            <div className="flex justify-center w-full mb-1 bg-gray-200 rounded-md">달력만들기</div> */}
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