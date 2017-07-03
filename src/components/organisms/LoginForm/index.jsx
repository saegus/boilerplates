import React from "react";

import { tl } from "utils/Translations";

import Logo from "components/atoms/Logo";
import TextInput from "components/atoms/TextInput";
import Button from "components/atoms/Button";

import "./style.scss";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }
  onEmailChange($event) {
    this.setState({ email: $event.target.value });
  }
  onPasswordChange($event) {
    this.setState({ password: $event.target.value });
  }
  render() {
    return (
      <form
        className="LoginForm"
        onSubmit={$event => {
          $event.preventDefault();
          this.props.onLogin(this.state);
        }}
      >
        <div className="LoginForm__logo">
          <Logo />
        </div>
        <TextInput
          type="email"
          onChange={this.onEmailChange}
          label={tl("EMAIL")}
        />
        <TextInput
          type="password"
          onChange={this.onPasswordChange}
          label={tl("PASSWORD")}
        />
        <div className="LoginForm__submit">
          <Button type="submit">{tl("LOG_IN")}</Button>
        </div>
      </form>
    );
  }
}
