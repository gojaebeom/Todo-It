import { Route, Switch, withRouter } from "react-router-dom";
import withAuthEvent from "./global/withAuthEvent";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Redirector from "./pages/login/Redirector";
import TodoList from "./pages/todoList/TodoList";

function App(){
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
    </Switch>
    )
}
export default withRouter(withAuthEvent(App));