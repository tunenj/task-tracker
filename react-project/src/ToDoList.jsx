import React, { useState } from "react";  

function ToDoList(){
    const [tasks, setTasks] = useState(["Go to gym", "Take bath", "Eat breakfast"]);
    const [newTask, setNewTask] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [editTask, setEditTask] = useState("");

    function handleInputChange(event){
        setNewTask(event.target.value);
    }

    function addTask(){
       if(newTask.trim() !==""){
        setTasks(t => [...t, newTask]);
        setNewTask("");
       }

    }
    function deleteTask(index){
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);

    }
    function moveTaskUp(index){
        if(index > 0){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index-1]] = 
            [updatedTasks[index-1],updatedTasks[index]];
            setTasks(updatedTasks);
        }    
    }

    function startEditing(index) {
        setEditIndex(index);
        setEditTask(tasks[index]);
    }

    function handleEditInputChange(event) {
        setEditTask(event.target.value);
    }

    function saveEditTask() {
        if (editTask.trim() !== "") {
            const updatedTasks = tasks.map((task, index) =>
                index === editIndex ? editTask : task
            );
            setTasks(updatedTasks);
            setEditIndex(null);
            setEditTask("");
        }
    }

    function cancelEdit() {
        setEditIndex(null);
        setEditTask("");
    }


    function moveTaskDown(index){
        if(index < tasks.length-1){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index+1]] = 
            [updatedTasks[index+1],updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    return(<div className="to-do-list">
        <h1>To-do-list</h1>
        <input type="text" 
        placeholder="Enter task"
        value={newTask}
        onChange={handleInputChange}
        />
        <button className="add-button" onClick={addTask}>Add</button> 
    <ol>
        {tasks.map((task, index) => (
            <li key={index}> 
               {editIndex === index ? (
                     <div>
                        <input 
                            type="text" 
                            value={editTask} 
                            onChange={handleEditInputChange}/>

                        <button className="save-button" onClick={saveEditTask}>Save</button>
                        <button className="cancel-button" onClick={cancelEdit}>Cancel</button>
                        </div>

                         ) : (
                        <>
                            <span className="text">{task}</span>
                            <button className="edit-button" onClick={() => startEditing(index)}>Edit</button>
                            <button className="delete-button" onClick={() => deleteTask(index)}>Delete</button>
                            <button className="move-button" onClick={() => moveTaskUp(index)}>Up</button>
                            <button className="move-button" onClick={() => moveTaskDown(index)}>Down</button>
                        </>
                        )}
                    </li>
                ))}
            </ol>
    </div>);

}
export default ToDoList