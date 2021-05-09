import React from "react";
import "../style/checkbox.css";
import { Text } from "./Text";

export const Checkbox = ({ checked, classes, label = "", name, onChange }) => {
  const handleChange = (event, { label, name }) => {
    onChange?.(event, { checked: event.target.checked, label, name });
  };

  return (
    <label className={`display-flex flex-align-center ${classes?.["wrapper"]}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(ev) =>
          handleChange(ev, {
            label,
            name,
          })
        }
      />
      {label && <Text classes={`margin-left-m`} text={label} />}
    </label>
  );
};
