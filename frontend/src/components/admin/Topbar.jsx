import React from "react";
import { useNavigate } from "react-router-dom";
import "./Topbar.css";

const Topbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="topbar">
      <div className="topbar-content">
        <h5 className="mb-0">Admin Panel</h5>
        <button onClick={handleLogout} className="btn-logout">
          <i className="bi bi-box-arrow-right me-2"></i>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Topbar;
