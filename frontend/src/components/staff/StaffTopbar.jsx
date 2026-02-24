import React from "react";
import { useNavigate } from "react-router-dom";
import "./StaffTopbar.css";

const StaffTopbar = () => {
  const navigate = useNavigate();
  const staff = JSON.parse(localStorage.getItem("staffUser") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("staffUser");
    navigate("/");
  };

  return (
    <div className="staff-topbar">
      <div className="topbar-content">
        <h5 className="mb-0">Welcome, {staff.name}</h5>
        <button onClick={handleLogout} className="btn-logout">
          <i className="bi bi-box-arrow-right me-2"></i>
          Logout
        </button>
      </div>
    </div>
  );
};

export default StaffTopbar;
