import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { calendarDetailState } from "../../atoms/calendarDetailState";
import { calendarEditState } from "../../atoms/calendarEditState";
import { calendarsState } from "../../atoms/calendarsState";
import { editCalendarModalState } from "../../atoms/ui/editCalendarModalState";
import { userState } from "../../atoms/userState";
import ApiScaffold from "../../shared/api";
import readImgFile from "../../shared/readImgFile";

const calendarEditModalEvent = ( Compoent ) => {
    return () => {
        const user = useRecoilValue(userState);
        const [calendarDetail, setCalendarDetail] = useRecoilState(calendarDetailState);
        const [calendarEdit, setCalendarEdit] = useRecoilState(calendarEditState);
        const [calendarEditModal, setCalendarEditModal] = useRecoilState(editCalendarModalState);
        const setCalendars = useSetRecoilState(calendarsState);
        const resetCalendarEdit = useResetRecoilState(editCalendarModalState);

        const calendarEditModalClose = ( e ) => {
            resetCalendarEdit();
            setCalendarEditModal({open:false, submit:false});
        }

        const changeImage = ( e ) => {
            readImgFile(e, (event, file) => {
                setCalendarEdit({...calendarEdit, thumbnail: event.target.result, thumbnailFile: file });
            });
        }

        const changeCalendarEditInputs = ( e ) => {
            const name = e.target.name;
            const value = e.target.value;

            if(name === "isPrivate"){
                setCalendarEdit({...calendarEdit, isPrivate: !calendarEdit.isPrivate ? 1 : 0});
            }else{
                setCalendarEdit({...calendarEdit, name: value });
            }
        }

        const submitCalendarEdit = async () => {
            setCalendarEditModal({...calendarEditModal, submit:true});
            
            const formData = new FormData();
            formData.append("userId", user.id);
            if(calendarEdit.name) formData.append("name", calendarEdit.name);
            if(calendarEdit.thumbnailFile) formData.append("thumbnail", calendarEdit.thumbnailFile);
            formData.append("isPrivate", !calendarEdit.isPrivate ? 0 : 1);
            
            await ApiScaffold({
                method: "put",
                url: `/calendars/${calendarDetail.id}`,
                data: formData
            }, ( err ) => {
                setCalendarEditModal({...calendarEditModal, submit:false});
            });

            const calendarsRes = await ApiScaffold({
                method: "get",
                url: `/calendars?userId=${user.id}`
            });
            console.debug(calendarsRes);
            setCalendars([...calendarsRes.data]);
            for(let calendar of calendarsRes.data){
                if(calendar.id === calendarDetail.id){
                    setCalendarDetail({...calendar});
                }
            }
            
            
            setCalendarEditModal({...calendarEditModal, open:false, submit:false});
        }

        const deleteCalendarEdit = async () => {
            // eslint-disable-next-line no-restricted-globals
            const result = confirm("캘린더를 삭제하시겠습니까?");
            if(result){
                await ApiScaffold({
                    method: "delete",
                    url: `/calendars/${calendarDetail.id}`,
                });
    
                const calendarsRes = await ApiScaffold({
                    method: "get",
                    url: `/calendars?userId=${user.id}`
                });
                console.debug(calendarsRes);

                setCalendars([...calendarsRes.data]);
                for(let calendar of calendarsRes.data){
                    if(calendar.id === calendarDetail.id){
                        setCalendarDetail({...calendar});
                    }
                }
                setCalendarEditModal({...calendarEditModal, open:false, submit:false});
            }
            
        }

        return(
        <Compoent
            calendarDetail={calendarDetail}
            calendarEditModal={calendarEditModal}
            calendarEdit={calendarEdit}
            changeImage={changeImage}
            changeCalendarEditInputs={changeCalendarEditInputs}
            calendarEditModalClose={calendarEditModalClose}
            submitCalendarEdit={submitCalendarEdit}
            deleteCalendarEdit={deleteCalendarEdit}
        />
        )
    }
}
export default calendarEditModalEvent;