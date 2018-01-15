import React from "react";
import { observer } from "mobx-react";
import { Redirect } from "react-router-dom";

import { use } from "utils/Translations";
import tlFR from "translations/login.fr.json";
import tlEN from "translations/login.en.json";

import LoginForm from "components/organisms/LoginForm";

import "./style.scss";

use(window.localStorage.getItem("lang") === "fr" ? tlFR : tlEN);

export default observer(({ store }) =>
  <div className="Login">
    <LoginForm onLogin={() => store.logIn()} />
    {/* This redirects the user to the activity page if they are already logged in */}
    {store.user && <Redirect to="/activity" />}
  </div>
);
