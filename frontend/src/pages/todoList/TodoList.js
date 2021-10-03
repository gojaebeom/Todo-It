import DefaultLayout from "../../layouts/default/DefaultLayout";
import emptyImg from "../../assets/images/null.png";
import withTodoEvent from "./withTodoEvent";
import { withRouter } from "react-router";

function TodoList({
    items, 
    day, 
    toBack, 
    formIsOpen, 
    setFormIsOpen, 
    clickTodoCreateHandler, 
    changeStoreHandler,
    store
}){
    return(
    <DefaultLayout>
        <div className="relative flex flex-col items-center w-full">
            <div className="flex items-center justify-between w-full md:p-0">
                <div className="flex items-center text-2xl font-noto-bold group">
                    <button className="p-4 py-1 mr-2 rounded-xl group-hover:bg-red-300"
                        onClick={toBack}
                    >
                        <i className="text-3xl text-red-400 fas fa-chevron-left group-hover:text-white"></i>
                    </button>
                    <span>{day}</span>
                </div>
                <div>필터</div>
            </div>

            {
                items.length !== 0 &&
                items.map((item, index) => {
                    return (
                    <div className="w-full p-3 border-b" key={index}>
                        {item.title}
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
                            value={store.title}
                        />
                        <textarea 
                            className="w-full outline-none" 
                            placeholder="내용" 
                            name="description"
                            onChange={changeStoreHandler}
                            value={store.description}
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
                items.length === 0 &&
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