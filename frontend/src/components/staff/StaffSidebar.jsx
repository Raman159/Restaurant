import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./StaffSidebar.css";

const StaffSidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: "/staff/dashboard", icon: "bi-speedometer2", label: "Dashboard" },
    { path: "/staff/table-cart", icon: "bi-cart3", label: "Table Cart" },
  ];

  return (
    <>
      <button className="hamburger-btn" onClick={() => setIsOpen(!isOpen)}>
        <i className="bi bi-list"></i>
      </button>
      <div className={`staff-sidebar ${isOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-logo">
          <i className="bi bi-shop"></i>
          <h4>Staff Portal</h4>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${location.pathname === item.path ? "active" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              <i className={`bi ${item.icon}`}></i>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)}></div>}
    </>
  );
};

export default StaffSidebar;
