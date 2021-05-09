import "../style/icon.css";

export const Icon = ({ classes = {}, icon, onClick, ...props }) => {
  return (
    <span
      className={`display-flex flex-align-center flex-center ${classes.wrapper}`}
      onClick={(e) => onClick?.(e)}
    >
      <i className={`icon fas ${icon}`} {...props}></i>
    </span>
  );
};
