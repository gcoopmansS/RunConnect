import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  ...props
}) => {
  const base =
    "px-6 py-2 rounded-xl font-semibold shadow hover:scale-105 transition";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
      : "bg-gray-200 text-gray-700";
  return (
    <button className={`${base} ${styles}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
