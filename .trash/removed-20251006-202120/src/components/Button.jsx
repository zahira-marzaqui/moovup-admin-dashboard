import React from "react";

export default function Button({
  children,
  variant = "default",
  className = "",
  ...rest
}) {
  const classes = ["btn"];
  if (variant === "primary") classes.push("primary");
  if (variant === "ghost") classes.push("ghost");
  if (className) classes.push(className);
  return (
    <button className={classes.join(" ")} {...rest}>
      {children}
    </button>
  );
}
