import {atom, useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";
import ApiScaffold from "../../shared/api";
import {toastState} from "./toastState";
import {useHistory} from "react-router-dom";
import {calendarDetailState} from "../calendarDetailState";
import dateFormat from "../../shared/dateFormat";
import {editTodoFormState} from "./editTodoFormState";
import {todoStoreState} from "../todoStoreState";
import {userState} from "../userState";
import {useTodos} from "../todosState";

export const createTodoFormState = atom({
    key: 'createTodoFormState', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
});

export const useCreateTodoForm = () => {
    const setToast = useSetRecoilState(toastState);
    const history = useHistory();
    const calendar = useRecoilValue(calendarDetailState);
    const [ createTodoForm, setCreateTodoForm ] = useRecoilState(createTodoFormState);
    const [editTodoForm, setEditTodoForm] = useRecoilState(editTodoFormState);
    const resetTodoStore =  useResetRecoilState(todoStoreState);
    const [todoStore, setTodoStore] = useRecoilState(todoStoreState);
    const user = useRecoilValue(userState);
    const { day } = dateFormat(history);

    const { refreshTodos } = useTodos();

    const storeTodoFormToggle = () => {
        resetTodoStore();
        setCreateTodoForm(!createTodoForm);
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

        setEditTodoForm(false);
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
        await refreshTodos();
    }

    return{
        calendar,
        createTodoForm,
        clickTodoCreateHandler,
        changeStoreHandler,
        storeTodoFormToggle,
        todoStore,
        editTodoForm
    }
}
