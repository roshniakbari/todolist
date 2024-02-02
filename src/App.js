import React, { useState } from 'react';
import './App.css';

function App() {
    const [inputVal, setInputVal] = useState('');
    const [todos, setTodos] = useState([]);
    const [editingTask, setEditingTask] = useState();
    const [search, setsearch] = useState('');
    const [reset, setreset] = useState([]);

    function handleSub() {
        if (editingTask !== undefined) {
            const updatedTodos = [...todos];
            updatedTodos[editingTask] = { text: inputVal, completed: false };
            setTodos(updatedTodos);
            setEditingTask(undefined);
        } else if (inputVal.trim() !== '') {
            setTodos([...todos, { text: inputVal, completed: false }]);
            setreset([...reset, { text: inputVal, completed: false }]);
        }
        setInputVal('');
    }

    const handleDelete = (value) => {
        const updatedTasks = todos.filter((todo) => todo.text !== value);
        setTodos(updatedTasks);
    }

    const handleEdit = (index) => {
        setInputVal(todos[index].text);
        setEditingTask(index);
    }

    const toggleComplete = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index] = { ...updatedTodos[index], completed: !updatedTodos[index].completed };
        setTodos(updatedTodos);
        setreset(updatedTodos);
    }

    const Clickbutton = () => {
        const click = [...reset];
        var data = click.filter((todo) => {
            return todo.text === search;
        })
        setTodos(data);
        setsearch("");
    }

    const Combutton = () => {
        const completebtn = reset.filter((todo) => {
            return todo.completed === true;
        });
        setTodos(completebtn);
    }

    const unCombutton = () => {
        const completebtn = reset.filter((todo) => {
            return todo.completed === false;
        });
        setTodos(completebtn);
    }

    const allbutton = () => {
        setTodos([...reset]);
    }

    return (
        <div className="App">
            <h1 className="title">To do List</h1>
            <input type="text" className="inbox" value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
            <button onClick={handleSub} className="add">Add Todo</button>

            <ul>
                <div className="search">
                    <input type="text" placeholder="search..." className="inbox" value={search} onChange={(e) => setsearch(e.target.value)}></input>
                </div>
                <div className="event">
                    <button onClick={Clickbutton}>click</button>
                    <button onClick={Combutton}>completed</button>
                    <button onClick={unCombutton}>uncompleted</button>
                    <button onClick={allbutton}>all</button>
                </div>
                <div className="task">
                    {todos.map((todo, index) => (
                        <li key={index} className="btnn">
                            <div>
                                <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(index)} style={{ margin: "20px 10px 0px 0px" }}></input>
                                <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>{todo.text}</span>

                                <button onClick={() => handleDelete(todo.text)} className="inbutton">Delete</button>
                                <button onClick={() => handleEdit(index)} className="inbutton">Edit</button>
                            </div>
                        </li>
                    ))}
                </div>
            </ul>
        </div>
    )
}
export default App;