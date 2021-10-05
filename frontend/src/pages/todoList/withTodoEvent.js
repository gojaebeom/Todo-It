import moment from "moment";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { calendarDetailState } from "../../atoms/calendarDetailState";
import { todosState } from "../../atoms/todosState";
import { todoStoreState } from "../../atoms/todoStoreState";
import { tokenState } from "../../atoms/tokenState";
import { userState } from "../../atoms/userState";
import ApiScaffold from "../../shared/api";

function withTodoEvent(TodoList){
    return ({ history }) => {

        const token = useRecoilValue(tokenState);
        const calendar = useRecoilValue(calendarDetailState);
        const user = useRecoilValue(userState);
        const [todoStore, setTodoStore] = useRecoilState(todoStoreState);
        const [todos, setTodos] = useRecoilState(todosState);

        const makeDayStrings = () => {
            let day = history.location.pathname.split("days/")[1];
            let filterDay = "";
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

        const loadTodos = async () => {
            
            const loadRes = await ApiScaffold({
                method: "get",
                url: `/todos?calendarId=${calendar.id}&matchedDate=${day}&userId=${user.id}`,
                token: token.token
            }, ( err ) => {
                console.error(err);
                if(err.data.response === 500 || err.data.response === 400){
                    alert("서버요청이 정상적으로 처리되지 않았습니다.");
                    throw new Error(err.data.message);
                }
            });
            // if(res.data)
            setTodos([...loadRes.data]);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
        useEffect(async () => {
            await loadTodos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        const [ formIsOpen, setFormIsOpen ] = useState(false);

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

            const createRes = await ApiScaffold({
                method: "post",
                url: `/todos`,
                token: token.token,
                data: formData
            }, ( err ) => {
                console.error(err);
                if(err.data.response === 500 || err.data.response === 400){
                    alert("서버요청이 정상적으로 처리되지 않았습니다.");
                    throw new Error(err.data.message);
                }
            });
            console.log(createRes);
            await loadTodos();
        }

        const changeStoreHandler = ( e ) => {
            const name = e.target.name;
            const value = e.target.value;
            if(name === "title")
                setTodoStore({...todoStore, title: value});
            else if(name === "description")
                setTodoStore({...todoStore, description: value});
        }

        return (
        <TodoList
            filterDay={filterDay}
            toBack={toBack}
            todos={todos}
            todoStore={todoStore}
            changeStoreHandler={changeStoreHandler}
            clickTodoCreateHandler={clickTodoCreateHandler}
            formIsOpen={formIsOpen}
            setFormIsOpen={setFormIsOpen}
        />
        )
    }
}
export default withTodoEvent;