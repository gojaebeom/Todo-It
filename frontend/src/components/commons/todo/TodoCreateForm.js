import { useRecoilValue } from "recoil";
import {calendarsState} from "../../../atoms/calendarsState";
import { useCreateTodoForm} from "../../../atoms/ui/createTodoFormState";

const TodoCreateForm = () => {
    const calendars = useRecoilValue(calendarsState);
    const {
        calendar,
        createTodoForm,
        storeTodoFormToggle,
        changeStoreHandler,
        clickTodoCreateHandler,
        editTodoForm,
        todoStore,
    } = useCreateTodoForm();

    return(
    !createTodoForm ?
    <div className={`${editTodoForm ? "hidden" : "flex"} items-center justify-start w-full p-4 mb-4 cursor-pointer hover:text-red-400`}
         onClick={storeTodoFormToggle}
    >
        <i className="mr-3 fas fa-plus"></i>
        <span className="text-xl">일정 추가</span>
    </div> :
    <div className={`${editTodoForm ? "hidden" : "flex"} flex-col items-center justify-center w-full mb-4`}>
        <div className="z-10 flex flex-col items-center justify-center w-full bg-white border rounded-md">
            <div className={'w-full flex border-b p-2'}>
                {
                    calendars.map((item)=>{
                        return(
                            <label className="mr-4 flex justify-center items-center" key={item.id}>
                                <p className="mr-1">{item.name}</p>
                                <input
                                    type="checkbox"
                                    defaultChecked={item.id === calendar.id ? true : false}
                                />
                            </label>
                        )
                    })
                }
            </div>
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
                    onClick={clickTodoCreateHandler}>
                일정 추가
            </button>
            <button className="px-5 py-2 border rounded-md"
                    onClick={storeTodoFormToggle}>
                취소
            </button>
        </div>
    </div>
    )
}
export default TodoCreateForm;