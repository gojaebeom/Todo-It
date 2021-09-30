import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function withDefaultEvent(DefaultLayout){
    return ({ children }) => {

        const userInfo = useSelector(s => s.userInfo);
        const dispatch = useDispatch();

        const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);

        // const [calendar, setCalendar] = useState({
        //     test:true,
        // });

        const [storeCalendar, setStoreCalendar] = useState({
            name: "",
            thumbnail: "",
            thumbnailFile: null,
        });

        const clickLogoutEvent = () => {
            // eslint-disable-next-line no-restricted-globals
            const result = confirm("로그아웃 하시겠습니까?");
            if(!result) return;
            
            window.localStorage.removeItem("act");
            dispatch({type:"IS_LOGOUT"});
        }

        const clickCalendarModalToggleEvent = ( e ) => {
            setStoreCalendar({
                ...storeCalendar,
                name: "",
                thumbnail: "",
                thumbnailFile: null,
            });
            setIsCalendarModalOpen(!isCalendarModalOpen);
        }

        const changeImageEvent = ( e ) => {
            if(e.target.files.length === 0){
                e.target.value = "";
                return false;
            }
            const file = e.target.files[0];
            const fileName = file.name;
    
            if(/(\.gif|\.jpg|\.jpeg|\.png)$/i.test(fileName) === false){
                e.target.value = "";
                return alert("이미지 파일을 선택해주세요");
            }
            
            // FileReader 인스턴스 생성
            const reader = new FileReader()
            // 이미지가 로드가 된 경우
            reader.onload = e => {
                setStoreCalendar({...storeCalendar, thumbnail: e.target.result, thumbnailFile: file });
            }
            // reader가 이미지 읽도록 하기
            reader.readAsDataURL(e.target.files[0]);
        }

        const changeInputEvent = ( e ) => {
            setStoreCalendar({...storeCalendar, name: e.target.value});
        }

        const submitCalendarEvent = () => {
            console.log(storeCalendar);
        }

        return (
        <DefaultLayout
            children={children}
            userInfo={userInfo}
            clickLogoutEvent={clickLogoutEvent}
            isCalendarModalOpen={isCalendarModalOpen}
            clickCalendarModalToggleEvent={clickCalendarModalToggleEvent}
            changeImageEvent={changeImageEvent}
            storeCalendar={storeCalendar}
            changeInputEvent={changeInputEvent}
            submitCalendarEvent={submitCalendarEvent}
        />
        );
    }
}
export default withDefaultEvent;