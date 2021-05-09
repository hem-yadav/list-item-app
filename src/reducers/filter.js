import {
  HANDLE_PRICE_POPUP,
  SEARCH_ICON_CLICKED,
  SET_CATEGORY_SEARCH,
  SET_PRICE_FILTER,
  SET_SEARCH_TEXT,
} from "../actions/constants";

const initialState = {
  priceFilter: { filter: 1 },
};

export const filter = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_TEXT: {
      const searchText = action.value.searchText.toLowerCase();
      return {
        ...state,
        searchFilter: searchText
          ? {
              keysToBeSearched: ["description", "name"],
              value: searchText,
            }
          : {},
      };
    }
    case SET_CATEGORY_SEARCH: {
      const { categoryId } = action.value;
      return {
        ...state,
        categoryFilter: categoryId,
      };
    }
    case SET_PRICE_FILTER: {
      return {
        ...state,
        priceFilter: { ...state.priceFilter, ...action.value },
      };
    }
    case SEARCH_ICON_CLICKED:
      const { isSearchBarActive } = action.value;
      return { ...state, isSearchBarActive };
    case HANDLE_PRICE_POPUP:
      const { openPriceFilter } = action.value;
      return { ...state, openPriceFilter };
    default:
      return state;
  }
};
