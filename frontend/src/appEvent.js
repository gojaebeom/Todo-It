import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";
import {useResetRecoilState, useSetRecoilState} from "recoil";
import { calendarDetailState } from "./atoms/calendarDetailState";
import {calendarsState, useCalendars} from "./atoms/calendarsState";
import { loadingPageState } from "./atoms/ui/loadingPage";
import { toastState } from "./atoms/ui/toastState";
import { userState } from "./atoms/userState";
import ApiScaffold from "./shared/api";
import {notificationModalState} from "./atoms/ui/notificationModalState";

const appEvent = (App) => {
    return () => {
        const setToast = useSetRecoilState(toastState);
        const history = useHistory();
        const setUser = useSetRecoilState(userState);
        const setCalendars = useSetRecoilState(calendarsState);
        const setCalendarDetail = useSetRecoilState(calendarDetailState);
        const setLoadingPage = useSetRecoilState(loadingPageState);
        // const resetNotificationModal = useResetRecoilState(notificationModalState);

        const {
            resetContextMenu
        } = useCalendars();

        const silentRefresh = async () => {
            const refreshRes = await ApiScaffold({
                method: "get",
                url: `/auth/silent-refresh`,
            }, ( err ) => {
                // setToast({open:true, message:err, type:"ERROR" ,second:2000});
                history.push("/login");
            });
            
            console.debug(refreshRes);
            // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
            axios.defaults.headers.common['Authorization'] = `bearer ${refreshRes.act.token}`;
            return refreshRes.act;
        }

        const loadEvent = async () => {
            const pathname = history.location.pathname;

            if(pathname !== "/login" && pathname !== "/auth/kakao"){
                const act = await silentRefresh();

                const userRes = await ApiScaffold({
                    method: "get",
                    url: `/users/${act.id}`
                }, (err) => setToast({open:true, message:err, type:"ERROR" ,second:2000}));
                setUser({...userRes.data.user});

                if(userRes.data.calendars.length !== 0){
                    setCalendars([...userRes.data.calendars]);
                    setCalendarDetail({...userRes.data.calendars[0]});
                }
                setLoadingPage({ step1:false, step2:true });

                // accessToken 만료하기 1분 전에 로그인 연장
                // const JWT_EXPIRY_TIME = 1800 * 1000;
                // setTimeout(loadEvent, JWT_EXPIRY_TIME - 60000);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
        useEffect(async () => {
            console.debug(`%c APP MOUNTED`,`color:red`);
            await loadEvent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        useEffect(() => {
            window.addEventListener("click", (event) => {
                let elem = event.target;
                const calendarCellCustomizeBar = document.querySelector(".calendar-cell-customize-bar");
                // const notification = document.querySelector(".notification");

                if(calendarCellCustomizeBar && elem !== calendarCellCustomizeBar){
                    resetContextMenu();
                }
                // if(notification && elem !== notification){
                //     resetNotificationModal();
                // }
            })
        }, []);

        return(
        <App/>
        )
    }
}
export default appEvent;