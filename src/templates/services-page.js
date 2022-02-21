import React, { useRef } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import { motion } from "framer-motion";
import SocialsComponent from "../components/SocialsComponent";
import "../css/locomotive-scroll.css";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";

// eslint-disable-next-line
export const ServicesPageTemplate = ({ content }) => {
  const frontmatter = content.frontmatter;
  const ctaText = content.frontmatter.ctaText;
  const btnCtaText = content.frontmatter.bottomCtaButtonText;
  const btnLabelText = content.frontmatter.btnLabelText
    ? content.frontmatter.btnLabelText
    : "dummy text";
  const firstRowImage = getImage(frontmatter.firstRow.rightColImage);
  const secondRowImage = getImage(frontmatter.secondRow.leftColImage);
  const thirdRowImage = getImage(frontmatter.thirdRow.rightColImage);

  const variants = {
    servicesCont: {
      opacity: 1,
      y: 0,
      transition: {
        ease: [0.87, -0.05, 0.43, 1],
        default: { duration: 0.6 },
      },
    },
    servicesCont2: {
      opacity: 1,
      y: 0,
      transition: {
        ease: [0.87, -0.05, 0.43, 1],
        default: { duration: 0.3 },
      },
    },
  };

  return (
    <motion.div
      data-scroll
      className="services-page"
      initial={{ opacity: 0, y: 20 }}
      variants={variants}
      animate="servicesCont"
    >
      <motion.div
        variants={variants}
        animate="servicesCont2"
        initial={{ opacity: 0, y: 120 }}
      >
        <h1 data-scroll data-scroll-speed="-1">
          Services
        </h1>
      </motion.div>
      <div className="home-link">
        <Link to="/">HOME</Link>
        <div className="socials">
          <SocialsComponent />
        </div>
      </div>
      <section className="services-container">
        <div className="services-row-a">
          <div className="col-txt">
            <p>{frontmatter.firstRow.leftColText}</p>
          </div>
          <div className="col-img" data-scroll data-scroll-speed="1">
            <GatsbyImage
              image={firstRowImage}
              alt={frontmatter.firstRow.rightColImage.name}
            />
          </div>
          <div className="dash-lft"></div>
        </div>

        <div className="services-row-b">
          <div className="col-img">
            <GatsbyImage
              image={secondRowImage}
              alt={frontmatter.secondRow.leftColImage.name}
            />
          </div>

          <div className="col-txt">
            <p>{frontmatter.secondRow.rightColText}</p>
          </div>
          <div className="dash-rght"></div>
        </div>

        <div className="services-row-a">
          <div className="col-txt">
            <p>{frontmatter.secondRow.rightColText}</p>
          </div>
          <div className="col-img">
            <GatsbyImage
              image={thirdRowImage}
              alt={frontmatter.thirdRow.rightColImage.name}
            />
          </div>
        </div>

        {/* footer */}

        <div className="services-footer">
          <div className="services-footer-content">
            <h2>{ctaText}</h2>
            <div className="footer-cta">
              <p className="cta-txt">{btnLabelText}</p>
              <button>{btnCtaText}</button>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

ServicesPageTemplate.propTypes = {
  content: PropTypes.any,
};

const ServicesPage = ({ data }) => {
  const { markdownRemark: content } = data;
  const containerRef = useRef(null);
  return (
    <Layout>
      <LocomotiveScrollProvider
        options={{
          smooth: true,
          lerp: 0.15,
          multiplier: 0.9,
          reloadOnContextChange: true,
        }}
        containerRef={containerRef}
      >
        <main data-scroll-container ref={containerRef} id="stick">
          <ServicesPageTemplate data-scroll-section content={content} />
        </main>
      </LocomotiveScrollProvider>
    </Layout>
  );
};

ServicesPage.propTypes = {
  data: PropTypes.any,
};

export default ServicesPage;

export const servicesPageQuery = graphql`
  query ServicesPage {
    markdownRemark(frontmatter: { templateKey: { eq: "services-page" } }) {
      frontmatter {
        bottomCtaButtonText
        ctaText
        btnLabelText
        firstRow {
          leftColText
          rightColImage {
            childImageSharp {
              gatsbyImageData(quality: 100)
            }
            name
          }
        }
        bottomCtaButtonText
        secondRow {
          rightColText
          leftColImage {
            childImageSharp {
              gatsbyImageData(quality: 100)
            }
            name
          }
        }
        thirdRow {
          leftColText
          rightColImage {
            childImageSharp {
              gatsbyImageData(quality: 100)
            }
            name
          }
        }
      }
    }
  }
`;
