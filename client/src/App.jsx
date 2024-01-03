import { useEffect, useState } from "react";

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import Todo from './Todo';

export default function App() {

  let today = new Date();
  const getDate = today.toDateString();
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    async function getTodos() {
      const res = await fetch("/api/todos");
      const todos = await res.json();

      setTodos(todos);
    }
    getTodos();
  }, []);

  const totalCount = todos.length;

  const createNewTodo = async (e) => {
    e.preventDefault();
    if (content.length > 3) {
      const res = await fetch ("/api/todos", {
        method: "POST",
        body: JSON.stringify({ todo: content }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newTodo = await res.json();

      setContent('');
      setTodos([...todos, newTodo]);
    }
  }



  return (
    <main className="container">
      <h3 className="date">{getDate}</h3>
      <div className="todoCount">
        {totalCount} tasks
      </div>
      <form className='form' onSubmit={createNewTodo}>
        <div className='form__input'>
          <input 
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add a new todo" 
            autoComplete="off"
            id="inputBox"
          />
          <button type="submit">
            <FontAwesomeIcon icon={faPlus} style={{color: "#8a9ca5",}} />
          </button>
        </div>
        <div className="todos">
          {todos.length > 0 &&
            todos.map((todo) => (
              <Todo key={todo._id} todo={todo} setTodos={setTodos} />
            ))}
        </div>
      </form>
    </main>
  );
}
