export const areObjectsEqual = (obj1 = {}, obj2 = {}) => {
  let ret = Object.keys(obj1).length === Object.keys(obj2).length;
  ret &&
    (ret = !Object.keys(obj1).find((key) => {
      if (typeof obj1[key] === "object") {
        if (typeof obj2[key] !== "object") {
          return true;
        }
        return !areObjectsEqual(obj1[key], obj2[key]);
      }
      return obj1[key] !== obj2[key];
    }));

  return ret;
};
