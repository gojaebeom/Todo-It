import {useState} from "react";
import {useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";
import {editTodoFormState} from "../../../atoms/ui/editTodoFormState";
import {todoStoreState} from "../../../atoms/todoStoreState";
import ApiScaffold from "../../../shared/api";
import {toastState} from "../../../atoms/ui/toastState";
import {userState} from "../../../atoms/userState";
import moment from "moment";
import {useHistory} from "react-router-dom";
import {calendarDetailState} from "../../../atoms/calendarDetailState";
import {todosState} from "../../../atoms/todosState";

const TodoCreateForm = () => {
    const history = useHistory();
    const calendar = useRecoilValue(calendarDetailState);
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
    const [ formIsOpen, setFormIsOpen ] = useState(false);
    const [editTodoForm, setEditTodoForm] = useRecoilState(editTodoFormState);
    const resetTodoStore =  useResetRecoilState(todoStoreState);
    const [todoStore, setTodoStore] = useRecoilState(todoStoreState);
    const user = useRecoilValue(userState);
    const [todos, setTodos] = useRecoilState(todosState);

    const loadTodos = async () => {
        const loadRes = await ApiScaffold({
            method: "get",
            url: `/todos?calendarId=${calendar.id}&matchedDate=${day}&userId=${user.id}`
        });

        if(loadRes){
            setTodos([...loadRes.data]);
        }
    }

    const storeTodoFormToggle = () => {
        resetTodoStore();
        setFormIsOpen(!formIsOpen);
    }
    const changeStoreHandler = ( e ) => {
        const name = e.target.name;
        const value = e.target.value;
        if(name === "title")
            setTodoStore({...todoStore, title: value});
        else if(name === "description")
            setTodoStore({...todoStore, description: value});
    }
    const clickTodoCreateHandler = async ( e ) => {
        if(!todoStore.title)
            return setToast({open:true, message:"제목은 필수입니다!", type:"WARNING",second:2000});

        setFormIsOpen(false);

        const formData = new FormData();
        formData.append("title", todoStore.title);
        formData.append("description", todoStore.description);
        formData.append("matchedDate", day);
        formData.append("userId", user.id);
        formData.append("calendarId", calendar.id);

        await ApiScaffold({
            method: "post",
            url: `/todos`,
            data: formData
        });

        resetTodoStore();

        await loadTodos();
    }

    return(
    !formIsOpen ?
    <div className={`${editTodoForm ? "hidden" : "flex"} items-center justify-start w-full p-4 mb-4 cursor-pointer hover:text-red-400`}
         onClick={storeTodoFormToggle}
    >
        <i className="mr-3 fas fa-plus"></i>
        <span className="text-xl">일정 추가</span>
    </div> :
    <div className={`${editTodoForm ? "hidden" : "flex"} flex-col items-center justify-center w-full mb-4`}>
        <div className="z-10 flex flex-col items-center justify-center w-full bg-white border rounded-md">
            <input
                className="w-full p-2 text-xl rounded-md outline-none"
                placeholder="일정"
                name="title"
                onChange={changeStoreHandler}
                value={todoStore.title}
                maxLength={30}
            />
            <textarea
                className="w-full p-2 border-t outline-none rounded-b-md"
                placeholder="상세내용"
                name="description"
                onChange={changeStoreHandler}
                value={todoStore.description}
            ></textarea>
        </div>

        <div className="flex items-center justify-start w-full mt-2">
            <button className="px-5 py-2 mr-3 text-white bg-red-400 rounded-md"
                    onClick={clickTodoCreateHandler}
            >
                일정 추가
            </button>
            <button className="px-5 py-2 border rounded-md"
                    onClick={storeTodoFormToggle}
            >
                취소
            </button>
        </div>
    </div>
    )
}
export default TodoCreateForm;