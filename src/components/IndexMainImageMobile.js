import React, { Link } from "react";

export const IndexMainImageMobile = ({ imgSrc, linkTo, shootTitle }) => {
  return (
    <div className="detail-image--container">
      <Link to={linkTo}>
        <label>{shootTitle}</label>
        <img src={imgSrc}></img>
      </Link>
    </div>
  );
};

export default IndexMainImageMobile;
