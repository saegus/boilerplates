import React from "react";
import "./style.scss";

export default props =>
  <button
    className={`ExampleButton ${props.className}`}
    type={props.type}
    onClick={props.onClick}
  >
    {props.children}
  </button>;
