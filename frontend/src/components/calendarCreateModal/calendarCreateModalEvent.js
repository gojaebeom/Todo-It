import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { calendarsState } from "../../atoms/calendarsState";
import { calendarStoreState } from "../../atoms/calendarStoreState";
import { creationCalendarModalState } from "../../atoms/ui/creationCalendarModalState";
import { userState } from "../../atoms/userState";
import ApiScaffold from "../../shared/api";
import readImgFile from "../../shared/readImgFile";
import sleep from "../../shared/sleep";

const calendarCreateModalEvent = ( Compoent ) => {
    return () => {
        const user = useRecoilValue(userState);
        const [storeCalendar, setStoreCalendar] = useRecoilState(calendarStoreState);
        const [creationCalendarModalOpen, setCreationCalendarModalOpen] = useRecoilState(creationCalendarModalState);
        const setCalendars = useSetRecoilState(calendarsState);
        const resetCalendarStore = useResetRecoilState(calendarStoreState);

        const clickCreationCalendarModalCloseEvent = ( e ) => {
            resetCalendarStore();
            setCreationCalendarModalOpen({open:false, submit:false});
        }

        const changeImageEvent = ( e ) => {
            readImgFile(e, (event, file) => {
                setStoreCalendar({...storeCalendar, thumbnail: event.target.result, thumbnailFile: file });
            });
        }

        const changeInputEvent = ( e ) => {
            const name = e.target.name;
            const value = e.target.value;

            if(name === "isPrivate"){
                setStoreCalendar({...storeCalendar, isPrivate: storeCalendar.isPrivate === 0 ? 1 : 0});
            }else{
                setStoreCalendar({...storeCalendar, name: value });
            }
        }

        const submitCalendarEvent = async () => {
            if(!storeCalendar.name) return alert("캘린더의 이름은 필수값입니다.");

            setCreationCalendarModalOpen({...creationCalendarModalOpen, submit:true});
            
            const formData = new FormData();
            formData.append("userId", user.id);
            if(storeCalendar.name) formData.append("name", storeCalendar.name);
            if(storeCalendar.thumbnail) formData.append("thumbnail", storeCalendar.thumbnailFile);
            formData.append("isPrivate", storeCalendar.isPrivate);
            
            const res = await ApiScaffold({
                method: "post",
                url: `/calendars`,
                data: formData
            }, ( err ) => {
                alert(err.data.message);
                setCreationCalendarModalOpen({...creationCalendarModalOpen, submit:false});
                throw new Error(err.data);
            });
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
export default calendarCreateModalEvent;