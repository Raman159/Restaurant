import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: "/admin", icon: "bi-speedometer2", label: "Dashboard" },
    { path: "/admin/staff", icon: "bi-people", label: "Staff" },
    { path: "/admin/tables", icon: "bi-table", label: "Tables" },
    { path: "/admin/menu", icon: "bi-card-list", label: "Menu" },
  ];

  return (
    <>
      <button className="hamburger-btn" onClick={() => setIsOpen(!isOpen)}>
        <i className="bi bi-list"></i>
      </button>
      <div className={`sidebar ${isOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-logo">
          <i className="bi bi-shop"></i>
          <h4>Restaurant</h4>
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

export default Sidebar;
