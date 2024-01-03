import { faCircle, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useState } from "react"

export default function Todo(props) {
    const [isHovered, setIsHovered] = useState(false);

    const { todo, setTodos } = props;

    

    const updateTodo = async (todoId, todoStatus) => {
        const res = await fetch(`/api/todos/${todoId}`, {
            method: "PUT",
            body: JSON.stringify({ status: todoStatus }),
            headers: {
                "Content-Type": "application/json"
            },
        });     
        
        const json = await res.json();
        
        //setIsChecked(json.status == true ? '#EDFAF6' : '#ffffff');
        if (json.acknowledged) {
            setTodos(currentTodos => {
                return currentTodos.map((currentTodo) => {
                    if (currentTodo._id === todoId) {
                        return { ...currentTodo, status: !currentTodo.status };
                    }
                    return currentTodo;
                });
            });
        }
    };

    const deleteTodo = async (todoId) => {
        const res = await fetch (`/api/todos/${todoId}`, {
            method: "DELETE",
        });
        const json = await res.json();
        if (json.acknowledged) {
            setTodos(currentTodos => {
                return currentTodos
                .filter((currentTodo) => (currentTodo._id !== todoId));
            })
        }
    };
    
    return (
        <div 
            key={todo._id} 
            className="todo" 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={(props.todo.status === true ? { backgroundColor: '#EDFAF6', textDecoration: 'line-through wavy rgba(0,0,0,.3)' } : { backgroundColor: '#FFFFFF' })}
        >
            <div>
                <button 
                    className="todo__status"
                    onClick={() => updateTodo(props.todo._id, props.todo.status)}
                >
                    {props.todo.status ? (
                        <FontAwesomeIcon
                            icon={faCircleCheck}
                            style={{ color: "#62dfa9" }}
                        />
                    ) : (
                        <FontAwesomeIcon icon={faCircle} style={{ color: "#a0a2a6" }} />
                    )}
                </button>
            </div>
            <p>{props.todo.todo}</p>
            {isHovered && (
                <button 
                    className="todo__delete"
                    onClick={() => deleteTodo(props.todo._id)}
                >

                    <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#d21f" }}/>

                </button>
            )}
        </div>
    );
}
