import { useRecoilState, useSetRecoilState } from "recoil";
import { calendarDetailState } from "../../atoms/calendarDetailState";
import { calendarsState } from "../../atoms/calendarsState";
import { updateUserModalState } from "../../atoms/ui/updateUserModalState";
import { userEditState } from "../../atoms/userEditState";
import { userState } from "../../atoms/userState";
import ApiScaffold from "../../shared/api";
import readImgFile from "../../shared/readImgFile";

const userUpdateModalEvent = ( UserUpdateModal ) => {
    return () => {
        const [user, setUser] = useRecoilState(userState);
        const [userEdit, setUserEdit] = useRecoilState(userEditState);
        const [updateUserModalOpen, setUpdateUserModalOpen] = useRecoilState(updateUserModalState);
        const setCalendars = useSetRecoilState(calendarsState);
        const setCalendarDetail = useSetRecoilState(calendarDetailState);

        const clickUpdateUserModalCloseEvent = ( e ) => {
            setUpdateUserModalOpen({...updateUserModalOpen, open:false});
        }

        const changeImageEvent = ( e ) => {
            readImgFile(e, (event, file) => {
                setUserEdit({...userEdit, profilePreviewImg: event.target.result, profileImgFile: file });
            });
        }
        
        const changeInputEvent = ( e ) => {
            const value = e.target.value;
            const name = e.target.name;
            if(name === "nickname")
                setUserEdit({...userEdit, nickname:value});
        }

        const clickDeleteUserEvent = async () => {
            const result = prompt("탈퇴하시려면 '회원탈퇴' 를 작성해주세요.");
            if(result === "회원탈퇴"){
                await ApiScaffold({
                    method: "delete",
                    url: `/users/${userEdit.id}`
                }, ( err ) => {
                    alert(err.data.message);
                });
                alert("그동안 Todoit을 이용해주셔서 감사합니다.");
                window.location.href = "/login";
                
            }
        }

        const submitEvent = async () => {
            setUpdateUserModalOpen({...updateUserModalOpen, submit:true});
            const formData = new FormData();
            formData.append("id", userEdit.id);
            if(userEdit.nickname) formData.append("nickname", userEdit.nickname);
            if(userEdit.profileImgFile) formData.append("profileImg", userEdit.profileImgFile);
            
            await ApiScaffold({
                method: "put",
                url: `/users/${userEdit.id}`,
                data: formData
            }, ( err ) => {
                setUpdateUserModalOpen({...updateUserModalOpen, submit:false});
            });

            const userRes = await ApiScaffold({
                method: "get",
                url: `/users/${userEdit.id}`
            });
            setUser({...userRes.data.user});
            if(userRes.data.calendars.length !== 0){
                setCalendars([...userRes.data.calendars]);
                setCalendarDetail({...userRes.data.calendars[0]});
            }
            setUpdateUserModalOpen({...updateUserModalOpen, open:false, submit:false});
        }

        return(
        <UserUpdateModal
            user={user}
            userEdit={userEdit}
            updateUserModalOpen={updateUserModalOpen}
            clickUpdateUserModalCloseEvent={clickUpdateUserModalCloseEvent}
            changeImageEvent={changeImageEvent}
            changeInputEvent={changeInputEvent}
            clickDeleteUserEvent={clickDeleteUserEvent}
            submitEvent={submitEvent}
        />
        )
    }
}
export default userUpdateModalEvent;