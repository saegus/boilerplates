import React from "react";
import { observer } from "mobx-react";

import "./style.scss";

// Use "observer" whenever you render an element that is susceptible of being updated
export default observer(({ task, onDelete, onCheck }) =>
  <div className={`Todo ${task.checked ? "Todo--checked" : ""}`}>
    <input type="checkbox" className="Todo__check" onClick={onCheck} />
    <div className="Todo__label">{task.label}</div>
    <button type="button" onClick={onDelete} className="Todo__delete">×</button>
  </div>
);
