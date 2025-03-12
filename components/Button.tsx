import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  fullWidth = false,
  children,
  className = "",
  ...props
}) => {
  const baseStyles = "h-12 text-sm font-semibold rounded-lg cursor-pointer transition-all duration-300";
  const variantStyles = {
    primary: "bg-amber-500 hover:bg-amber-600 text-white shadow-sm",
    secondary: "bg-white hover:bg-gray-50 text-gray-900 border border-gray-200",
  };
  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
