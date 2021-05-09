import React, { useState } from "react";
import { Button } from "../../components";

export const Filter = React.memo(
  ({
    parentFilter,
    isParentControlled = false,
    config,
    filterListener,
    isActiveClasses,
    classes,
  }) => {
    const [filter, setFilter] = useState("");

    const handleClick = (e, { id }) => {
      !isParentControlled && setFilter(id);
      filterListener && filterListener({ id });
    };

    const getValue = () => {
      return isParentControlled ? parentFilter : filter;
    };

    const data = config.map((i, idx) => (
      <Button
        classes={{
          wrapper: `margin-top-l ${classes?.["buttonWrapper"]} ${
            idx < config.length - 1 ? "margin-right-m" : ""
          }`,
          button: `${classes?.["button"]} ${
            i.id === getValue() ? isActiveClasses?.["button"] : ""
          }`,
          buttonText: `capitalized ${classes?.["buttonText"]} ${
            i.id === getValue() ? isActiveClasses?.["buttonText"] : ""
          }`,
        }}
        key={i.id}
        id={i.id}
        text={i.text}
        onClick={handleClick}
      />
    ));

    return (
      <div className={`display-flex flex-wrap ${classes?.["wrapper"]}`}>
        {data}
      </div>
    );
  }
);
