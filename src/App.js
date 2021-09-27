import { Route, Switch } from "react-router-dom";
import Home from "./pages/home/Home";
import TodoList from "./pages/todoList/TodoList";

function App(){
    return(
    <div className="w-full">
        <Switch>
            <Route exact path="/">
                <Home/>
            </Route>
            <Route path="/days/:id">
                <TodoList/>
            </Route>
        </Switch>
    </div>
    )
}
export default App;