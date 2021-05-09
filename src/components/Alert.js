import React from "react";
import { Text } from "./Text";
import "../style/alert.css";

export const Alert = ({ content, title }) => {
  return (
    <div className="popup-wrapper">
      <div className="popup">
        <Text text={title} classes={`black-color text-weight-bold`} />
        {content}
      </div>
    </div>
  );
};
