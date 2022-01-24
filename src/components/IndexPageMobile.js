import React from "react";
import { Link } from "gatsby";
import Navbar from "./Navbar";
import ServicesButton from "./ServicesButton";
import SocialsComponent from "./SocialsComponent";
import { motion } from "framer-motion";

export const IndexMainImageMobile = ({ imgSrc, linkTo, shootTitle }) => {
  return (
    <div className="detail-image--container">
      <Link to={linkTo}>
        <Link className="shoot-title" to={linkTo}>
          {shootTitle}
        </Link>
        <img src={imgSrc}></img>
      </Link>
    </div>
  );
};

export const IndexPageMobile = ({ galleryImages, aboutDescription }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        ease: [0.87, -0.05, 0.43, 1],
        default: { duration: 0.3 },
      }}
    >
      <motion.div
        className="nav-container--mobile"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          ease: [0.87, -0.05, 0.43, 1],
          default: { duration: 0.6 },
        }}
      >
        <Navbar />
        <div className="btn-services">
          <ServicesButton />
        </div>
      </motion.div>
      <p className="about-text--mobile">{aboutDescription}</p>
      <div className="index-container--mobile">
        {
          galleryImages.map((i, index) => <IndexMainImageMobile 
            key={index} 
            linkTo={i.pageLink} 
            shootTitle={i.pageLinkText}
            imgSrc={i.images[0].childImageSharp.gatsbyImageData.images.fallback.src}/>) /* prettier-ignore */
        }
      </div>
      <SocialsComponent />
    </motion.div>
  );
};

export default IndexPageMobile;
