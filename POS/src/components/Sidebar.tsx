import React, { useState } from "react";

interface SidebarItem {
  label: string;
  key: string;
  icon?: React.ReactNode;
  sub?: { label: string; key: string }[];
}

interface SidebarProps {
  items: SidebarItem[];
  selected: { parent: string; child: string };
  onSelect: (parentKey: string, childKey: string) => void;
  className?: string;
  userName?: string;
  userAvatar?: string;
  userRole?: string;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  items,
  selected,
  onSelect,
  className,
  userName = "Admin",
  userAvatar = "https://randomuser.me/api/portraits/men/75.jpg",
  userRole = "Administrator",
  onLogout,
}) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (key: string) => {
    setExpandedItems((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    );
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-80 bg-linear-to-b from-gray-900 via-gray-900 to-black z-50 shadow-none border-r border-gray-800 overflow-y-auto flex flex-col pr-6 ${className || ""}`}
    >
      {/* Sidebar header: logo + Track MySchool Bus */}
      <div className="flex flex-col items-center justify-center p-4 border-b border-gray-800 h-20">
        <img
          src="https://img.icons8.com/color/48/restaurant.png"
          alt="Restaurant Logo"
          className="w-10 h-10 mb-1"
        />
        <span className="text-white text-base font-bold tracking-wide text-center">
          Restaurant Admin
        </span>
      </div>

      {/* Navigation (scrollable if needed) */}
      <nav className="p-2 space-y-1 flex-1 min-h-0">
        {items.map((item) => (
          <div key={item.key} className="space-y-0.5">
            <button
              onClick={() => {
                if (item.sub) {
                  toggleExpanded(item.key);
                } else {
                  onSelect(item.key, item.key);
                }
              }}
              className={`w-full flex items-center justify-between px-2 py-2 rounded-lg transition-all duration-200 group ${
                selected.parent === item.key
                  ? "bg-linear-to-r from-yellow-400 to-yellow-500 text-black shadow-md shadow-yellow-400/20"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <div className="flex items-center space-x-2">
                {item.icon && (
                  <span
                    className={`text-base transition-colors ${selected.parent === item.key ? "text-black" : "text-yellow-400"}`}
                  >
                    {item.icon}
                  </span>
                )}
                <span className="font-medium truncate">{item.label}</span>
              </div>
              {item.sub && (
                <span
                  className={`transition-transform duration-200 ${expandedItems.includes(item.key) ? "rotate-90" : ""}`}
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              )}
            </button>
            {/* Submenu */}
            {item.sub && (
              <div
                className={`overflow-hidden transition-all duration-300 ${expandedItems.includes(item.key) ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="ml-4 space-y-0.5 border-l-2 border-gray-700 pl-2">
                  {item.sub.map((subItem) => (
                    <button
                      key={subItem.key}
                      onClick={() => onSelect(item.key, subItem.key)}
                      className={`w-full flex items-center space-x-2 px-2 py-1 rounded-md transition-all duration-200 text-left truncate ${
                        selected.child === subItem.key
                          ? "bg-yellow-400/20 text-yellow-400 border-l-2 border-yellow-400"
                          : "text-gray-400 hover:bg-gray-800 hover:text-white"
                      }`}
                    >
                      <span className="text-xs">•</span>
                      <span className="font-medium truncate">
                        {subItem.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Sidebar footer: admin profile */}
      <div className="mt-auto px-3 pb-3 pt-2">
        <div className="flex items-center space-x-3 bg-linear-to-r from-yellow-400/10 to-yellow-500/10 border border-yellow-400/20 rounded-lg p-2">
          <img
            src={userAvatar}
            alt={userName}
            className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600"
          />
          <div className="flex-1 min-w-0">
            <p
              className="font-semibold text-white truncate"
              style={{ fontSize: "16px" }}
            >
              {userName}
            </p>
            <p className="text-gray-400 truncate" style={{ fontSize: "16px" }}>
              {userRole}
            </p>
          </div>
          {onLogout && (
            <button
              onClick={onLogout}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
              title="Logout"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
