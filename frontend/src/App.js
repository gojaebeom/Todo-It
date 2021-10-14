import { Route, Switch } from "react-router-dom";
import appEvent from "./appEvent";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Redirector from "./components/pages/Redirector";
import TodoList from "./components/pages/TodoList";
import Error403 from "./components/pages/Error403";
import React from "react";
import Toast from "./components/commons/toast/Toast";

const App = () => {
    return(
    <React.Fragment>
        <Switch>
            <Route exact path="/">
                <Home/>
            </Route>
            <Route path="/calendars/:id/days/:id">
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
        <Toast />
    </React.Fragment>
    )
}
export default appEvent(App);