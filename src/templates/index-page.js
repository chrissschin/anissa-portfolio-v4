import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import ChemexImage from "../../static/img/chemex.jpg";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import ServicesButton from "../components/ServicesButton";
import { motion, useAnimation } from "framer-motion";

// eslint-disable-next-line
export const IndexPageTemplate = ({ galleryImages }) => {
  const [featureImage, setFeatureImage] = useState(
    galleryImages[0].images[0].childImageSharp.gatsbyImageData.images.fallback
      .src
  );
  const [linkNumber, setLinkNumber] = useState("01");
  const [imgLabel, setImgLabel] = useState(galleryImages[0].pageLinkText);
  const [shootDate, setShootDate] = useState(galleryImages[0].shootDate);

  const controls = useAnimation();
  useEffect(() => {
    controls.start("image");
  }, [controls]);

  const variants = {
    nav: {
      y: 0,
      opacity: 1,
      height: "100%",
      transition: {
        delay: 0.8,
        ease: [0.23, -0.05, 0.83, 1],
        default: { duration: 0.2 },
      },
    },
    showing: {
      y: 0,
      opacity: 1,
      height: "100%",
      transition: {
        delay: 0.4,
        ease: [0.23, -0.05, 0.83, 1],
        default: { duration: 0.2 },
      },
    },
    textShowing: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 1.4,
        ease: [0.23, -0.05, 0.83, 1],
        default: { duration: 0.3 },
      },
    },
    textBoxShow: {
      y: 0,
      opacity: 0.9,
      transition: {
        delay: 1.4,
        ease: [0.23, -0.05, 0.83, 1],
        default: { duration: 0.3 },
      },
    },
    label: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.8,
        ease: [0.23, -0.05, 0.83, 1],
        default: { duration: 0.2 },
      },
    },
    image: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 1.4,
        ease: [0.23, -0.05, 0.83, 1],
        default: { duration: 0.2 },
      },
    },
    imageSecond: {
      height: "100%",
      y: 0,
      transition: {
        delay: 1.7,
        type: "spring",
        damping: 30,
        mass: 0.8,
        stiffness: 200,
      },
    },
  };

  const galleryLength =
    galleryImages.length < 10
      ? `0${galleryImages.length}`
      : galleryImages.length;

  return (
    <div className="home grid">
      <div className="nav-cont" style={{ overflow: "hidden" }}>
        <motion.div initial={{ y: 300 }} animate="nav" variants={variants}>
          <Navbar />
        </motion.div>
      </div>

      <div className="btn-services" style={{ overflow: "hidden", height: 55 }}>
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate="nav"
          variants={variants}
        >
          <ServicesButton />
        </motion.div>
      </div>

      <div className="intro-text-cont">
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate="textBoxShow"
          variants={variants}
        >
          <p className="mb-0">
            Lorem ipsum text to go here random. The random text goes here
            description. The green juice mixed with apples. Brown pots.
          </p>
        </motion.div>
      </div>

      <div className="img-linker-container">
        <motion.div
          initial={{ opacity: 0 }}
          animate="textShowing"
          variants={variants}
        >
          <span className="u-line">Work</span>

          {/* IMAGE LINKER  */}
          {
            galleryImages.map((i, index) => <IndexPageLink 
            key={index} 
            index={index} 
            linkText={i.pageLinkText} 
            linkTo={i.pageLink} 
            shootDate={i.shootDate}
            setLinkNumber={setLinkNumber}
            setFeatureImage={setFeatureImage}
            setImgLabel={setImgLabel}
            setShootDate={setShootDate}
            imgLink={i.images[0].childImageSharp.gatsbyImageData.images.fallback.src}/>) /* prettier-ignore */
          }
        </motion.div>
      </div>

      <div className="home-link-counter">
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate="label"
          variants={variants}
        >
          <span>
            {linkNumber}/ {galleryLength}
          </span>
        </motion.div>
      </div>

      {/* image based on link */}
      <IndexPageMainImage
        controls={controls}
        variants={variants}
        featureImage={featureImage}
        imgLabel={imgLabel}
        shootDate={shootDate}
      />

      <div className="home-socials">
        <motion.img
          alt="test"
          src="https://via.placeholder.com/20"
        ></motion.img>
        <img alt="test" src="https://via.placeholder.com/20"></img>
      </div>

      <motion.div
        className="dash-top-right"
        initial={{ height: 0 }}
        animate={{
          height: `100%`,
        }}
        transition={{
          ease: [0.87, -0.05, 0.43, 1],
          default: { duration: 1.1 },
        }}
      ></motion.div>
      <motion.div
        className="dash-btm-left"
        initial={{ height: 0, y: 80 }}
        animate={{
          y: 0,
          height: `50%`,
        }}
        transition={{
          ease: [0.87, -0.05, 0.43, 1],
          default: { duration: 1.1 },
        }}
      ></motion.div>
    </div>
  );
};

// the link
export const IndexPageLink = ({
  linkText,
  linkTo,
  imgLink,
  index,
  shootDate,
  setLinkNumber,
  setFeatureImage,
  setShootDate,
  setImgLabel,
}) => {
  const linkEl = useRef(null);

  const handleMouseEnter = (i) => {
    console.log(linkEl);
    setLinkNumber(index + 1 < 10 ? `0${index + 1}` : index + 1);
    setFeatureImage(imgLink);
    setImgLabel(linkText);
    setShootDate(shootDate);
  };

  return (
    <Link onMouseEnter={handleMouseEnter} ref={linkEl} to={linkTo}>
      {linkText}
    </Link>
  );
};

// the main image
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
            src={featureImage !== null ? featureImage : ChemexImage}
          />
        </motion.div>
      </div>
    </div>
  );
};

IndexPageTemplate.propTypes = {
  galleryImages: PropTypes.any,
};

const IndexPage = ({ data }) => {
  const detailPages = data.allMarkdownRemark.edges.filter((i) => {
    return i.node.frontmatter.templateKey === "detail-page";
  });
  const galleryImages = detailPages.map((g) => {
    return {
      shootDate: g.node.frontmatter.date,
      pageLink: g.node.fields.slug,
      pageLinkText: g.node.frontmatter.title,
      images: g.node.frontmatter.galleryImages,
    };
  });
  return (
    <Layout>
      <IndexPageTemplate galleryImages={galleryImages} />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            templateKey
            title
            date(formatString: "L")
            galleryImages {
              childImageSharp {
                gatsbyImageData(quality: 100, layout: FULL_WIDTH)
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
