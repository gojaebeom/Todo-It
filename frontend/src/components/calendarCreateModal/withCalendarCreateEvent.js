import { useRecoilState } from "recoil";
import { calendarStoreState } from "../../atoms/calendarStoreState";
import { creationCalendarModalState } from "../../atoms/ui/creationCalendarModalState";

function withCalendarCreateEnvet( Compoent ) {

    return () => {

        const [storeCalendar, setStoreCalendar] = useRecoilState(calendarStoreState);
        const [open, setOpen] = useRecoilState(creationCalendarModalState);

        const clickCalendarModalToggleEvent = ( e ) => {
            setStoreCalendar({
                ...storeCalendar,
                name: "",
                thumbnail: "",
                thumbnailFile: null,
            });
            setOpen(!open);
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

        return(
        <Compoent
            changeImageEvent={changeImageEvent}
            storeCalendar={storeCalendar}
            changeInputEvent={changeInputEvent}
            submitCalendarEvent={submitCalendarEvent}
            clickCalendarModalToggleEvent={clickCalendarModalToggleEvent}
        />
        )
    }
}
export default withCalendarCreateEnvet;