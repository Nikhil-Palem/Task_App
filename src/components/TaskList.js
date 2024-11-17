import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TaskList.css";
import axios from 'axios';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import moment from 'moment';


const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await axios.get("http://localhost:5000/getTasks");
        const fetchedTasks=response.data.Tasks;
        const formattedDate=fetchedTasks.map(task=>({
          ...task,
          due_date:moment(task.due_date).format("YYYY-MM-DD")
        }))
        setTasks(formattedDate);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    fetchTasks();
  }, []);

  const handleEdit = async (taskId) => {
    try {
      navigate("/create", { state: { taskId } });
    } catch (error) {
      console.log("error during edit");
    }
  }

  const handleDelete = async (taskId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/delete/${taskId}`);
      if (response.status === 200) {
        setTasks(tasks.filter(task => task.id !== taskId));
        console.log("Task deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  return (
    <div className="task-list">
      <h1>Tasks</h1>
      <button className="create-button" onClick={() => navigate("/create")}>
        + Create Task
      </button>
      <ul>
        {tasks.map((task) => (
          <>
            <li
              key={task.id}
              onClick={() => navigate(`/task/${task.id}`)}
              className={`task-item ${task.status}`}
            >
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <span>{task.due_date}</span>
            </li>
            <div className="options" >
              <div className="box " data-id={task.id}>
                <EditNoteIcon onClick={() => handleEdit(task.id)} className="edit" />
                {/* <span className="label">edit</span> */}
              </div>
              <div className="box" data-id={task.id}>
                <DeleteOutlineIcon onClick={() => handleDelete(task.id)} className="delete" />
                {/* <span className="label">delete</span> */}
              </div>
            </div>
          </>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
