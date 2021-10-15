import { useEffect } from "react";
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
        setTodoStore,
    } = useCreateTodoForm();

    useEffect(() => {
        // 현재 투두리스트를 작성하는 캘린더의 ID를 기본으로 가져오기
        if(todoStore.calendarId.length === 0){
            setTodoStore({...todoStore, calendarId:[].concat(calendar.id)});
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [todoStore]);

    return(
    !createTodoForm ?
    <div className={`${editTodoForm ? "hidden" : "flex"} items-center justify-start w-full p-4 mb-4 cursor-pointer hover:text-red-400`}
        onClick={storeTodoFormToggle}
    >
        <i className="mr-3 fas fa-plus"></i>
        <span className="text-xl">일정 추가</span>
    </div> :
    
    <div className={`${editTodoForm ? "hidden" : "flex"} flex-col items-center justify-center w-full mb-4`}>
        <div className="flex items-center justify-start w-full mb-2 text-sm font-noto-medium">
            캘린더 선택 📆
        </div>
        <div className="flex items-center justify-start w-full mb-2">
        {
            calendars.map((item) => {
                return(
                <label className="px-2 py-1 mr-2 rounded-sm bg-gray-50" key={item.id}>
                    <span className="mr-1">{item.name}</span>
                    <input type="checkbox"
                        defaultChecked={calendar.id === item.id ? true : false}
                        disabled={calendar.id === item.id ? true : false}
                        name="calendarIdList"
                        value={item.id}
                        onChange={changeStoreHandler}
                    />
                </label>
                )
            })
        }
        </div>
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