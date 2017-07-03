import React from "react";

import { tl } from "utils/Translations";

import Button from "components/atoms/Button";
import TextInput from "components/atoms/TextInput";

import "./style.scss";

export default class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { label: "" };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange($event) {
    this.setState({ label: $event.target.value });
  }
  onSubmit($event) {
    $event.preventDefault();
    if (this.state.label) {
      this.props.onAdd(this.state);
      this.setState({ label: "" });
    }
  }
  render() {
    return (
      <form className="TodoForm" onSubmit={this.onSubmit}>
        <TextInput
          type="text"
          placeholder={tl("TASK_PLACEHOLDER")}
          onChange={this.onChange}
          value={this.state.label}
        />
        <Button type="button">{tl("ADD_TASK")}</Button>
      </form>
    );
  }
}
