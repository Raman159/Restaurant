import React from "react";

interface OverlayProps {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const Overlay: React.FC<OverlayProps> = ({ onClick, className = "", children }) => (
  <div
    className={`fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-60 ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

export default Overlay; 