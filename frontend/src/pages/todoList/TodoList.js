import DefaultLayout from "../../layouts/default/DefaultLayout";
import emptyImg from "../../assets/images/null.png";
import withTodoEvent from "./withTodoEvent";
import { withRouter } from "react-router";

function TodoList({
    todos, 
    filterDay, 
    toBack, 
    formIsOpen, 
    setFormIsOpen, 
    clickTodoCreateHandler, 
    changeStoreHandler,
    todoStore
}){
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
                todos.length !== 0 &&
                todos.map((item, index) => {
                    return (
                    <div className="flex flex-col items-start justify-center w-full p-3 mb-4 rounded-md bg-gray-50" key={index}>
                        <div className="flex items-center justify-start w-full mb-3">
                            {
                                item.profilePreviewImg ? 
                                <img src={`${process.env.REACT_APP_API_URL}/images${item.profilePreviewImg}`} alt="img" className="w-8 h-8 mr-2 rounded-full"/> :
                                <div className="flex items-center justify-center w-8 h-8 mr-2 border border-gray-500 rounded-full">
                                    <i className="far fa-user"></i>
                                </div>
                            }
                            <p className="text-md text-real-black">{item.nickname}</p>
                        </div>
                        <div className="relative flex flex-col items-start justify-center w-full pl-2 ml-4 border-l">
                            {/* <div className="absolute top-0 w-2 h-2 bg-gray-200 border rounded-full border-gray-50 -left-1"></div> */}
                            {
                                item.todos &&
                                item.todos.map((item)=>{
                                    return(
                                    <div className="flex items-center justify-between w-full p-2 rounded-md cursor-pointer hover:bg-gray-600 hover:text-white hover:shadow-md"
                                        style={{borderRadius:"3px"}}
                                    >
                                        <div className="flex justify-start itmes-center ">
                                            <label className="flex items-center mr-2 space-x-3">
                                                <input type="checkbox" name="checked-demo" className="w-6 h-6 bg-white border border-gray-300 rounded-md appearance-none form-tick bg-check checked:bg-blue-500 checked:border-transparent focus:outline-none"/>
                                            </label>
                                            <p>{item.title}</p>
                                        </div>
                                        <div className="flex justify-start itmes-center">
                                            <i className="mr-4 far fa-caret-square-up"></i>
                                            <i className="mr-4 far fa-caret-square-down"></i>
                                            <i className="mr-4 far fa-edit"></i>
                                            <i className="mr-4 far fa-trash-alt"></i>
                                        </div>
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
                !formIsOpen ?
                <div className="flex items-center justify-start w-full p-4 cursor-pointer hover:text-red-400"
                    onClick={() => setFormIsOpen(!formIsOpen)}
                >
                    <i className="mr-3 fas fa-plus"></i>
                    <span className="text-xl">일정 추가</span>
                </div> :
                <div className="flex flex-col items-center justify-center w-full">
                    <div className="z-10 flex flex-col items-center justify-center w-full p-3 bg-white border rounded-sm">
                        <input 
                            className="w-full mb-1 text-xl outline-none" 
                            placeholder="제목" 
                            name="title"
                            onChange={changeStoreHandler}
                            value={todoStore.title}
                        />
                        <textarea 
                            className="w-full outline-none" 
                            placeholder="내용" 
                            name="description"
                            onChange={changeStoreHandler}
                            value={todoStore.description}
                        ></textarea>
                    </div>

                    <div className="flex items-center justify-start w-full mt-2">
                        <button className="px-5 py-2 mr-3 text-white bg-red-400 rounded-sm"
                            onClick={clickTodoCreateHandler}
                        >
                            일정 추가
                        </button>
                        <button className="px-5 py-2 border rounded-sm"
                            onClick={() => setFormIsOpen(!formIsOpen)}
                        >
                            취소
                        </button>
                    </div>
                </div>
            }

            {
                todos.length === 0 &&
                <div className="fixed flex flex-col items-center justify-center h-full">
                    <img src={emptyImg} alt="img" className="mb-2"/>
                    <p className="text-lg">일정이 없습니다.</p>
                    <p className="text-sm font-noto-thin">새로운 일정을 추가해보세요!</p>
                    <button className="px-4 py-1 mt-5 text-lg text-white bg-red-300 rounded-sm"
                        onClick={() => setFormIsOpen(!formIsOpen)}
                    >
                        일정 추가
                    </button>
                </div> 
            }
        </div>
    </DefaultLayout>  
    )
}
export default withRouter(withTodoEvent(TodoList));