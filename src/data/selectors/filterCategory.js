import { createSelector } from "reselect";
import {
  getSearchFilter,
  getCategoryList,
  getPriceFilter,
  getCategoryFilter,
  getSelectedItems,
} from "../accessor";

const filterByPrice = (priceFilter, i) => {
  const { price, filter } = priceFilter;
  const from = price[0];
  const to = price[1];

  switch (filter) {
    case 2: {
      return (
        (i.discountedPrice || i.price) >= from &&
        (i.discountedPrice || i.price) <= to
      );
    }
    case 3: {
      return (i.discountedPrice || i.price) < from;
    }
    case 4: {
      return (i.discountedPrice || i.price) > from;
    }
    default:
      return (i.discountedPrice || i.price) === from;
  }
};

const filterCategory = (
  filter,
  categoryList,
  priceFilter = {},
  categoryFilter = "",
  selectedItems = {}
) => {
  const { keysToBeSearched, value } = filter;

  return categoryList.reduce((result, i) => {
    const isKeyValid =
      !keysToBeSearched ||
      keysToBeSearched.find((key) =>
        i[key].toLowerCase().includes(value.toLowerCase())
      );

    const categoryValid = !categoryFilter || i.category === categoryFilter;

    const isPriceValid =
      !priceFilter.price?.[0] || filterByPrice(priceFilter, i);

    isKeyValid &&
      categoryValid &&
      isPriceValid &&
      result.push({
        ...i,
        checked: !!selectedItems[i.name],
      });

    return result;
  }, []);
};

export const getCategory = createSelector(
  getSearchFilter,
  getCategoryList,
  getPriceFilter,
  getCategoryFilter,
  getSelectedItems,
  (filter, categoryList, priceFilter, categoryFilter, selectedItems) =>
    filterCategory(
      filter,
      categoryList,
      priceFilter,
      categoryFilter,
      selectedItems
    )
);
