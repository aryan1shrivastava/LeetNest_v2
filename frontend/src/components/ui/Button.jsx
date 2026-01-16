import React from "react";
import { Loader } from "lucide-react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]";

  const variants = {
    primary:
      "bg-green-600 hover:bg-green-500 text-white focus:ring-green-500 shadow-lg shadow-green-500/20 hover:shadow-green-500/30",
    secondary:
      "bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 border border-gray-700/50 focus:ring-gray-500 shadow-lg shadow-gray-900/20 hover:shadow-gray-900/30 backdrop-blur-sm",
    danger:
      "bg-red-600 hover:bg-red-500 text-white focus:ring-red-500 shadow-lg shadow-red-500/20 hover:shadow-red-500/30",
    ghost:
      "bg-transparent hover:bg-gray-800/50 text-gray-300 focus:ring-gray-500 hover:shadow-lg hover:shadow-gray-900/20 backdrop-blur-sm",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-4 py-2 text-base gap-2",
    lg: "px-6 py-3 text-lg gap-2.5",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader className="w-4 h-4 animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
