import DefaultLayout from "../../layouts/default/DefaultLayout";
import homeEvent from "./homeEvent";

const Home = ({setToday, today, calendarArray}) => {
    return(
    <DefaultLayout>
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
    </DefaultLayout>
    )
}
export default homeEvent(Home);