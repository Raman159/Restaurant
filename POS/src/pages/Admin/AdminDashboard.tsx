import React, { useState,  } from "react";
import { useNavigate } from "react-router-dom";
import { FiHome, FiMapPin } from "react-icons/fi";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { useAuth } from "../../hooks/useAuth";
import Overview from "./Overview";

import OrderManagement from "./OrderManagement";
import PaymentManagement from "./PaymentManagement";
import UserManagement from "./UserManagement";
// import TableManagement from "./TableManagement";


const sidebarItems = [
  { label: "Overview", key: "overview", icon: <FiHome /> },
  // { label: "Tables", key: "tableManagement", icon: <FiMapPin /> },
   { label: "User Management", key: "userManagement", icon: <FiMapPin /> },
  { label: "Order Management", key: "orderManagement", icon: <FiMapPin /> },
  { label: "Payment", key: "paymentManagement", icon: <FiMapPin /> },

];

const dummyContent: Record<string, React.ReactNode> = {
  overview: <Overview />,
//   tableManagement: <TableManagement />,
 userManagement: <UserManagement />,
  orderManagement: <OrderManagement />,
  paymentManagement: <PaymentManagement />,
  
};

const AdminDashboard: React.FC = () => {
  const [selected, setSelected] = useState({
    parent: sidebarItems[0].key,
    child: sidebarItems[0].key,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout: authLogout } = useAuth();
  // const { logout: logoutController } = useAuthController();

  const handleSelect = (parentKey: string, childKey: string) => {
    setSelected({ parent: parentKey, child: childKey });
    setSidebarOpen(false);
  };

  const handleLogout = async () => {
    try {
      authLogout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      authLogout();
      navigate("/");
    }
  };

  // Get user display info
  const userName = user?.userName  || "Admin";
  const userRole = user?.role || "Administrator";
  const userAvatar = "https://randomuser.me/api/portraits/men/75.jpg"; // You can replace this with user.profileImageUrl if available

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar: always visible on md+, toggled on mobile */}
      <Sidebar
        items={sidebarItems}
        selected={selected}
        onSelect={handleSelect}
        userName={userName}
        userAvatar={userAvatar}
        userRole={userRole}
        onLogout={handleLogout}
        className={`${sidebarOpen ? "block" : "hidden"} md:block`}
      />
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      <div className="flex-1 flex flex-col">
        {/* Topbar (ml-56 for sidebar offset) */}
        <Topbar
          onLogout={handleLogout}
          mobileMenuButton={
            <button
              className="md:hidden p-2 text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen((v) => !v)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          }
          className="ml-0 md:ml-80"
        />
        {/* Main Content (ml-56 for sidebar offset) */}
        <main className="flex-1 h-[calc(100vh-4rem)] overflow-y-auto bg-gray-50 dark:bg-gray-900/95 ml-0 md:ml-80">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="p-4 sm:p-6 min-h-[calc(100vh-7rem)] w-full">
              {dummyContent[selected.child] || <div>Select a category</div>}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
