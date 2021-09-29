import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function withAuthEvent(App){
    return () => {

        const userInfo = useSelector(s => s.userInfo);
        const dispatch = useDispatch();

        // eslint-disable-next-line react-hooks/exhaustive-deps
        useEffect(async () => {
            
            const act = window.localStorage.getItem("act");
            if(act === null){
                dispatch({ type:"IS_LOGOUT"});
            }else{

                const decode = jwtDecode(act);

                const res = await axios({
                    method: "post",
                    url: `${process.env.REACT_APP_API_URL}/users/${decode.id}`,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `bearer ${act}`
                    },
                    data: {"provideType": "KAKAO"},
                })
                .then(data => data.data)
                .catch(err => err.response);
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        return <App />
    }
}
export default withAuthEvent;