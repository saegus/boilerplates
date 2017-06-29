import React from "react";

import { tl } from "utils/Translations";

import ExampleTemplate from "components/templates/ExampleTemplate";

import Handlers from "./handlers";
import "./style.scss";

export default class ExamplePage1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "" };
    this.onClick = () => Handlers.onClick(this);
  }

  render() {
    return (
      <div className="ExamplePage1">
        <ExampleTemplate
          name={tl("NAME_PAGE_1")}
          onClick={this.onClick}
          message={this.state.message}
        />
      </div>
    );
  }
}
