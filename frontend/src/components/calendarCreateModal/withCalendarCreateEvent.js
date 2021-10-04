import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { calendarsState } from "../../atoms/calendarsState";
import { calendarStoreInitState, calendarStoreState } from "../../atoms/calendarStoreState";
import { tokenState } from "../../atoms/tokenState";
import { creationCalendarModalState } from "../../atoms/ui/creationCalendarModalState";
import { userState } from "../../atoms/userState";
import ApiScaffold from "../../shared/api";
import sleep from "../../shared/sleep";

function withCalendarCreateEnvet( Compoent ) {
    return () => {
        const user = useRecoilValue(userState);
        const token = useRecoilValue(tokenState);
        const [storeCalendar, setStoreCalendar] = useRecoilState(calendarStoreState);
        const [creationCalendarModalOpen, setCreationCalendarModalOpen] = useRecoilState(creationCalendarModalState);
        const setCalendars = useSetRecoilState(calendarsState);

        const clickCreationCalendarModalCloseEvent = ( e ) => {
            setStoreCalendar(calendarStoreInitState);
            setCreationCalendarModalOpen({open:false, submit:false});
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
            console.log(storeCalendar);
            const name = e.target.name;
            const value = e.target.value;

            if(name === "isPrivate"){
                setStoreCalendar({...storeCalendar, isPrivate: storeCalendar.isPrivate === 0 ? 1 : 0});
            }else{
                setStoreCalendar({...storeCalendar, name: value });
            }
        }

        const submitCalendarEvent = async () => {
            console.log("캘린더 이벤트 실행");
            setCreationCalendarModalOpen({...creationCalendarModalOpen, submit:true});
            
            const formData = new FormData();
            formData.append("userId", user.id);
            if(storeCalendar.name) formData.append("name", storeCalendar.name);
            if(storeCalendar.thumbnail) formData.append("thumbnail", storeCalendar.thumbnailFile);
            formData.append("isPrivate", storeCalendar.isPrivate);
            console.log(storeCalendar);
            
            const res = await ApiScaffold({
                            method: "post",
                            url: `/calendars`,
                            token: token.token,
                            data: formData
                        }, ( err ) => {
                            console.log(err.data);
                            alert(err.data.message);
                            setCreationCalendarModalOpen({...creationCalendarModalOpen, submit:false});
                            throw new Error(err.data);
                        });
            console.log(res);
            sleep(500);
            setCalendars([...res.data]);
            setCreationCalendarModalOpen({...creationCalendarModalOpen, open:false, submit:false});
        }

        return(
        <Compoent
            changeImageEvent={changeImageEvent}
            storeCalendar={storeCalendar}
            changeInputEvent={changeInputEvent}
            submitCalendarEvent={submitCalendarEvent}
            clickCreationCalendarModalCloseEvent={clickCreationCalendarModalCloseEvent}
            creationCalendarModalOpen={creationCalendarModalOpen}
        />
        )
    }
}
export default withCalendarCreateEnvet;