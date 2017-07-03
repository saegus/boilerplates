import React from "react";

import "./style.scss";

export default ({ onClick, children }) =>
  <button className="LinkButton" onClick={onClick}>
    {children}
  </button>;
