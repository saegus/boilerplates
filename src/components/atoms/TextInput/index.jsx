import React from "react";

import "./style.scss";

export default props =>
  <div className="TextInput">
    <div className="TextInput__label">{props.label}</div>
    <input className="TextInput__input" {...props} />
  </div>;
