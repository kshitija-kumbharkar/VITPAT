// Import necessary dependencies
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import styles from './Planner.module.css';
 // Import your CSS module for styling

// PlannerPage component
const Planner = () => {
  // State for tasks
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Function to add a new task
  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  // Function to remove a task
  const removeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  // Render the component
  return (
    <div className={styles.planner_container}>
                <Link to="/leader">

                  <button >Check</button>
                  </Link>

      <h1>Planner Page</h1>

      <div className={styles.task_input_container}>
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask} className={styles.b}>Add</button>
      </div>

      <ul className={styles.task_list}>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => removeTask(index)} className={styles.b}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Planner;
