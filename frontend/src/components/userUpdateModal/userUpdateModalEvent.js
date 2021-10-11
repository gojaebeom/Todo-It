import { useRecoilState, useSetRecoilState } from "recoil";
import { calendarDetailState } from "../../atoms/calendarDetailState";
import { calendarsState } from "../../atoms/calendarsState";
import { toastState } from "../../atoms/ui/toastState";
import { updateUserModalState } from "../../atoms/ui/updateUserModalState";
import { userEditState } from "../../atoms/userEditState";
import { userState } from "../../atoms/userState";
import ApiScaffold from "../../shared/api";
import readImgFile from "../../shared/readImgFile";

const userUpdateModalEvent = ( UserUpdateModal ) => {
    return () => {
        const setToast = useSetRecoilState(toastState);

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

        const deleteImage = async (userId) =>{
            // eslint-disable-next-line no-restricted-globals
            const result = confirm("이미지를 초기화하시겠습니까?");
            setUserEdit({...userEdit, profilePreviewImg: "", profileImgFile: null});
            if(!result) return false;

            await ApiScaffold({
                method: "delete",
                url: `/users/${userId}/images`
            }, ( err ) => {
                setUpdateUserModalOpen({...updateUserModalOpen, submit:false});
            });
            const userRes = await ApiScaffold({
                method: "get",
                url: `/users/${userId}`
            });
            setUser({...userRes.data.user});
            if(userRes.data.calendars.length !== 0){
                setCalendars([...userRes.data.calendars]);
                setCalendarDetail({...userRes.data.calendars[0]});
            }
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
                setToast({open:true, message:"그동안 Todoit을 이용해주셔서 감사합니다.", type:"INFO",second:2000});
                window.location.href = "/login";
                
            }
        }

        const submitEvent = async () => {
            if(!userEdit.nickname)
                return setToast({open:true, message:"회원 닉네임은 필수값입니다!", type:"WARNING",second:2000});

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
            deleteImage={deleteImage}
            changeInputEvent={changeInputEvent}
            clickDeleteUserEvent={clickDeleteUserEvent}
            submitEvent={submitEvent}
        />
        )
    }
}
export default userUpdateModalEvent;