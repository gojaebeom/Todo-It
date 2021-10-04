import { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { calendarsState } from "./atoms/calendarsState";
import { tokenState } from "./atoms/tokenState";
import { loadingPageState } from "./atoms/ui/loadingPage";
import { userState } from "./atoms/userState";
import Error403 from "./pages/err/Error403";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Redirector from "./pages/login/Redirector";
import TodoList from "./pages/todoList/TodoList";
import ApiScaffold from "./shared/api";

function App(){

    const history = useHistory();
    const [token, setToken] = useRecoilState(tokenState);
    const [user, setUser] = useRecoilState(userState);
    const [calendars, setCalendars] = useRecoilState(calendarsState);
    const setLoadingPage = useSetRecoilState(loadingPageState);


    useEffect(() => {
        console.log("%c [ 상태 변경감지 ]", "color:red");
        console.log("토큰 상태")
        console.log(token);
        console.log("---------------");
        console.log("회원 상태")
        console.log(user);
        console.log("---------------");
        console.log("캘리던 상태")
        console.log(calendars);
    },[calendars, token, user]);

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
        const refreshRes = await ApiScaffold({
                            method: "get",
                            url: `/auth/silent-refresh`,
                            token: null,
                            data: null
                        }, ( err ) => {
                            console.error(err);
                            const message = err.data.message;
                            if(message === "ERR:NOT_FINE_RFT"){
                                history.push("/403");
                            }else{
                                history.push("/login");
                            }
                        });
        console.log(refreshRes);
        setToken({...refreshRes.actInfo});
        const userRes = await ApiScaffold({
                        method: "get",
                        url: `/users/${refreshRes.actInfo.id}`,
                        token: refreshRes.actInfo.token
                    }, ( err ) => {
                        console.error(err);
                    });
        setUser({...userRes.data.user});
        setCalendars([...userRes.data.calendars]);
        setLoadingPage({step1:false, step2:true});
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
export default App;