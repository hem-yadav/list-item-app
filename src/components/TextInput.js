import React from "react";
import { Icon } from "../components";
import "../style/textInput.css";

export const TextInput = ({
  classes,
  handleChange,
  icon,
  label,
  inputProps = {},
  meta = {},
}) => {
  const inputChangeListener = (e) => {
    const value =
      inputProps.type === "number" ? Number(e.target.value) : e.target.value;
    handleChange?.(e, { value, ...meta });
  };

  return (
    <div
      className={`text-input-wrapper flex-column black-bg ${classes?.["inputWrapper"]}`}
    >
      {label ? <label className={`text-input-label`}>{label}</label> : null}
      <label className={"padding-m display-flex flex-center"}>
        {icon && <Icon icon={icon} />}
        <input
          className={`white-color padding-vertical-s padding-horizontal-m  ${classes?.["input"]}`}
          onChange={inputChangeListener}
          {...inputProps}
        />
      </label>
    </div>
  );
};
