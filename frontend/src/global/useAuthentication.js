import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

function useAuthentication(){
    const dispatch = useDispatch();
    const history = useHistory();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        const pathname = history.location.pathname;
        if(pathname !== "/login" && pathname !== "/auth/kakao"){
            console.log("토큰 자동 갱신");
            await silentRefresh();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const silentRefresh = async () => {
        await axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}/auth/silent-refresh`,
            headers: { },
            withCredentials:true
        })
        .then(data => {
            dispatch({type:"LOGIN", payload: {...data.data.actInfo} });
        })
        .catch(err => {
            console.error(err.response);
            const message = err.response.data.message;
            if(message === "ERR:NOT_FINE_RFT"){
                history.push("/403");
            }else{
                history.push("/login");
            }
        });
    }
}
export default useAuthentication;