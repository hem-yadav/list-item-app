import { Icon, Text } from ".";

export const Price = ({ price, classes = {} }) => {
  return (
    <div className={`price display-flex flex-align-center ${classes}`}>
      <Icon icon={`${classes.icon || "fa-rupee-sign"} icon-xs`} />
      <Text text={price} classes={`${classes.price} margin-left-s`} />
    </div>
  );
};
