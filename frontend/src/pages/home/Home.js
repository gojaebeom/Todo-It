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
                
        <div className="flex items-center w-full px-5 py-4 mb-2 text-blue-500 border border-blue-500 rounded-md jusitfy-between">
            <div className="flex items-center w-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="w-6 h-6 mr-2 " viewBox="0 0 1792 1792">
                    <path d="M1024 1375v-190q0-14-9.5-23.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 23.5v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11h-220q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17h-1536q-34 0-63.5-17t-46.5-46q-37-63-2-126l768-1408q17-31 47-49t65-18 65 18 47 49z">
                    </path>
                </svg>
                아직 베타버전으로 잔버그가 나올 수 있는 점 양해바랍니다. 😰 앞으로 추가적인 기능, UI 개선 등 꾸준한 업데이트가 있을 예정입니다.
            </div>
        </div>

    </DefaultLayout>
    )
}
export default homeEvent(Home);