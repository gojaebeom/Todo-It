import { Route, Switch } from 'react-router-dom'
import appEvent from './appEvent'
import Home from './pages/Home'
import Login from './pages/Login'
import Redirector from './pages/Redirector'
import TodoList from './pages/TodoList'
import Error403 from './pages/Error403'
import React from 'react'
import Toast from './components/shared/Toast'

const App = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/calendars/:id/days/:id">
          <TodoList />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/auth/kakao">
          <Redirector />
        </Route>
        <Route path="/*">
          <Error403 />
        </Route>
      </Switch>
      <Toast />
    </React.Fragment>
  )
}
export default appEvent(App)
