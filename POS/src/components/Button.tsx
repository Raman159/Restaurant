import React from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-black hover:bg-yellow-400 text-yellow-400 hover:text-black border border-black",
  secondary:
    "bg-yellow-400 hover:bg-black text-black hover:text-yellow-400 border border-yellow-400",
  danger: "bg-red-600 hover:bg-red-700 text-white border border-red-600",
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => (
  <button
    className={`px-4 py-2 rounded font-semibold shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
