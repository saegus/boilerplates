import React from "react";

import { tl } from "utils/Translations";

import ExamplePage1 from "components/pages/ExamplePage1";
import ExamplePage2 from "components/pages/ExamplePage2";

import ExampleNav from "components/templates/ExampleNav";

import Handlers from "./handlers";
import "./style.scss";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: {} };
    this.onPage = page => Handlers.onPage(this, page);
  }
  render() {
    const PAGES = [
      { label: tl("NAV_PAGE_1"), id: 1 },
      { label: tl("NAV_PAGE_2"), id: 2 }
    ];
    return (
      <div className="App">
        <ExampleNav
          activePage={this.state.page}
          pages={PAGES}
          onPage={this.onPage}
        />
        {this.state.page.id === 1 && <ExamplePage1 />}
        {this.state.page.id === 2 && <ExamplePage2 />}
      </div>
    );
  }
}
