import React from "react";
import { observer } from "mobx-react";

import { use } from "utils/Translations";
import tlFR from "translations/activity.fr.json";
import tlEN from "translations/activity.en.json";

import NavBar from "components/organisms/NavBar";
import TodoList from "components/organisms/TodoList";

import "./style.scss";

use(window.localStorage.getItem("lang") === "fr" ? tlFR : tlEN);

export default observer(({ todoStore, authStore }) =>
  <div className="Activity">
    <NavBar
      user={authStore.user}
      onSearch={({ query }) =>
        (todoStore.displayTasks = todoStore.tasks.filter(
          t => t.label.toLowerCase().indexOf(query.toLowerCase()) > -1
        ))}
      onLogOut={() => authStore.logOut()}
    />
    <TodoList
      tasks={todoStore.displayTasks}
      onCheck={task => (task.checked = !task.checked)}
      onAdd={task => todoStore.addTask(task)}
      onDelete={task => todoStore.removeTask(task)}
    />
  </div>
);
