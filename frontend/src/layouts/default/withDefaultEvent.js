import moment from "moment";
import { useHistory } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { calendarDetailState } from "../../atoms/calendarDetailState";
import { calendarsState } from "../../atoms/calendarsState";
import { tokenInitState, tokenState } from "../../atoms/tokenState";
import { creationCalendarModalState } from "../../atoms/ui/creationCalendarModalState";
import { updateUserModalState } from "../../atoms/ui/updateUserModalState";
import { userEditState } from "../../atoms/userEditState";
import { userState } from "../../atoms/userState";
import ApiScaffold from "../../shared/api";

function withDefaultEvent(DefaultLayout){
    return ({ children }) => {
        const history = useHistory();

        const user = useRecoilValue(userState);
        const calendars = useRecoilValue(calendarsState);
        const [token, setToken] = useRecoilState(tokenState);
        const [userEdit, setUserEdit] = useRecoilState(userEditState);

        const [createionCalendarModalOpen, setCreationCalendarModalOpen] = useRecoilState(creationCalendarModalState);
        const [userModalOpen, setUserModalOpen] = useRecoilState(updateUserModalState);
        const [calendarDetail, setCalendarDetail] = useRecoilState(calendarDetailState);

        const issuedAt = token.iat;
        const nowAt = moment().unix();
        console.log("---------------TOKENTIME----------------");
        console.log(`%c토큰 만료시간: ${1800}`,"color:orange");
        console.log(`%c발급일로 부터 지난 시간: ${nowAt - issuedAt}`,"color:blue");
        console.log("----------------------------------------");
        
        const clickLogoutEvent = async () => {
            // eslint-disable-next-line no-restricted-globals
            const result = confirm("로그아웃 하시겠습니까?");
            if(!result) return;

            await ApiScaffold({
                method: "get",
                url: `/users/logout`,
                token: token.token
            }, ( err ) => {
                console.error(err);
            });

            setToken(tokenInitState);
            history.push("/login");
        }

        const clickCreationCalendarModalOpenEvent = () => setCreationCalendarModalOpen({...createionCalendarModalOpen, open:true});

        const clickUpdateUserModalOpenEvent = () => {
            setUserEdit({
                ...userEdit,
                id: user.id,
                email: user.email,
                nickname: user.nickname,
                userCode: user.userCode,
                createdAt: user.createdAt,
                profilePreviewImg: user.profilePreviewImg
            });
            setUserModalOpen({...userModalOpen, open:true});
        }

        const clickCalendarSelectEvent = async (e, item) => {
            console.log(item);
            const calendarSelectors = document.querySelectorAll(".calendarSelector");
            const target = e.currentTarget;

            const res = await ApiScaffold({
                method: "get",
                url: `/calendars/${item.id}`,
                token: token.token
            }, ( err ) => {
                console.error(err);
            });

            for(let calendarSelector of calendarSelectors){
                if(calendarSelector === target){
                    const div = document.createElement("div");
                    div.className="absolute bottom-0 right-0 w-3 h-3 bg-red-400 rounded-full pick to-blue-300";
                    calendarSelector.appendChild(div);
                    console.log(res.data);
    
                    let array = [];
                    for(let i = 0; i < res.data.members.length; i++){
                        array.push(res.data.members[i]);
                        if( res.data.members[i].id === user.id){
                            let temp;
                            temp = array[0];
                            array[i] = temp;
                            array[0] = res.data.members[i];
                        }
                    }
                    console.log(array);

                    res.data.members = array;

                    setCalendarDetail({...res.data});
                }else{
                    if(calendarSelector.querySelector(".pick")){
                        calendarSelector.removeChild(calendarSelector.querySelector(".pick"));
                    }
                }
            }
        }

        return (
        <DefaultLayout
            children={children}
            user={user}
            calendars={calendars}
            calendarDetail={calendarDetail}
            clickLogoutEvent={clickLogoutEvent}
            clickCreationCalendarModalOpenEvent={clickCreationCalendarModalOpenEvent}
            clickUpdateUserModalOpenEvent={clickUpdateUserModalOpenEvent}
            clickCalendarSelectEvent={clickCalendarSelectEvent}
        />
        );
    }
}
export default withDefaultEvent;