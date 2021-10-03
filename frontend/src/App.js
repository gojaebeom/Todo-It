import axios from "axios";
import { useEffect } from "react";
import { Route, Switch, withRouter, useHistory } from "react-router-dom";
import { useRecoilState} from "recoil";
import { tokenState } from "./atoms/tokenState";
import Error403 from "./pages/err/Error403";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Redirector from "./pages/login/Redirector";
import TodoList from "./pages/todoList/TodoList";

function App(){

    const history = useHistory();
    const [token, setToken] = useRecoilState(tokenState);


    useEffect(() => {
        console.log("%c [ 상태 변경감지 ]", "color:red");
        console.log(token);
    },[token]);

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
            console.log(data.data.actInfo);
            const act = data.data.actInfo;
            setToken({...act});
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

    return(
    <Switch>
        <Route exact path="/">
            <Home/>
        </Route>
        <Route path="/days/:id">
            <TodoList/>
        </Route>
        <Route path="/login">
            <Login/>
        </Route>
        <Route path="/auth/kakao">
            <Redirector/>
        </Route>
        <Route path="/*">
            <Error403/>
        </Route>
    </Switch>
    )
}
export default withRouter(App);