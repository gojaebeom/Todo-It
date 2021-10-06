import { useEffect } from "react";
import { useHistory } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { calendarDetailState } from "../../atoms/calendarDetailState";
import { calendarsState } from "../../atoms/calendarsState";
import { creationCalendarModalState } from "../../atoms/ui/creationCalendarModalState";
import { updateUserModalState } from "../../atoms/ui/updateUserModalState";
import { userEditState } from "../../atoms/userEditState";
import { userState } from "../../atoms/userState";
import ApiScaffold from "../../shared/api";

const withDefaultEvent = (DefaultLayout) => {
    return ({ children }) => {
        const history = useHistory();

        const user = useRecoilValue(userState);
        const calendars = useRecoilValue(calendarsState);
        const [userEdit, setUserEdit] = useRecoilState(userEditState);

        const [createionCalendarModalOpen, setCreationCalendarModalOpen] = useRecoilState(creationCalendarModalState);
        const [userModalOpen, setUserModalOpen] = useRecoilState(updateUserModalState);
        const [calendarDetail, setCalendarDetail] = useRecoilState(calendarDetailState);

        useEffect(() => {
            console.debug("실행됨");
        }, []);
        
        const clickLogoutEvent = async () => {
            // eslint-disable-next-line no-restricted-globals
            const result = confirm("로그아웃 하시겠습니까?");
            if(!result) return;
            
            await ApiScaffold({
                method: "get",
                url: `/users/logout`,
            });
            // history.push("/login");
            window.location.href = "/login";
        }

        const clickCreationCalendarModalOpenEvent = () => 
            setCreationCalendarModalOpen({...createionCalendarModalOpen, open:true});

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

        const clickCalendarSelectEvent = async ( item ) => {
            const res = await ApiScaffold({
                method: "get",
                url: `/calendars/${item.id}`,
            });
            setCalendarDetail({...res.data});
            history.push("/");
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