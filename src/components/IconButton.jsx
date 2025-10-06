import React from "react";
import clsx from "clsx";

// IconButton: shows a small pastel box with an icon that adapts to theme
// Props:
// - Icon: React component (lucide-react or similar)
// - size: 'sm' | 'md' (defaults to sm)
// - className: extra classes
// - ariaLabel
export function IconButton({
  Icon,
  size = "sm",
  className = "",
  ariaLabel = "",
}) {
  const base = "inline-flex items-center justify-center icon-btn";
  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
  };

  // Use className to control bg color (bg-pink-50 etc) in usage sites so IconButton is generic
  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={clsx(base, sizes[size], "rounded-md shadow-sm", className)}
    >
      {Icon ? <Icon className="w-5 h-5 stroke-current fill-none" /> : null}
    </div>
  );
}

export default IconButton;
