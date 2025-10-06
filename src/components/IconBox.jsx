import React from "react";
import PropTypes from "prop-types";

/**
 * IconBox
 * - Renders a small rounded square (or circle) with a pastel background and an icon inside.
 * - Accepts Tailwind utility classes via `className` to match existing layout (e.g., `w-10 h-10`).
 * - `variant` chooses the color in light mode (pink, blue, green, purple, yellow, gray).
 * - In dark mode the project's `dark-mode.css` keeps the pastel background while recoloring the SVG via CSS rules.
 */
export default function IconBox({
  children,
  variant = "pink",
  size = "w-10 h-10",
  rounded = "rounded-md",
  className = "",
  title = "",
  iconColor, // optional override class for the icon (e.g. 'text-pink-500')
}) {
  // Map variant -> Tailwind pastel background class used in this project
  const variantBg = {
    pink: "bg-pink-50",
    blue: "bg-blue-50",
    green: "bg-green-50",
    purple: "bg-purple-50",
    yellow: "bg-yellow-50",
    orange: "bg-orange-50",
    gray: "bg-gray-100",
  };

  const bgClass = variantBg[variant] || variantBg.pink;

  // Map variant -> Tailwind text color for the icon
  const variantIconColor = {
    pink: "text-pink-600",
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
    yellow: "text-yellow-400",
    orange: "text-orange-400",
    gray: "text-gray-700",
  };

  const icoClass =
    iconColor || variantIconColor[variant] || variantIconColor.pink;

  // We intentionally do not set icon color here. The project's CSS will apply the
  // correct stroke/fill for both light and dark modes when the SVG is placed inside.
  return (
    <div
      role={title ? "img" : undefined}
      aria-label={title || undefined}
      className={`${size} ${bgClass} ${rounded} inline-flex items-center justify-center ${className}`}
    >
      {React.isValidElement(children)
        ? React.cloneElement(children, {
            className: `${
              children.props.className ? children.props.className + " " : ""
            }${icoClass} icon-current`,
          })
        : children}
    </div>
  );
}

IconBox.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf([
    "pink",
    "blue",
    "green",
    "purple",
    "yellow",
    "orange",
    "gray",
  ]),
  size: PropTypes.string,
  rounded: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
  iconColor: PropTypes.string,
};
