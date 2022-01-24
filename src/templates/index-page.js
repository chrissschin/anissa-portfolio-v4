import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import ServicesButton from "../components/ServicesButton";
import { motion, useAnimation } from "framer-motion";
import { useBreakpoint } from "gatsby-plugin-breakpoints";
import IndexPageMobile from "../components/IndexPageMobile";
import IndexPageLink from "../components/IndexPageLink";
import IndexPageMainImage from "../components/IndexPageMainImage";
import SocialsComponent from "../components/SocialsComponent";

// eslint-disable-next-line
export const IndexPageTemplate = ({ galleryImages, aboutDescription }) => {
  const [featureImage, setFeatureImage] = useState(
    galleryImages[0].images[0].childImageSharp.gatsbyImageData.images.fallback
      .src
  );
  const [linkNumber, setLinkNumber] = useState("01");
  const [imgLabel, setImgLabel] = useState(galleryImages[0].imgLabel);
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
          <p className="mb-0">{aboutDescription}</p>
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
            imgLabel={i.imgLabel}
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

      <SocialsComponent />

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
  galleryImages: PropTypes.any,
};

const IndexPage = ({ data }) => {
  const breakpoints = useBreakpoint();

  const detailPages = data.allMarkdownRemark.edges.filter((i) => {
    return i.node.frontmatter.templateKey === "detail-page";
  });
  const galleryImages = detailPages.map((g) => {
    return {
      shootDate: g.node.frontmatter.date,
      pageLink: g.node.fields.slug,
      pageLinkText: g.node.frontmatter.title,
      imgLabel: g.node.frontmatter.homeImageLabel,
      images: g.node.frontmatter.galleryImages,
    };
  });

  const aboutDescription = data.allMarkdownRemark.edges.filter((i) => {
    return i.node.frontmatter.templateKey === "index-page";
  })[0].node.frontmatter.description;

  console.log(galleryImages);

  return (
    <Layout>
      {breakpoints.sm ? (
        <IndexPageMobile
          galleryImages={galleryImages}
          aboutDescription={aboutDescription}
        />
      ) : (
        <IndexPageTemplate
          galleryImages={galleryImages}
          aboutDescription={aboutDescription}
        />
      )}
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
            homeImageLabel
            description
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
