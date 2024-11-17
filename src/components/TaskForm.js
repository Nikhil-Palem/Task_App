import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/TaskForm.css";
import axios from 'axios';
const TaskForm = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    due_date: "",
    status: "pending",
  });
  const location = useLocation();

  const navigate = useNavigate();
  const { taskId } = location.state || {};
  console.log(taskId, task);

  useEffect(() => {
    if (taskId) {
      async function editPage() {
        try {
          const resp = await axios.get(`http://localhost:5000/tasks/${taskId}`);
          setTask(resp.data.Task);
        } catch (error) {
          console.log(error);
        }
      }
      editPage();
    }
  }, [taskId]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(task.title);
    try {
      if (taskId) {
        const response=await axios.put(`http://localhost:5000/update/${taskId}`, {
          title: task.title,
          description: task.description,
          due_date: task.due_date,
          status: task.status
        });
        if (response.status === 200) {
          console.log("Task updated successfully");
        } else {
          console.log("Failed to update task:", response);
          return; 
        }
      } else {
        const response = await axios.post("http://localhost:5000/tasks", {
          title: task.title,
          description: task.description,
          due_date: task.due_date,
          status: task.status
        });
        if (response.status === 201) {
          console.log("successfully submitted task_id", response.data.Task.id);
        } else {
          console.log('failed to fetch data',response);
        }
      }
      setTask({
        title: "",
        description: "",
        due_date: "",
        status: "pending",
        });
      navigate("/tasks");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="task-form">
      <h1>{taskId ? "Edit Task" : "Create Task"}</h1>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
        />
        <label>Description</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          required
        />
        <label>Due Date</label>
        <input
          type="date"
          name="due_date"
          value={task.due_date}
          onChange={handleChange}
          required
        />
        <label>Status</label>
        <select name="status" value={task.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit">{taskId ? "Update Task" : "Save Task"}</button>
      </form>
    </div>
  );
};

export default TaskForm;
