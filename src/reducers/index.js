import { combineReducers } from "redux";
import { category } from "./category";
import { filter } from "./filter";

const rootReducer = combineReducers({
  category,
  filter,
});
export default rootReducer;
