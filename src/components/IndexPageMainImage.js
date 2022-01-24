import React from "react";
import { motion } from "framer-motion";

export const IndexPageMainImage = ({
  featureImage,
  variants,
  imgLabel,
  controls,
  shootDate,
}) => {
  return (
    <div className="home-img-container">
      <div className="home-img" style={{ overflow: "hidden" }}>
        <motion.div
          className="img-info"
          initial={{ opacity: 0, y: 4 }}
          animate="label"
          variants={variants}
        >
          <span>{imgLabel}</span>
          <span>{shootDate}</span>
        </motion.div>
        <motion.div
          style={{ overflow: "hidden" }}
          initial={{ y: -2, opacity: 0 }}
          animate={controls}
          variants={variants}
          className="img-switch img-responsive"
        >
          <img
            className="img-responsive"
            alt="test"
            src={featureImage !== null ? featureImage : ""}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default IndexPageMainImage;
