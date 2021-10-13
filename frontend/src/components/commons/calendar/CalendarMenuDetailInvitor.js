import {useRecoilState, useSetRecoilState} from "recoil";
import {userState} from "../../../atoms/userState";
import {calendarDetailState} from "../../../atoms/calendarDetailState";
import {inviteInputState} from "../../../atoms/inviteInputState";
import ApiScaffold from "../../../shared/api";
import {toastState} from "../../../atoms/ui/toastState";

const CalendarMenuDetailInvitor = () => {
    const [user, setUser] = useRecoilState(userState);
    const [calendarDetail, setCalendarDetail] = useRecoilState(calendarDetailState);
    const [inviteInput, setInviteInput] = useRecoilState(inviteInputState);
    const setToast = useSetRecoilState(toastState);

    const changeInviteInput = ( e ) => {
        setInviteInput(e.target.value);
    }
    const submitInviteInput = async ( ) => {
        if(!inviteInput){
            setToast({open:true, message:"유저코드를 입력하지 않았어요!", type:"WARNING",second:2000});
            setInviteInput("");
            return false;
        }
        if(inviteInput === user.userCode){
            setToast({open:true, message:"본인을 초대할 수 없어요!", type:"WARNING",second:2000});
            setInviteInput("");
            return false;
        }

        const formData = new FormData();
        formData.append("fromUserId", user.id);
        formData.append("toUserCode", inviteInput);
        formData.append("type", "JOIN_CALENDAR");
        formData.append("actionUrl", `/users/${inviteInput}/join/calendars/${calendarDetail.id}`);
        formData.append("content", `${user.nickname}님이 당신을 ${calendarDetail.name} 그룹에 초대했어요!`);

        await ApiScaffold({
            method: "post",
            url: `/notifications`,
            data: formData
        }, (err) => setToast({open:true, message:err, type:"ERROR" ,second:2000}));

        setToast({open:true, message:"초대 알림을 보냈어요!", type:"SUCCESS",second:2000});
        setInviteInput("");
    }

    return(
    ( !calendarDetail.isDefault ) ? // 기본캘린더가 아닐 경우만 초대 보이기
    <>
    {
        ( user.id === calendarDetail.userId ) && // 기본캘린더가 아니면서 캘린더 생성자만 초대 가능
        <div className="flex justify-between w-full mb-4 border-gray-200 rounded-md ">
            <input className="w-9/12 p-2 border outline-none rounded-l-md focus:border-red-300 focus:border-2"
                   value={inviteInput}
                   onChange={changeInviteInput}
            />
            <button className="w-3/12 p-2 text-white transition-all bg-red-300 rounded-r-md hover:bg-red-400"
                    onClick={submitInviteInput}
            >초대</button>
        </div>
    }
    </> :
    <div className="w-full p-2 mb-2 text-sm bg-white border rounded-md">이 캘린더는 개인 캘린더입니다. 팀 공유 캘린더가 필요하다면, 새로운 캘린더를 만들어주세요!🐥</div>
    )
}
export default CalendarMenuDetailInvitor;
