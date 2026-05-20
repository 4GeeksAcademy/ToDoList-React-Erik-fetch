import { useState, useEffect } from "react";
import "./ToDos.css"


const ToDo = () => {
    const [inputValue, setInputValue] = useState('');
    const [toDos, setTodos] = useState([]);
    const userName =  'stefan';
    
    

    useEffect(() => {
        const init = async () => {
            const userExists = await getTasks();
            if(!userExists) {
                await createUser();
                await getTasks();
            }
        };
        init();
    }, [])
    


    const getTasks = async () => {
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/users/${userName}`);
            if (!response.ok) {
                throw new Error (`${response.status} ${response.statusText}`)
            }
            const data = await response.json();
            setTodos(data.todos)
            return true;
        } 
        
        catch (error) {
            console.error("Error al obtener datos:", error)
            return false;
        }
    }


    const createUser = async () => {
        try {
            const response = await fetch (`https://playground.4geeks.com/todo/users/${userName}`, {
                method: 'POST',
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error (error.message || 'Error al crear el usuario')
            }
            const data = await response.json();
            return data;
        }
        catch (error){
            console.error('Error:', error);
            throw error;
        }
    };

    const addTask = async () => {
        if (inputValue.trim() === "") return;
        const newTask = {
            label: inputValue.trim(),
            is_done: false
        };
       try {
        const response = await fetch(`https://playground.4geeks.com/todo/todos/${userName}`, {
            method: 'POST',
             headers: {
                "Content-Type": "application/json"
             },
            body: JSON.stringify(newTask)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error (error.message || 'Error al crear la tarea');
        };
        const data = await response.json();
        await getTasks();
        setInputValue("");
        return data;
       }
       catch (error) {
        console.error('Error:', error);
        throw error;
       };
    };

    const removeToDo = async (toDoId) => {
        
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${toDoId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                 throw new Error("Error al eliminar la tarea");
            }
           await getTasks();
        }

        catch (error){
            console.error('Error:', error);
            throw error;
        };
    };

    return(
        <div className="main-container">
            <h1>To Do list:</h1>
            <input 
            type="text"
            onChange={e => setInputValue(e.target.value)}
            value={inputValue}
            onKeyDown={(e) => {
                if (e.key === 'Enter' ) {
                    addTask();
                }
               
            }}
            />
            <div className="task-container">
                {toDos.length === 0 ? <div className="empty">No hay tareas, añadir tareas</div> : null}
                { toDos.map((toDo) => {
                    return(
                        <div key={toDo.id} className="task">
                            <span>{toDo.label}</span>
                            <button className="delete-button" onClick={() => {removeToDo(toDo.id)}}>X</button>
                        </div>
                    )
                })}  
            </div> 
        </div>
    )
}

export default ToDo;