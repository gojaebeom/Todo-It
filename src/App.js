import { useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import withAuthEvent from "./global/withAuthEvent";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Redirector from "./pages/login/Redirector";
import TodoList from "./pages/todoList/TodoList";

function App(){

    const userInfo = useSelector(s => s.userInfo);

    return(
    <Switch>
        <Route exact path="/">
            { userInfo.isLogin ? <Home/> : <Redirect to="/login"/> }
        </Route>
        <Route path="/days/:id">
            { userInfo.isLogin ? <TodoList/> : <Redirect to="/login"/> }
        </Route>
        <Route path="/login">
            { !userInfo.isLogin ? <Login/> : <Redirect to="/"/> }
        </Route>
        <Route path="/auth/kakao">
            <Redirector/>
        </Route>
    </Switch>
    )
}
export default withAuthEvent(App);