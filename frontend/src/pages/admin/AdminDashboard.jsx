import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { staffAPI, tablesAPI, menuAPI } from "../../services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ staff: 0, tables: 0, menu: 0 });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const [staffData, tablesData, menuData] = await Promise.all([
      staffAPI.getAll(),
      tablesAPI.getAll(),
      menuAPI.getAll(),
    ]);
    setStats({
      staff: staffData.length,
      tables: tablesData.length,
      menu: menuData.length,
    });
  };
  return (
    <AdminLayout>
      <h2 className="mb-4">Dashboard</h2>
      <div className="row g-3">
        <div className="col-md-3">
          <div className="card text-center p-4">
            <i className="bi bi-people fs-1 text-primary"></i>
            <h3 className="mt-3">{stats.staff}</h3>
            <p className="text-muted mb-0">Staff Members</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center p-4">
            <i className="bi bi-table fs-1 text-success"></i>
            <h3 className="mt-3">{stats.tables}</h3>
            <p className="text-muted mb-0">Tables</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center p-4">
            <i className="bi bi-card-list fs-1 text-warning"></i>
            <h3 className="mt-3">{stats.menu}</h3>
            <p className="text-muted mb-0">Menu Items</p>
          </div>
        </div>
       
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
