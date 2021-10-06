import axios from "axios";
import { useHistory } from "react-router";
import { useSetRecoilState } from "recoil";
import { calendarDetailState } from "./atoms/calendarDetailState";
import { calendarsState } from "./atoms/calendarsState";
import { loadingPageState } from "./atoms/ui/loadingPage";
import { userState } from "./atoms/userState";
import ApiScaffold from "./shared/api";

const appEvent = (App) => {
    return () => {

        const history = useHistory();
        const setUser = useSetRecoilState(userState);
        const setCalendars = useSetRecoilState(calendarsState);
        const setCalendarDetail = useSetRecoilState(calendarDetailState);
        const setLoadingPage = useSetRecoilState(loadingPageState);
    
        const silentRefresh = async () => {
            const refreshRes = await ApiScaffold({
                method: "get",
                url: `/auth/silent-refresh`,
            }, ( err ) => {
                if(err.message === "ERR:NOT_FINE_RFT"){
                    history.push("/403");
                }else{
                    history.push("/login");
                }
            });
            
            console.debug(refreshRes);
            // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
            axios.defaults.headers.common['Authorization'] = `bearer ${refreshRes.act.token}`;
            return refreshRes.act;
        }

        const loadEvent = async () => {
            const pathname = history.location.pathname;

            if(pathname !== "/login" && pathname !== "/auth/kakao"){
                console.debug("토큰 자동 갱신");

                const act = await silentRefresh();

                const userRes = await ApiScaffold({
                    method: "get",
                    url: `/users/${act.id}`
                });

                console.debug(userRes);

                const defaultCalendarId = userRes.data.calendars[0].id;
                const calendarDetail = await ApiScaffold({
                    method: "get",
                    url: `/calendars/${defaultCalendarId}`,
                });

                console.debug(calendarDetail);

                setUser({...userRes.data.user});
                setCalendars([...userRes.data.calendars]);
                setCalendarDetail({...calendarDetail.data});
                setLoadingPage({ step1:false, step2:true });

                // accessToken 만료하기 1분 전에 로그인 연장
                const JWT_EXPIRY_TIME = 1800 * 1000;
                setTimeout(loadEvent, JWT_EXPIRY_TIME - 60000);
            }
        }
        let toggle = true;
        if(toggle){
            toggle = false;
            loadEvent();
        }

        return(
        <App/>
        )
    }
}
export default appEvent;