import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {userState} from "../../../atoms/userState";
import {toastState} from "../../../atoms/ui/toastState";
import ApiScaffold from "../../../shared/api";
import {useHistory} from "react-router-dom";
import {calendarDetailState} from "../../../atoms/calendarDetailState";
import moment from "moment";
import {todosState} from "../../../atoms/todosState";
import {todoDetailState} from "../../../atoms/todoDetailState";
import {todoEditState} from "../../../atoms/todoEditState";
import {editTodoFormState} from "../../../atoms/ui/editTodoFormState";

const TodoGroupItem = ({ item, writer }) => {
    const [todos, setTodos] = useRecoilState(todosState);
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
    const user = useRecoilValue(userState);
    const setToast = useSetRecoilState(toastState);
    const [todoDetail, setTodoDetail] = useRecoilState(todoDetailState);
    const [todoEdit, setTodoEdit] = useRecoilState(todoEditState);
    const [editTodoForm, setEditTodoForm] = useRecoilState(editTodoFormState);
    const deleteTodoEvent = async ( id ) => {
        // eslint-disable-next-line no-restricted-globals
        const result = confirm("일정을 삭제하시겠습니까?");
        if(result){
            await ApiScaffold({
                method: "delete",
                url: `/todos/${id}`
            });
            await loadTodos();
        }
    }

    const todoDetailToggle = ( todo ) => {
        if(!todoDetail.id){
            setTodoDetail({...todoDetail, id: todo.id, description: todo.description});
        }else{
            setTodoDetail({...todoDetail, id: "", description: ""});
        }
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
    const changeTodoEditIsFinished = async ( item ) => {
        const formData = new FormData();
        formData.append("id", item.id);
        formData.append("isFinished", !item.isFinished ? 1 : 0 );
        await ApiScaffold({
            method: "put",
            url: `/todos/${item.id}`,
            data: formData
        });
        await loadTodos();
    }
    const editFormOpenEvent = (todo) => {
        setTodoEdit({...todoEdit, id:todo.id, title:todo.title, description:todo.description, isFinished:todo.isFinished});
        setEditTodoForm(true);
    }


    return(
    <div key={item.id} className="flex flex-col items-center justify-center w-full p-2 rounded-md cursor-pointer hover:bg-red-100 hover:text-black"
         style={{borderRadius:"3px"}}
    >
        <div className="flex items-center justify-between w-full">
            <div className="flex justify-start itmes-center">
                <label className="flex items-center mr-2 cursor-pointer">
                    <label className={`w-5 h-5 flex justify-center items-center border border-gray-200 rounded-full outline-none cursor-pointer mt-1 mr-2
                                                ${item.isFinished ? 'bg-red-300':'bg-white'}`}>
                        { item.isFinished ?<i className="pt-1 text-xs text-white fas fa-check"></i>:"" }
                        <input
                            type="checkbox"
                            name="isFinished"
                            defaultChecked={item.isFinished ? true : false}
                            onChange={() => {
                                if(user.id !== writer.id){
                                    setToast({open:true, message:"다른 맴버의 글을 토글할 수 없어요!", type:"WARNING",second:2000});
                                    return false;
                                }
                                changeTodoEditIsFinished(item)
                            }}
                            className="w-0 h-0"
                        />
                    </label>
                    <p>{item.title}</p>
                </label>
                <button
                    onClick={() => todoDetailToggle(item)}
                    className="mt-1 text-xs hover:text-indigo-400"
                >{(todoDetail.id && todoDetail.id === item.id ) ? '..접기' : '..자세히'}</button>
            </div>
            {
                writer.id === user.id &&
                <div className="flex justify-start itmes-center">
                    {/* <i className="mr-4 far fa-caret-square-up"></i>
                     <i className="mr-4 far fa-caret-square-down"></i> */}
                    <i className="mr-4 far fa-edit" onClick={() => editFormOpenEvent(item)}></i>
                    <i className="mr-4 far fa-trash-alt" onClick={() => deleteTodoEvent(item.id)}></i>
                </div>
            }
        </div>
        {
            (todoDetail.id && todoDetail.id === item.id ) &&
            <div className={`flex items-center justify-start w-full mt-2`}>
                <pre className="pl-6 font-noto-light">{item.description}</pre>
            </div>
        }
    </div>
    )
}
export default TodoGroupItem;