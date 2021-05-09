import React from "react";

export const List = ({ data, content }) => {
  return (
    <div className={`flex-column`}>
      {data.map((d) => (
        <div className={`display-flex flex-center margin-top-xl`} key={d.name}>
          {content?.({ data: d })}
        </div>
      ))}
    </div>
  );
};
