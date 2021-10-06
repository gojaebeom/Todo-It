import moment from "moment";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { calendarDetailState } from "../../atoms/calendarDetailState";
import { todoEditState } from "../../atoms/todoEditState";
import { todosState } from "../../atoms/todosState";
import { todoStoreState } from "../../atoms/todoStoreState";
import { editTodoFormState } from "../../atoms/ui/editTodoFormState";
import { userState } from "../../atoms/userState";
import ApiScaffold from "../../shared/api";

const withTodoEvent = (TodoList) => {
    return () => {
        const calendar = useRecoilValue(calendarDetailState);
        const user = useRecoilValue(userState);
        const [todoStore, setTodoStore] = useRecoilState(todoStoreState);
        const resetTodoStore =  useResetRecoilState(todoStoreState);
        const [todos, setTodos] = useRecoilState(todosState);
        const [todoEdit, setTodoEdit] = useRecoilState(todoEditState);
        const [editTodoForm, setEditTodoForm] = useRecoilState(editTodoFormState);
        const history = useHistory();
        const [ formIsOpen, setFormIsOpen ] = useState(false);

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

        console.debug(filterDay);

        const loadTodos = async () => {
            const loadRes = await ApiScaffold({
                method: "get",
                url: `/todos?calendarId=${calendar.id}&matchedDate=${day}&userId=${user.id}`
            });
            console.debug(loadRes);

            if(loadRes){
                setTodos([...loadRes.data]);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
        useEffect(async () => {
            if(calendar.id){
                console.debug("Todo by day api");
                await loadTodos();
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [calendar]);

        

        const toBack = () => {
            history.goBack();
        }

        const clickTodoCreateHandler = async ( e ) => {
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

        const storeTodoFormToggle = () => {
            resetTodoStore();
            setFormIsOpen(!formIsOpen);
        }


        const editFormOpenEvent = (todo) => {
            setTodoEdit({...todoEdit, id:todo.id, title:todo.title, description:todo.description, isFinished:todo.isFinished});
            setEditTodoForm(true);
        }

        const changeStoreHandler = ( e ) => {
            const name = e.target.name;
            const value = e.target.value;
            if(name === "title")
                setTodoStore({...todoStore, title: value});
            else if(name === "description")
                setTodoStore({...todoStore, description: value});
        }

    
        const changeTodoEditInputs =( e ) => {
            const name = e.target.name;
            const value = e.target.value;
            if(name === "title")
                setTodoEdit({...todoEdit, title: value});
            else if(name === "description")
                setTodoEdit({...todoEdit, description: value});
        }

        const changeTodoEditIsFinished = async ( item ) => {
            console.debug(item);
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

        const closeTodoEditForm = () => setEditTodoForm(false);

        const sumitTodoEdit = async () => {
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


        return (
        <TodoList
            user={user}
            filterDay={filterDay}
            toBack={toBack}
            todos={todos}
            
            todoStore={todoStore}
            changeStoreHandler={changeStoreHandler}
            clickTodoCreateHandler={clickTodoCreateHandler}
            formIsOpen={formIsOpen}
            storeTodoFormToggle={storeTodoFormToggle}
            
            todoEdit={todoEdit}
            editFormOpenEvent={editFormOpenEvent}
            editTodoForm={editTodoForm}
            changeTodoEditInputs={changeTodoEditInputs}
            closeTodoEditForm={closeTodoEditForm}
            changeTodoEditIsFinished={changeTodoEditIsFinished}
            sumitTodoEdit={sumitTodoEdit}

            
            deleteTodoEvent={deleteTodoEvent}
        />
        )
    }
}
export default withTodoEvent;