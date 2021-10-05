import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { calendarsState } from "../../atoms/calendarsState";
import { calendarStoreInitState, calendarStoreState } from "../../atoms/calendarStoreState";
import { tokenState } from "../../atoms/tokenState";
import { creationCalendarModalState } from "../../atoms/ui/creationCalendarModalState";
import { userState } from "../../atoms/userState";
import ApiScaffold from "../../shared/api";
import readImgFile from "../../shared/readImgFile";
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
            readImgFile(e, (event, file) => {
                setStoreCalendar({...storeCalendar, thumbnail: event.target.result, thumbnailFile: file });
            });
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