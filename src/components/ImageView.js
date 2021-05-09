import React, { useState } from "react";
import errorImage from "../assets/error.png";
import loader from "../assets/loader.gif";
import "../style/image.css";

export const ImageView = React.memo(({ url, error, updateEventListener }) => {
  const [image, setImage] = useState(loader);

  const onImageLoad = () => {
    if (!error) {
      updateEventListener?.({ ready: true, error: false });
      setImage(url);
    }
  };

  const onImageError = () => {
    updateEventListener?.({ ready: false, error: true });
  };

  return (
    <img
      alt=""
      onLoad={onImageLoad}
      onError={onImageError}
      className={`${error ? "error padding-m" : ""}`}
      src={error ? errorImage : image}
    />
  );
});
