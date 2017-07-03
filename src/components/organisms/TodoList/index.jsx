import React from "react";
import { observer } from "mobx-react";

import { tl } from "utils/Translations";

import TodoForm from "components/molecules/TodoForm";
import Todo from "components/molecules/Todo";

import "./style.scss";

@observer
export default class TodoList extends React.Component {
  // Will be called whenever "tasks" (todoStore.displayTasks) gets updated
  componentWillReact() {
    this.scrollDOM.scrollTop = 0;
  }
  render() {
    const { tasks, onAdd, onCheck, onDelete } = this.props;
    return (
      <div className="TodoList">
        <TodoForm onAdd={onAdd} />
        <div className="TodoList__body" ref={x => (this.scrollDOM = x)}>
          {tasks.map(task =>
            <Todo
              key={task.id}
              task={task}
              onCheck={() => onCheck(task)}
              onDelete={() => onDelete(task)}
            />
          )}
        </div>
      </div>
    );
  }
}
