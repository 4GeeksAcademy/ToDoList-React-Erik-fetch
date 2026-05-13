import { useState } from "react";
import "./ToDos.css"

const ToDo = () => {
    const [inputValue, setInputValue] = useState('');
    const [toDos, setTodos] = useState([]);

    const addTask = () => {
        setTodos([...toDos, inputValue])
        setInputValue('');
    }

    const removeToDo = (indexToDelete) => {
        const remainingTasks = toDos.filter((task,index) => index !== indexToDelete)
        setTodos(remainingTasks);
    }

    return(
        <div className="main-container">
            <h1>To Do list:</h1>
            <input 
            type="text"
            onChange={e => setInputValue(e.target.value)}
            value={inputValue}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    addTask();
                }
            }}
            />
            <div className="task-container">
                {toDos.length === 0 ? <div className="empty">No hay tareas, añadir tareas</div> : null}
                { toDos.map((toDo,index) => {
                    return(
                        <div key={index} className="task">
                            <span>{toDo}</span>
                            <button className="delete-button" onClick={() => {removeToDo(index)}}>X</button>
                        </div>
                    )
                })}  
            </div> 
        </div>
    )
}

export default ToDo;