import React, { useState } from "react";
import { Icon, TextInput } from ".";
import "../style/searchBar.css";

export const SearchBar = React.memo(
  ({
    classes = {},
    textInputListener,
    searchIconListener,
    backIconListener,
    filterIconListener,
  }) => {
    const [isActive, setActiveState] = useState(false);
    const { searchBarWrapper = "" } = classes;
    const wrapperClasses =
      searchBarWrapper +
      (isActive ? " active" : " black-bg padding-vertical-m");

    const backListener = () => {
      setActiveState(false);
      backIconListener?.({ isActive: false });
    };

    const searchListener = () => {
      setActiveState(true);
      searchIconListener?.({ isActive: true });
    };

    const filterListener = () => {
      filterIconListener?.({ isFilter: true, isActive });
    };

    return (
      <div className={`search-bar ${wrapperClasses}`}>
        {isActive ? (
          <>
            <Icon onClick={backListener} icon="fa-arrow-left" />
            <TextInput
              {...{ handleChange: textInputListener }}
              inputProps={{
                placeholder: "Search in title, price, description...",
              }}
              classes={{ inputWrapper: "margin-horizontal-m" }}
            />
            <Icon onClick={filterListener} icon="fa-filter" />
          </>
        ) : (
          <Icon
            onClick={searchListener}
            classes={{ wrapper: "flex-1" }}
            icon="fa-search"
          />
        )}
      </div>
    );
  }
);
