import alertImg from "../../../assets/images/fanfare.png";
import {useHistory} from "react-router-dom";
import {useRef} from "react";

const Alert = () =>{
    const confirm = () => {
        window.localStorage.setItem("todoit-alert","ok");
        window.location.href = "/";
    }

    return(
    <div className="w-72 bg-white rounded-lg shadow-md p-6 font-noto-light">
        <div className="w-16 mx-auto relative -mt-10 mb-3">
            <img className="-mt-10 ml-2" src={alertImg} alt="cookie" style={{width:"200px"}}/>
        </div>
        <span className="w-full block leading-normal text-gray-800 text-md mb-3 mt-2">
            이제 캘린더의 특별한 날짜를 꾸밀 수 있어요! &nbsp;&nbsp;
            캘린더의 셀 하나를 골라 우클릭해보세요.
        </span>
        <div className="flex items-center justify-between">
            <button className="text-sm text-gray-400 mr-1 hover:text-gray-800">

            </button>
            <div className="w-1/2">
                <button type="button"
                        onClick={confirm}
                        className="py-2 px-1  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                    알겠어요.
                </button>
            </div>
        </div>
    </div>
    )
}
export default Alert;