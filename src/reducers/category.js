import {
  DELETE_LIST_ITEM,
  SET_ALL_CATEGORY,
  SET_CATEGORY_LIST,
  SET_CATEGORY_SELECTION,
  UPDATE_IMAGE_STATE,
} from "../actions/constants";

const initialState = {
  categoryList: [],
};

export const category = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY_LIST: {
      return { ...state, categoryList: action.value.category || [] };
    }
    case DELETE_LIST_ITEM: {
      return {
        ...state,
        categoryList: state.categoryList.filter(
          (i) => i.name !== action.value.name
        ),
      };
    }
    case SET_ALL_CATEGORY: {
      const { checked, categoryList } = action.value;
      return {
        ...state,
        selectedItems: checked
          ? categoryList.reduce((res, i) => {
              res[i.name] = i.name;
              return res;
            }, {})
          : {},
      };
    }
    case UPDATE_IMAGE_STATE: {
      const { ready, error, name } = action.value;
      const categoryList = [...state.categoryList];
      const index = categoryList.findIndex((i) => i.name === name);
      categoryList[index] = {
        ...categoryList[index],
        image: { ...categoryList[index].image, ready, error },
      };

      return { ...state, categoryList };
    }
    case SET_CATEGORY_SELECTION:
      const { name, checked } = action.value;
      const selectedItems = { ...state.selectedItems };
      checked ? (selectedItems[name] = name) : delete selectedItems[name];

      return {
        ...state,
        selectedItems,
        isAllCategorySelected: state.isAllCategorySelected && checked,
      };
    default:
      return state;
  }
};
