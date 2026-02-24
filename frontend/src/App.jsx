import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStaff from "./pages/admin/Staff";
import Tables from "./pages/admin/Tables";
import Menu from "./pages/admin/Menu";
import StaffDashboard from "./pages/staff/StaffDashboard";
import TableCart from "./pages/staff/TableCart";
import TableDetail from "./pages/staff/TableDetail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/staff" element={<AdminStaff />} />
        <Route path="/admin/tables" element={<Tables />} />
        <Route path="/admin/menu" element={<Menu />} />
        <Route path="/staff/dashboard" element={<StaffDashboard />} />
        <Route path="/staff/table-cart" element={<TableCart />} />
        <Route path="/staff/table/:tableId" element={<TableDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
