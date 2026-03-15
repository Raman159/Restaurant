import React from "react";

interface TopbarProps {
  onLogout: () => void;
  mobileMenuButton?: React.ReactNode;
  className?: string;
}

const Topbar: React.FC<TopbarProps> = ({ onLogout, mobileMenuButton, className }) => {
  return (
    <header className={`bg-white shadow-sm border-b h-16 flex items-center justify-between px-4 ${className}`}>
      <div className="flex items-center">
        {mobileMenuButton}
        <h1 className="text-xl font-semibold ml-2">Restaurant POS</h1>
      </div>
      <button
        onClick={onLogout}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Logout
      </button>
    </header>
  );
};

export default Topbar;