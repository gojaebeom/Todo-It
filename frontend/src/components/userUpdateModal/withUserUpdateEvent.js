import { useRecoilState } from "recoil";
import { updateUserModalState } from "../../atoms/ui/updateUserModalState";

function withUserUpdateEvent( UserUpdateModal ) {
    return () => {
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

        return(
        <UserUpdateModal
            clickUpdateUserModalCloseEvent={clickUpdateUserModalCloseEvent}
        />
        )
    }
}
export default withUserUpdateEvent;