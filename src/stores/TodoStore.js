import { observable } from "mobx";

import mockTasks from "./mocks/todo.json";

export default class TodoStore {
  @observable tasks = mockTasks || [];
  @observable displayTasks = this.tasks.slice(0, 10);
  addTask({ label }) {
    this.tasks.unshift({
      id: this.tasks.reduce((max, t) => (t.id > max ? t.id : max), 0) + 1,
      label,
      checked: false
    });
    this.displayTasks = this.tasks.slice(0, 10);
  }
  removeTask({ id }) {
    this.tasks.splice(this.tasks.findIndex(t => t.id === id), 1);
    this.displayTasks = this.tasks.slice(0, 10);
  }
}
