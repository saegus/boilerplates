import React from "react";

import TextInput from "components/atoms/TextInput";

import "./style.scss";

export default class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: "" };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange($event) {
    this.setState({ query: $event.target.value });
    if (!$event.target.value) this.props.onSearch({ query: "" });
  }
  onSubmit($event) {
    $event.preventDefault();
    this.props.onSearch(this.state);
  }
  render() {
    const props = Object.assign({}, this.props);
    delete props.onSearch; // Avoid non-existing attribute error for <input>
    return (
      <form className="SearchInput" onSubmit={this.onSubmit}>
        <TextInput type="search" onChange={this.onChange} {...props} />
        <button className="SearchInput__submit" type="submit">🔎</button>
      </form>
    );
  }
}
