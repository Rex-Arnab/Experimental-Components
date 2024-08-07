import React from "react";
import PropTypes from "prop-types";
import { BiLoader } from "react-icons/bi";

const Button = ({
  label,
  onClick,
  variant = "default",
  customStyles = "",
  disabled = false,
  loading = false,
  size = "medium",
  icon: Icon
}) => {
  const baseStyles =
    "flex items-center justify-center rounded focus:outline-none transition duration-200";

  const variantStyles = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    outline:
      "border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
    ghost: "bg-transparent text-blue-500 hover:bg-blue-100"
  };

  const sizeStyles = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg"
  };

  const appliedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${customStyles}`;

  return (
    <button
      className={appliedStyles}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}>
      {loading ? (
        <BiLoader className="animate-spin" />
      ) : (
        <>
          {Icon && <Icon className="mr-2" />} {/* Render icon if provided */}
          {label}
        </>
      )}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["default", "outline", "ghost"]),
  customStyles: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  icon: PropTypes.elementType
};

export default Button;
