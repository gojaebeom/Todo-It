import DefaultLayout from "../layouts/default/DefaultLayout";
import { useSetRecoilState } from "recoil";
import { toastState } from "../../atoms/ui/toastState";
import TodoCreateForm from "../commons/todo/TodoCreateForm";
import TodoEditForm from "../commons/todo/TodoEditForm";
import TodoGroup from "../commons/todo/TodoGroup";
import TodoIsNull from "../commons/todo/TodoIsNull";
import moment from "moment";
import {useHistory} from "react-router-dom";

const TodoList =() => {
    const history = useHistory();
    const makeDayStrings = () => {
        let day = history.location.pathname.split("days/")[1];
        let filterDay = day;
        const today = moment().format('YYYY-MM-DD');
        const yesterday = moment().subtract(1, "day").format('YYYY-MM-DD');
        const tomorrow = moment().add(1, "day").format('YYYY-MM-DD');
        switch(filterDay){
            case yesterday:
                filterDay = "어제";
                break;
            case today:
                filterDay = "오늘";
                break;
            case tomorrow:
                filterDay = "내일";
                break;
            default:
        }
        return {day, filterDay};
    }
    const {day, filterDay} = makeDayStrings();

    const setToast = useSetRecoilState(toastState);

    return(
    <DefaultLayout>
        <div className="relative flex flex-col items-center w-full">
            <div className="flex items-center justify-between w-full mb-2 md:p-0">
                <div className="flex items-center text-xl font-noto-medium group">
                    <button className="p-4 py-1 mr-2 rounded-xl group-hover:bg-red-300"
                        onClick={() => history.goBack()}
                    >
                        <i className="text-xl text-red-400 fas fa-chevron-left group-hover:text-white"></i>
                    </button>
                    <span>{filterDay}</span>
                </div>
                <div>필터</div>
            </div>

            <TodoEditForm/>
            <TodoCreateForm/>
            <TodoGroup/>
            <TodoIsNull/>
        </div>
    </DefaultLayout>  
    )
}
export default TodoList;