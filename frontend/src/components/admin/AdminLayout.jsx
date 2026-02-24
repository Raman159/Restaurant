import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./AdminLayout.css";

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <Topbar />
        <div className="admin-main">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
