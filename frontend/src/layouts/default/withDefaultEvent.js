import axios from "axios";
import moment from "moment";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { useRecoilState } from "recoil";
import { calendarStoreState } from "../../atoms/calendarStoreState";
import { tokenInitState, tokenState } from "../../atoms/tokenState";
import { creationCalendarModalState } from "../../atoms/ui/creationCalendarModalState";
import { updateUserModalState } from "../../atoms/ui/updateUserModalState";
import { userState } from "../../atoms/userState";

function withDefaultEvent(DefaultLayout){
    return ({ children }) => {
        const [user, setUser]   = useRecoilState(userState);
        const [token, setToken] = useRecoilState(tokenState);
        const [store, setStore] = useRecoilState(calendarStoreState);
        const [creationCalendarModalOpen, setCreationCalendarModalOpen] = useRecoilState(creationCalendarModalState);
        const [userModalOpen, setUserModalOpen] = useRecoilState(updateUserModalState);
        const history = useHistory();

        const issuedAt = token.iat;
        const nowAt = moment().unix();
        console.log("---------------TOKENTIME----------------");
        console.log(`%c토큰 만료시간: ${1800}`,"color:orange");
        console.log(`%c발급일로 부터 지난 시간: ${nowAt - issuedAt}`,"color:blue");
        console.log("----------------------------------------");


        // eslint-disable-next-line react-hooks/exhaustive-deps
        useEffect(async () => {
            if(token.id){
                await axios({
                    method: "get",
                    url: `${process.env.REACT_APP_API_URL}/users/${token.id}`,
                    headers: {
                        "Authorization": `bearer ${token.token}`,
                    },
                    withCredentials:true,
                })
                .then(data => {
                    console.log(data.data);
                    setUser({...data});
                })
                .catch(err => {
                    console.error(err);
                });
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [token.id]);
        
        
        
        const clickLogoutEvent = async () => {
            // eslint-disable-next-line no-restricted-globals
            const result = confirm("로그아웃 하시겠습니까?");
            if(!result) return;

            await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}/users/logout`,
                headers: {
                    "Authorization": `bearer ${token.token}`,
                },
                withCredentials:true,
            })
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.error(err);
            });
            setToken(tokenInitState);
            history.push("/login");
        }

        const clickCreationCalendarModalOpenEvent = () => setCreationCalendarModalOpen(true);
        

        const clickUpdateUserModalOpenEvent = () => setUserModalOpen(true);
        

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
                setStore({...store, thumbnail: e.target.result, thumbnailFile: file });
            }
            // reader가 이미지 읽도록 하기
            reader.readAsDataURL(e.target.files[0]);
        }

        const changeInputEvent = ( e ) => {
            setStore({...store, name: e.target.value});
        }

        const submitCalendarEvent = () => {
            console.log(store);
        }

        return (
        <DefaultLayout
            children={children}
            userInfo={user}
            clickLogoutEvent={clickLogoutEvent}
            creationCalendarModalOpen={creationCalendarModalOpen}
            clickCreationCalendarModalOpenEvent={clickCreationCalendarModalOpenEvent}
            changeImageEvent={changeImageEvent}
            storeCalendar={store}
            changeInputEvent={changeInputEvent}
            submitCalendarEvent={submitCalendarEvent}

            clickUpdateUserModalOpenEvent={clickUpdateUserModalOpenEvent}
            userModalOpen={userModalOpen}
        />
        );
    }
}
export default withDefaultEvent;