import { useRecoilState, useRecoilValue } from "recoil";
import { tokenState } from "../../atoms/tokenState";
import { updateUserModalState } from "../../atoms/ui/updateUserModalState";
import { userEditState } from "../../atoms/userEditState";
import { userState } from "../../atoms/userState";
import ApiScaffold from "../../shared/api";
import readImgFile from "../../shared/readImgFile";
import sleep from "../../shared/sleep";

function withUserUpdateEvent( UserUpdateModal ) {
    return () => {
        const token = useRecoilValue(tokenState);
        const [user, setUser] = useRecoilState(userState);
        console.log(user);
        const [userEdit, setUserEdit] = useRecoilState(userEditState);
        const [updateUserModalOpen, setUpdateUserModalOpen] = useRecoilState(updateUserModalState);

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
                    url: `/users/${userEdit.id}`,
                    token: token.token
                }, ( err ) => {
                    console.log(err);
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
            
            const res = await ApiScaffold({
                            method: "put",
                            url: `/users/${userEdit.id}`,
                            token: token.token,
                            data: formData
                        }, ( err ) => {
                            console.log(err.data);
                            alert(err.data.message);
                            setUpdateUserModalOpen({...updateUserModalOpen, submit:false});
                            throw new Error(err.data);
                        });
            console.log(res);
            sleep(500);
            setUser({...res.data});
            setUpdateUserModalOpen({...updateUserModalOpen, open:false, submit:false});
        }

        return(
        <UserUpdateModal
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
export default withUserUpdateEvent;