import "./styles.scss";
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ text: "", done: false, date: "" });

  // Function to remove a specific task
  const removeTask = (index) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((_, i) => i !== index);
      return updatedTasks;
    });
  };

  // Function to toggle task status (done/undone)
  const toggleTaskStatus = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((t, i) => (i === index ? { ...t, done: !t.done } : t))
    );
  };
  // Function to handle the task text input
  const handleAddTask = () => {
    if (task.text.trim() === "") return; // Don't add empty tasks
    setTasks([
      ...tasks,
      {
        ...task,
        date: new Date().toLocaleString("nl-NL", {
          weekday: "long",
          month: "long",
          day: "numeric",
        }),
      },
    ]); // Add new task
    setTask({
      text: "",
      done: false,
    }); // Reset task input
  };
  // Function to remove all tasks
  const removeAll = () => {
    setTasks([]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>To-do app</h1>
        {tasks?.[0] && (
          <h2>You have {tasks.filter((t) => !t.done).length} tasks left</h2>
        )}
      </header>
      <div className="todo">
        <div className="todo__input">
          <input
            type="text"
            placeholder="Add a task..."
            value={task.text}
            onChange={(e) => setTask({ ...task, text: e.target.value })}
          />
          <button onClick={handleAddTask} className="button button--add">
            Save task
          </button>
        </div>
        <div className="todo__list">
          {tasks.length > 0 ? (
            <ul>
              {tasks.map((t, index) => (
                <li
                  key={index}
                  className={t.done ? "task task--false" : "task task--done"}
                >
                  <div className="todo__column">
                    <span>{t.text}</span>{" "}
                    <div className="todo__date">{t.date}</div>
                  </div>
                  <div className="todo__buttons">
                    <button
                      onClick={() => toggleTaskStatus(index)}
                      className="button button--add"
                    >
                      {t.done ? "Undo" : "Done"}
                    </button>
                    <button
                      onClick={() => removeTask(index)}
                      className="button button--remove"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tasks added</p>
          )}
        </div>
      </div>
      {tasks?.[0] && (
        <button className="button button--remove-all" onClick={removeAll}>
          Remove all
        </button>
      )}
    </div>
  );
}

export default App;
