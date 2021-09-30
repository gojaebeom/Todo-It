import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function withAuthEvent(App){
    return ({history}) => {
        const dispatch = useDispatch();

        // eslint-disable-next-line react-hooks/exhaustive-deps
        useEffect(async () => {

            const res = await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}/auth/silent-refresh`,
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials:true
            })
            .then(data => data.data)
            .catch(err => err.response);

            console.log(res.data);
            if(res.data !== "hello"){
                history.push("/login");
            }

            dispatch({type:"IS_LOGIN", payload:{email:"const.gjb@gmail.com", nickname:"helloWorld", profileImg:""}});
            
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        return <App/>
    }
}
export default withAuthEvent;