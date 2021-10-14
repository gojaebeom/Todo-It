import DefaultLayout from "../layouts/default/DefaultLayout";
import emptyImg from "../../assets/images/null.png";
import todoEvent from "./todoListEvent";
import { useSetRecoilState } from "recoil";
import { toastState } from "../../atoms/ui/toastState";

const TodoList =({
    user,
    todos, 
    todoDetail,
    todoDetailToggle,
    filterDay, 
    toBack, 
    
    todoStore,
    formIsOpen,
    storeTodoFormToggle, 
    clickTodoCreateHandler, 
    changeStoreHandler,
    
    todoEdit,
    editFormOpenEvent,
    editTodoForm,
    sumitTodoEdit,
    closeTodoEditForm,
    changeTodoEditInputs,
    changeTodoEditIsFinished,

    deleteTodoEvent,
}) => {

    const setToast = useSetRecoilState(toastState);

    return(
    <DefaultLayout>
        <div className="relative flex flex-col items-center w-full">
            <div className="flex items-center justify-between w-full mb-2 md:p-0">
                <div className="flex items-center text-xl font-noto-medium group">
                    <button className="p-4 py-1 mr-2 rounded-xl group-hover:bg-red-300"
                        onClick={toBack}
                    >
                        <i className="text-xl text-red-400 fas fa-chevron-left group-hover:text-white"></i>
                    </button>
                    <span>{filterDay}</span>
                </div>
                <div>필터</div>
            </div>
            {
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
            }

            {
                // 일정 추가
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
            }

            {
                todos.length !== 0 &&
                todos.map((writer, index) => {
                    return (
                    <div className="flex flex-col items-start justify-center w-full p-3 mb-4 rounded-md bg-gray-50" key={index}>
                        <div className="flex items-center justify-start w-full mb-3">
                            {
                                writer.profilePreviewImg ? 
                                <img src={`${process.env.REACT_APP_API_URL}/images${writer.profilePreviewImg}`} alt="img" className="w-8 h-8 mr-2 border border-gray-300 rounded-full"/> :
                                <div className="flex items-center justify-center w-8 h-8 mr-2 border border-gray-500 rounded-full">
                                    <i className="far fa-user"></i>
                                </div>
                            }
                            <p className="text-md text-real-black">{writer.nickname}</p>
                        </div>
                        <div className="relative flex flex-col items-start justify-center w-full pl-2 ml-4 border-l">
                            {/* <div className="absolute top-0 w-2 h-2 bg-gray-200 border rounded-full border-gray-50 -left-1"></div> */}
                            {
                                writer.todos &&
                                writer.todos.map((item)=>{
                                    return(
                                    <div key={item.id} className="flex flex-col items-center justify-center w-full p-2 rounded-md cursor-pointer hover:bg-red-100 hover:text-black"
                                        style={{borderRadius:"3px"}}
                                    >
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex justify-start itmes-center">
                                                <label className="flex items-center mr-2 cursor-pointer">
                                                    <label className={`w-5 h-5 flex justify-center items-center border border-gray-200 rounded-full outline-none cursor-pointer mt-1 mr-2
                                                        ${item.isFinished ? 'bg-red-300':'bg-white'}`}>
                                                            {
                                                                item.isFinished ?<i className="pt-1 text-xs text-white fas fa-check"></i>:""
                                                            }
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
                                })
                            }
                        </div>
                    </div>
                    )
                })
            }

            {
                todos.length === 0 &&
                <div className="fixed flex flex-col items-center justify-center h-full">
                    <img src={emptyImg} alt="img" className="mb-2"/>
                    <p className="text-lg">일정이 없습니다.</p>
                    <p className="text-sm font-noto-thin">새로운 일정을 추가해보세요!</p>
                    <button className="px-4 py-1 mt-5 text-lg text-white bg-red-300 rounded-sm"
                        onClick={storeTodoFormToggle}
                    >
                        일정 추가
                    </button>
                </div> 
            }
        </div>
    </DefaultLayout>  
    )
}
export default todoEvent(TodoList);