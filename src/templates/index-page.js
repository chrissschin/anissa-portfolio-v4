import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import HomeImage from "../img/home.jpeg";

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
  const controls = useAnimation();

  useEffect(() => {
    controls.start("image");
    controls.start("imageSecond");
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

      <div className="btn-services" style={{ overflow: "hidden", height: 50 }}>
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
          animate="textShowing"
          variants={variants}
        >
          <p>
            Lorem ipsum text to go here random. The random text goes here
            description. Lorem ipsum text to go here random. The random text
            goes here description.
          </p>
        </motion.div>
      </div>

      <div className="img-linker-container">
        <motion.div
          className="txt-r"
          initial={{ opacity: 0 }}
          animate="textShowing"
          variants={variants}
        >
          <span className="u-line">WORK</span>
          <a href="#">Some Text About Long</a>
          <a href="#">Chris Pratt</a>
          <a href="#">Christian</a>
          <a href="#">Jesus</a>
          <a href="#">Some Text About</a>
          <a href="#">Chris Pratt</a>
          <a href="#">Christian</a>
          <a href="#">Jesus</a>
        </motion.div>
      </div>

      <div className="home-link-counter">
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate="label"
          variants={variants}
        >
          <span>03/ 13</span>
        </motion.div>
      </div>

      <div className="home-img-container">
        <div className="home-img" style={{ overflow: "hidden" }}>
          <motion.div
            className="img-info"
            initial={{ opacity: 0, y: 4 }}
            animate="label"
            variants={variants}
          >
            <span>NAME NAME</span>
            <span>12/20/20</span>
          </motion.div>
          <motion.div
            style={{ overflow: "hidden" }}
            initial={{ y: -2, height: "6%", opacity: 0 }}
            animate={controls}
            variants={variants}
            className="img-switch img-responsive"
          >
            <img className="img-responsive" alt="test" src={HomeImage} />
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
        initial={{ height: 0, y: 180 }}
        animate={{
          y: 0,
          height: `100%`,
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
