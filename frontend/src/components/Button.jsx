// StackButton.jsx
import React from "react";

const Button = ({ onClick, disabled, children, className = "" }) => {
  const baseClasses = "rounded w-32 h-12 shrink-0 transition shadow-md hover:-translate-y-1 text-black  hover:[box-shadow:_0_0_20px_#F58CCD]";
  const enabledClasses = "bg-[#F7B2DD] hover:bg-[#FA9BD7] cursor-pointer";
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
