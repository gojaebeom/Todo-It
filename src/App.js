import { Route, Switch } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
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
            <Login/>
        </Route>
    </Switch>
    )
}
export default App;