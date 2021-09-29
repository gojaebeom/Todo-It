import DefaultLayout from "../../layouts/default/DefaultLayout";
import widthHomeEvent from "./withHomeEvent";

function Home({setToday, today, calendarArray}){
    return(
    <DefaultLayout>
        <div className="flex items-center justify-between w-full px-3 py-10">
            <div className="px-3 py-1 text-2xl font-noto-bold">
                개인 일정 ✍
            </div>

            <div className="flex justify-start">
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
    </DefaultLayout>
    )
}
export default widthHomeEvent(Home);