import React from "react";
import { Button, Text } from "../../components";
import { Filter } from ".";
import { useDispatch } from "react-redux";
import { SET_CATEGORY_SEARCH } from "../../actions/constants";

export const CategoryFilter = React.memo(
  ({ categoryFilter, matchingCount = 0, categoryFilterConfig = [] }) => {
    const dispatch = useDispatch();

    const filterListener = ({ id = "" }) => {
      dispatch({
        type: SET_CATEGORY_SEARCH,
        value: { categoryId: id },
      });
    };

    return (
      <>
        {categoryFilter && (
          <Text
            text={`${matchingCount} product${
              matchingCount > 1 ? "s" : ""
            } found`}
            classes={`divider padding-bottom-l`}
          />
        )}
        <Filter
          parentFilter={categoryFilter}
          isParentControlled
          config={categoryFilterConfig}
          filterListener={filterListener}
          isActiveClasses={{ button: "white-bg", buttonText: "black-color" }}
          classes={{
            buttonText: "text-weight-bold",
          }}
        />
        {categoryFilter && (
          <Button
            text="Clear 1 category filter"
            classes={{
              wrapper: `margin-top-m display-flex flex-center`,
              button: `no-background`,
              buttonText: `blue-color`,
            }}
            onClick={filterListener}
          />
        )}
      </>
    );
  }
);
