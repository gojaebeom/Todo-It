import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {editTodoFormState} from "../../../atoms/ui/editTodoFormState";
import {todoEditState} from "../../../atoms/todoEditState";
import ApiScaffold from "../../../shared/api";
import {toastState} from "../../../atoms/ui/toastState";
import {useHistory} from "react-router-dom";
import {calendarDetailState} from "../../../atoms/calendarDetailState";
import moment from "moment";
import {todosState} from "../../../atoms/todosState";
import {userState} from "../../../atoms/userState";

const TodoEditForm = () => {
    const user = useRecoilValue(userState);
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
    const [editTodoForm, setEditTodoForm] = useRecoilState(editTodoFormState);
    const [todoEdit, setTodoEdit] = useRecoilState(todoEditState);
    const setToast = useSetRecoilState(toastState);
    const [todos, setTodos] = useRecoilState(todosState);
    const closeTodoEditForm = () => setEditTodoForm(false);

    const changeTodoEditInputs =( e ) => {
        const name = e.target.name;
        const value = e.target.value;
        if(name === "title")
            setTodoEdit({...todoEdit, title: value});
        else if(name === "description")
            setTodoEdit({...todoEdit, description: value});
    }

    const loadTodos = async () => {
        const loadRes = await ApiScaffold({
            method: "get",
            url: `/todos?calendarId=${calendar.id}&matchedDate=${day}&userId=${user.id}`
        });

        if(loadRes){
            setTodos([...loadRes.data]);
        }
    }

    const sumitTodoEdit = async () => {
        if(!todoEdit.title)
            return setToast({open:true, message:"제목은 필수입니다!", type:"WARNING",second:2000});

        const formData = new FormData();
        formData.append("id", todoEdit.id);
        formData.append("title", todoEdit.title);
        formData.append("description", todoEdit.description);
        await ApiScaffold({
            method: "put",
            url: `/todos/${todoEdit.id}`,
            data: formData
        });
        await loadTodos();
        closeTodoEditForm();
    }

    return(
    editTodoForm &&
    <div className="flex flex-col items-center justify-center w-full mb-4">
        <div className="z-10 flex flex-col items-center justify-center w-full bg-white border rounded-md">
            <input
                className="w-full p-2 text-xl rounded-md outline-none"
                placeholder="일정"
                name="title"
                onChange={changeTodoEditInputs}
                value={todoEdit.title}
                maxLength={30}
            />
            <textarea
                className="w-full p-2 border-t outline-none rounded-b-md"
                placeholder="상세내용"
                name="description"
                onChange={changeTodoEditInputs}
                value={todoEdit.description}
            ></textarea>
        </div>

        <div className="flex items-center justify-start w-full mt-2">
            <button className="px-5 py-2 mr-3 text-white bg-red-400 rounded-md"
                    onClick={sumitTodoEdit}
            >
                일정 수정
            </button>
            <button className="px-5 py-2 border rounded-md"
                    onClick={closeTodoEditForm}
            >
                취소
            </button>
        </div>
    </div>
    )
}
export default TodoEditForm;