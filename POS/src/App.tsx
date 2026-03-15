import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Login from "./pages/Login";
// import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      { 
      <Route path="/" element={<Login />} /> }
      <Route path="/adminDashboard" element={<AdminDashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
