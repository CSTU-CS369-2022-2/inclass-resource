import React from "react";

export default function Todo({ tasks, onDelete, toggleDone, filter }) {
  // filter = "all", "active", "done"
  const taskList = tasks.filter((e) => {
    if (filter === "active") return !e.done;
    if (filter === "done") return e.done;
    return true;
  })
    .map(e => {
      return (
        <li className="list-group-item" key={e.id}>
          <div className="list-item">
            <input id={e.id} type="checkbox" defaultChecked={e.done} onChange={() => toggleDone(e.id)} />
            <label htmlFor={e.id}>{e.content}</label>
          </div>
          <div className="btn-group">
            <button type="button" className="btn btn__danger" onClick={() => onDelete(e.id)}>
              Delete
            </button>
          </div>
        </li>)
    });
  const taskNoun = taskList.length > 1 ? "tasks" : "task"

  return (
    <>
      <h2 id="list-heading">{taskList.length} {taskNoun} remaining</h2>
      <ul className="list-group">
        {taskList}
      </ul>
    </>
  );
}
