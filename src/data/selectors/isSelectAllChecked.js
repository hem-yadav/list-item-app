import { createSelector } from "reselect";
import { getCategory } from ".";
import { getSelectedItems } from "../accessor";

export const isSelectAllChecked = createSelector(
  getCategory,
  getSelectedItems,
  (categoryList, selectedItems) =>
    !categoryList.find((i) => !selectedItems[i.name])
);
