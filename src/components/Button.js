import React from "react";
import { Icon, Text } from "./";
import "../style/button.css";

export const Button = ({
  id,
  text,
  disabled,
  onClick,
  icon,
  classes,
  ...props
}) => {
  return (
    <div className={`button-wrapper ${classes["wrapper"] || ""}`}>
      <button
        className={`button ${classes["button"] || ""}`}
        {...props}
        onClick={(e) => onClick?.(e, { id, text })}
        disabled={disabled}
      >
        {icon && <Icon type={icon} />}
        <Text text={text} classes={`${classes["buttonText"] || ""}`} />
      </button>
    </div>
  );
};
