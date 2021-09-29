import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function withAuthEvent(App){
    return () => {
        const dispatch = useDispatch();

        // eslint-disable-next-line react-hooks/exhaustive-deps
        useEffect(async () => {
            const act = window.localStorage.getItem("act");
            if(act === null){
                dispatch({ type:"IS_LOGOUT"});
            }else{
                const decode = jwtDecode(act);
                await axios({
                    method: "get",
                    url: `${process.env.REACT_APP_API_URL}/users/${decode.id}`,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `bearer ${act}`
                    },
                })
                .then(data => data.data)
                .catch(err => err.response);

                dispatch({type:"IS_LOGIN", payload:{email:"const.gjb@gmail.com", nickname:"helloWorld", profileImg:""}});
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        return <App />
    }
}
export default withAuthEvent;