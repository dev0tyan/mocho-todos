import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

export default function App() {
  let today = new Date();
  const getDate = today.toDateString();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function getTodos() {
      const res = await fetch("/api/todos");
      const todos = await res.json();

      setTodos(todos);
    }
    getTodos();
  }, []);

  return (
    <main className="container">
      <h3 className="date">{getDate}</h3>
      <div className="todoCount">4 task</div>
      <input type="text" placeholder="Add a new todo" id="inputBox" />
      <div className="todos">
        {todos.length > 0 &&
          todos.map((todo) => (
            <div key={todo._id} className="todo">
              <div>
                <button className="todo__status">
                  {todo.status ? <FontAwesomeIcon icon={faCircleCheck} style={{color: "#62dfa9",}} /> : <FontAwesomeIcon icon={faCircle} style={{color: "#a0a2a6",}} />}
                </button>
              </div>
              <p>{todo.todo}</p>
            </div>
          ))}
      </div>
    </main>
  );
}
