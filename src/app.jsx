import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Redirect } from "react-router-dom";

import Login from "pages/Login";
import Activity from "pages/Activity";

import AuthStore from "stores/AuthStore";
import TodoStore from "stores/TodoStore";

import "assets/fonts/roboto/regular.ttf";
import "assets/fonts/roboto/bold.ttf";
import "scss/fonts.scss";
import "scss/global.scss";

import "./index.html";

const authStore = new AuthStore();
const todoStore = new TodoStore();

const ProtectedRoute = ({ component: Component, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      authStore.user
        ? <Component {...props} />
        : <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />}
  />;

const App = ({ store }) =>
  <HashRouter>
    <div className="App">
      <Route exact path="/" component={() => <Login store={authStore} />} />
      <ProtectedRoute
        path="/activity"
        component={() =>
          <Activity todoStore={todoStore} authStore={authStore} />}
      />
    </div>
  </HashRouter>;

ReactDOM.render(<App store={authStore} />, document.getElementById("root"));
