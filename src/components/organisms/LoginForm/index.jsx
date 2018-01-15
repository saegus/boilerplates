import React from "react";

import { tl } from "utils/Translations";

import Logo from "components/atoms/Logo";
import TextInput from "components/atoms/TextInput";
import Button from "components/atoms/Button";

import "./style.scss";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="LoginForm">
        <div className="LoginForm__logo">
          <Logo />
        </div>
        <div className="LoginForm__description">
          {tl("LOG_IN_WITH_OFFICE_365")}
        </div>
        <div className="LoginForm__submit">
          <Button type="button" onClick={$event => this.props.onLogin()}>
            {tl("LOG_IN")}
          </Button>
        </div>
      </div>
    );
  }
}
