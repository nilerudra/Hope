import React, { useState, useEffect } from 'react';
import "./task.css";
import axios from 'axios';

const Task = () => {
    const [task, setTask] = useState({
        title: '',
        description: '',
        dueDate: '',
        ngoId: localStorage.getItem("ngo_id")
    });
    const [tasks, setTasks] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({
            ...task,
            [name]: value
        });
    };

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/assign-task/${task.ngoId}`);
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/assign-task", task);
            console.log(response.data); 
            setTask({
                title: '',
                description: '',
                dueDate: '',
                ngoId: localStorage.getItem("ngo_id")
            });
            alert("Task assigned and volunteers notified");
            fetchTasks();
        } catch (error) {
            console.error("Error assigning task", error);
            alert("Failed to assign task");
        }
    };

    return (
        <div className='task-main'>
        <div className="task-assign">
            <form onSubmit={handleSubmit} className="task-form">
                <h2 className="task-title">Assign Task</h2>

                <label className="task-label">
                    Task Title:
                    <input
                        type="text"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                        className="task-input"
                        required
                    />
                </label>

                <label className="task-label">
                    Description:
                    <textarea
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                        className="task-textarea"
                        required
                    />
                </label>

                <label className="task-label">
                    Due Date:
                    <input
                        type="date"
                        name="dueDate"
                        value={task.dueDate}
                        onChange={handleChange}
                        className="task-input"
                        required
                    />
                </label>

                <button type="submit" className="task-button">Assign Task</button>
            </form>
            </div>
            <div className="task-list">
                <h3>Previously Assigned Tasks</h3>
                <div className="task-cards">
                    {tasks.length > 0 ? (
                        tasks.map((t) => (
                            <div key={t._id} className="task-card">
                                <h4 className="task-card-title">{t.title}</h4>
                                <p className="task-card-description">{t.description}</p>
                                <p className="task-card-due-date">
                                    Due Date: {new Date(t.dueDate).toLocaleDateString()}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>No tasks assigned yet.</p>
                    )}
                </div>
            </div>
            </div>
       
    );
};

export default Task;
