import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/TaskDetail.css";
import axios from 'axios';
import moment from 'moment';

const TaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTask() {
      try {
        const response = await axios.get(`http://localhost:5000/tasks/${id}`);
        const fetchedTask=response.data.Task;
        console.log('detail',fetchedTask);
        const formattedDate={
          ...fetchedTask,
          due_date:moment(fetchedTask.due_date).format("YYYY-MM-DD"),
          cretead_at:moment(fetchedTask.cretead_at).format("YYYY-MM-DD"),
          updated_at:moment(fetchedTask.updated_at).format("YYYY-MM-DD")
        }
        setTask(formattedDate);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    }
    fetchTask();
  }, [id]);

  const handleComplete = async () => {
    try {
     const response=await axios.patch(`http://localhost:5000/complete/${id}`,{complete:"completed"});
     if(response.status===201){
        setTask({ ...task, status: "completed" });
        console.log('completed');
      }
    } catch (error) {
      console.error("Error marking task complete:", error);
    }
  };

  return (
    <div className="task-detail">
      {task ? (
        <>
          <h1>{task.title}</h1>
          <p>{task.description}</p>
          <p>Due Date: {task.due_date}</p>
          <p>Created Date: {task.cretead_at}</p>
          <p>last Updated Date: {task.updated_at}</p>
          <p>Status: {task.status}</p>
          <button onClick={handleComplete}>Mark as Complete</button>
          <button onClick={() => navigate("/tasks")}>Back to Tasks</button>
        </>
      ) : (
        <p>Loading task...</p>
      )}
    </div>
  );
};

export default TaskDetail;
