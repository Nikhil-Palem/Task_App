import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const BottomNavbar = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <div className="nav-box">
      <div className="bottom-navbar">
        <div
          className="nav-button"
          onClick={() => navigate("/tasks")}
        >
          <ListAltIcon/>
          <span className="nav-label">Tasks</span>
        </div>
        <div
          className="nav-button"
          onClick={() => navigate("/create")}
        >
          <AddCircleOutlineIcon/>
          <span className="nav-label">Create</span>
        </div>
        <div className="vertical-rule">
        </div>
        <div
          className="nav-button dark-mode-toggle"
          onClick={() => setDarkMode(!darkMode)}  
        >
          {darkMode ? <DarkModeIcon/> : <LightModeIcon/>}
          <span className="nav-label">{!darkMode ? "Light Mode" : "Dark Mode"}</span>
        </div>
      </div>
    </div>
  );
};

export default BottomNavbar;