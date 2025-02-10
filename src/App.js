import "./styles.scss";
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ text: "", done: false });

  const removeTask = (index) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((_, i) => i !== index);
      console.log("Updated Tasks:", updatedTasks);
      return updatedTasks;
    });
  };
  const removeAll = () => {
    setTasks([]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>To-do app</h1>
      </header>
      <div className="todo">
        <div className="todo__input">
          <input
            type="text"
            placeholder="Hier de tekst..."
            value={task.text}
            onChange={(e) => setTask({ ...task, text: e.target.value })}
          />
          <button
            onClick={() => {
              if (task.text.trim() === "") return;
              setTasks([...tasks, { ...task }]);
              setTask({ text: "", done: false });
            }}
            className="button button--add"
          >
            Save task
          </button>
        </div>
        <div className="todo__list">
          <ul className="task">
            {tasks.map((t, index) => (
              <li key={index} className={t.done ? "task--false" : "task--done"}>
                {t.text}
                <button
                  className="button button--add"
                  onClick={() => {
                    setTasks((prevTasks) =>
                      prevTasks.map((task, i) =>
                        i === index ? { ...task, done: !task.done } : task
                      )
                    );
                  }}
                >
                  Done
                </button>
                <button
                  onClick={() => removeTask(index)}
                  className="button button--remove"
                >
                  Delete this task
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button className="button button--remove-all" onClick={() => removeAll()}>
        remove alll
      </button>
    </div>
  );
}

export default App;
