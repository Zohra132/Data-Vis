// StackButton.jsx
import React from "react";

const Button = ({ onClick, disabled, children, className = "" }) => {
  const baseClasses = "rounded w-32 h-12 shrink-0 transition shadow-md hover:-translate-y-1";
  const enabledClasses = "bg-[#fae0e4] hover:bg-[#f5c7cc] cursor-pointer";
  const disabledClasses = "bg-[#cba6a9] cursor-not-allowed";

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`${baseClasses} ${disabled ? disabledClasses : enabledClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
