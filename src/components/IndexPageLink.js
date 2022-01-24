import React, { useRef } from "react";
import { Link } from "gatsby";

export const IndexPageLink = ({
  linkText,
  linkTo,
  imgLink,
  imgLabel,
  index,
  shootDate,
  setLinkNumber,
  setFeatureImage,
  setShootDate,
  setImgLabel,
}) => {
  const linkEl = useRef(null);

  const handleMouseEnter = (i) => {
    setLinkNumber(index + 1 < 10 ? `0${index + 1}` : index + 1);
    setFeatureImage(imgLink);
    setImgLabel(imgLabel);
    setShootDate(shootDate);
  };

  return (
    <Link onMouseEnter={handleMouseEnter} ref={linkEl} to={linkTo}>
      {linkText}
    </Link>
  );
};

export default IndexPageLink;
