export const getSearchFilter = (state) => state.filter.searchFilter || {};
export const getCategoryList = (state) => state.category.categoryList || [];
export const getPriceFilter = (state) => state.filter.priceFilter;
export const getCategoryFilter = (state) => state.filter.categoryFilter;
export const getSelectedItems = (state) => state.category.selectedItems || {};
