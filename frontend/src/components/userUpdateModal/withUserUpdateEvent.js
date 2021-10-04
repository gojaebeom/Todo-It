import { useRecoilState, useRecoilValue } from "recoil";
import { tokenState } from "../../atoms/tokenState";
import { updateUserModalState } from "../../atoms/ui/updateUserModalState";
import { userState } from "../../atoms/userState";
import ApiScaffold from "../../shared/api";

function withUserUpdateEvent( UserUpdateModal ) {
    return () => {
        const token = useRecoilValue(tokenState);
        const [user, setUser] = useRecoilState(userState);
        const [updateUserModalOpen, setUpdateUserModalOpen] = useRecoilState(updateUserModalState);

        const clickUpdateUserModalCloseEvent = ( e ) => {
            setUpdateUserModalOpen(false);
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

            }
            // reader가 이미지 읽도록 하기
            reader.readAsDataURL(e.target.files[0]);
        }

        const changeInputEvent = ( e ) => {
            const value = e.target.value;
            const name = e.target.name;
            if(name === "nickname")
                setUser({...user, nickname:value});
        }

        const clickDeleteUserEvent = async () => {
            const result = prompt("탈퇴하시려면 '회원탈퇴' 를 작성해주세요.");
            if(result === "회원탈퇴"){
                await ApiScaffold({
                    method: "delete",
                    url: `/users/${user.userId}`,
                    token: token.token
                }, ( err ) => {
                    console.log(err);
                    alert(err.data.message);
                });
                alert("그동안 Todoit을 이용해주셔서 감사합니다.");
                window.location.href = "/login";
                
            }
        }

        return(
        <UserUpdateModal
            user={user}
            updateUserModalOpen={updateUserModalOpen}
            clickUpdateUserModalCloseEvent={clickUpdateUserModalCloseEvent}
            changeImageEvent={changeImageEvent}
            changeInputEvent={changeInputEvent}
            clickDeleteUserEvent={clickDeleteUserEvent}
        />
        )
    }
}
export default withUserUpdateEvent;