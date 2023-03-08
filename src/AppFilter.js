import React from "react";
import "./App.css";
import { AddTodo, Title, Todos } from "./features";

const initTasks = [
  { id: "todo-0", content: "Do Homework", done: false },
  { id: "todo-1", content: "Write a report", done: true },
  { id: "todo-2", content: "Hangout with friends", done: true },
  { id: "todo-3", content: "New Task", done: false },
];

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { tasks: initTasks, filter: "all" };
    this.toggleDone = this.toggleDone.bind(this);
  }
  onFilterChange = (e) => {
    this.setState({ filter: e.target.value });
  };
  onDelete = (id) => {
    let updatedTasks = this.state.tasks.filter((e) => {
      return e.id !== id;
    });
    this.setState({ tasks: updatedTasks });
  };

  addTask = e => {
    let updatedTasks = [...this.state.tasks, {
      id: parseInt(Math.random() * 100),
      content: e,
      done: false,
    }]
    this.setState({ tasks: updatedTasks })
  }
  toggleDone(id) {
    const updatedTasks = this.state.tasks.map((e) => {
      if (id === e.id) {
        // use object spread to make a new obkect
        // whose `done` prop has been inverted
        return { ...e, done: !e.done };
      }
      return e;
    });
    this.setState({ tasks: updatedTasks });
  }

  render() {
    let { tasks, filter } = this.state;
    return (
      <div className="container">
        <Title />
        <AddTodo onAdd={this.addTask} />
        <span>
          <label htmlFor="filter">Filter</label>
          <select name="filter" onChange={this.onFilterChange} value={filter}>
            <option value="all">...</option>
            <option value="done">Done</option>
            <option value="active">Not Done Yet</option>
          </select>
        </span>
        <Todos
          tasks={tasks}
          onDelete={this.onDelete}
          toggleDone={this.toggleDone}
          filter={filter}
        />
      </div>
    );
  }
}
