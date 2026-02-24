import React from "react";
import StaffSidebar from "./StaffSidebar";
import StaffTopbar from "./StaffTopbar";
import "./StaffLayout.css";

const StaffLayout = ({ children, showRightSidebar, rightSidebarContent }) => {
  return (
    <div className="staff-layout">
      <StaffSidebar />
      <div className={`staff-content ${showRightSidebar ? "with-right-sidebar" : ""}`}>
        <StaffTopbar />
        <div className="staff-main">{children}</div>
      </div>
      {showRightSidebar && (
        <div className="staff-right-sidebar">{rightSidebarContent}</div>
      )}
    </div>
  );
};

export default StaffLayout;
