
import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Home.css'
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>Welcome to the Task Management App!</h1>
      <p>Your personal task manager to help you stay organized.</p>
      <button onClick={() => navigate("/tasks")}>Go to Task List</button>
    </div>
  );
};

export default Home;
