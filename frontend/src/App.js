import { Route, Switch, withRouter } from "react-router-dom";
import useAuthentication from "./global/useAuthentication";
import Error403 from "./pages/err/Error403";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Redirector from "./pages/login/Redirector";
import TodoList from "./pages/todoList/TodoList";

function App(){

    useAuthentication();

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