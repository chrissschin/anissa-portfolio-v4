import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import HomeImage from "../img/home.jpeg";
import ChemexImage from "../../static/img/chemex.jpg";

import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import ServicesButton from "../components/ServicesButton";
import { motion, useAnimation } from "framer-motion";

// eslint-disable-next-line
export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
}) => {
  // const [currentDetailLink, setCurentDetailLink] = useState(detailLinks[0])
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

      {/* links with images that go to detail page */}

      {/* what we'll do is pass the same object for links and img */}
      {/* set first link as showImgForthisLink to true */}
      {/* when user hovers on next link, we set that link to true,  */}
      <div className="img-linker-container">
        <motion.div
          initial={{ opacity: 0 }}
          animate="textShowing"
          variants={variants}
        >
          <span className="u-line">Work</span>
          <a href="#">Some Text About Long</a>
          <a href="#">Steward Lewsih </a>
          <a href="#">Dundler Foo </a>
          <a href="#">James Foo </a>
          <a href="#">Foolette Foo </a>
        </motion.div>
      </div>

      <div className="home-link-counter">
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate="label"
          variants={variants}
        >
          <span>03/ 05</span>
        </motion.div>
      </div>

      {/* image based on link */}
      <div className="home-img-container">
        <div className="home-img" style={{ overflow: "hidden" }}>
          <motion.div
            className="img-info"
            initial={{ opacity: 0, y: 4 }}
            animate="label"
            variants={variants}
          >
            <span>Mountain View</span>
            <span>12/20/20</span>
          </motion.div>
          <motion.div
            style={{ overflow: "hidden" }}
            initial={{ y: -2, opacity: 0 }}
            animate={controls}
            variants={variants}
            className="img-switch img-responsive"
          >
            <img className="img-responsive" alt="test" src={ChemexImage} />
          </motion.div>
        </div>
      </div>

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

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                gatsbyImageData(width: 240, quality: 64, layout: CONSTRAINED)
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`;
