import moment from "moment";
import { useState } from "react";

function withTodoEvent(TodoList){
    return ({ history }) => {

        const makeDayStrings = () => {
            let day = history.location.pathname.split("days/")[1];
            const today = moment().format('YYYY-MM-DD');
            const yesterday = moment().subtract(1, "day").format('YYYY-MM-DD');
            const tomorrow = moment().add(1, "day").format('YYYY-MM-DD');
            switch(day){
                case yesterday:
                    day = "어제";
                    break;
                case today:
                    day = "오늘";
                    break;
                case tomorrow:
                    day = "내일";
                    break;
                default:
            }
            return day;
        }
        const day = makeDayStrings();

        const [ items, setItems ] = useState([]);

        const [ store, setStore ] = useState({
            title:"",
            description:"",
        });
        const [ formIsOpen, setFormIsOpen ] = useState(false);

        const toBack = () => {
            history.goBack();
        }

        const clickTodoCreateHandler = ( e ) => {
            setItems(items.concat({
                title: store.title,
                description: store.description
            }));
            setStore({...store, title:"", description:""});
            setFormIsOpen(false);
        }

        const changeStoreHandler = ( e ) => {
            const name = e.target.name;
            const value = e.target.value;
            if(name === "title")
                setStore({...store, title: value});
            else if(name === "description")
                setStore({...store, description: value});
        }

        return (
        <TodoList
            day={day}
            toBack={toBack}
            items={items}
            store={store}
            changeStoreHandler={changeStoreHandler}
            clickTodoCreateHandler={clickTodoCreateHandler}
            formIsOpen={formIsOpen}
            setFormIsOpen={setFormIsOpen}
        />
        )
    }
}
export default withTodoEvent;