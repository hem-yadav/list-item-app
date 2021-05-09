import { category } from "../../mock/category";

export const getCategoryConfig = () =>
  Object.values(
    category.reduce((result, i) => {
      result[i.category] = { id: i.category, text: i.category };
      return result;
    }, {})
  );
