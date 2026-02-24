import React from "react";
import StaffLayout from "../../components/staff/StaffLayout";

const StaffDashboard = () => {
  return (
    <StaffLayout>
      <h2 className="mb-4">Staff Dashboard</h2>
      <div className="row g-3">
        <div className="col-md-6">
          <div className="card text-center p-4">
            <i className="bi bi-table fs-1 text-primary"></i>
            <h3 className="mt-3">Manage Tables</h3>
            <p className="text-muted mb-0">View and manage table reservations</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card text-center p-4">
            <i className="bi bi-cart3 fs-1 text-success"></i>
            <h3 className="mt-3">Table Cart</h3>
            <p className="text-muted mb-0">Process orders and billing</p>
          </div>
        </div>
      </div>
    </StaffLayout>
  );
};

export default StaffDashboard;
