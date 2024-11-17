import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskDetail from "./components/TaskDetail";
import BottomNavbar from "./components/Navbar";
import Home from "./components/Home";
const App = () => {
  return (
    <Router>
      <div className="container">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/create" element={<TaskForm />} />
        <Route path="/task/:id" element={<TaskDetail />} />
      </Routes>
      <BottomNavbar/>
    </div>
    </Router>
  );
};

export default App;
