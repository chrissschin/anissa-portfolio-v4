import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Leni2 from "../../static/img/leni2.png";
import Leni from "../../static/img/leni.png";
import Leni3 from "../../static/img/leni3.png";
import { Link } from "gatsby";
import { motion } from "framer-motion";
import SocialsComponent from "../components/SocialsComponent";
import "../css/locomotive-scroll.css";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";

// eslint-disable-next-line
export const ServicesPageTemplate = ({}) => {
  const loremIpsum =
    "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC,";

  // apply a spring to ease the result
  const [isFixed] = useState(true);
  const homeLink = useRef(null);

  const handleScroll = () => {};

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.div
      className="services-page"
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
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          ease: [0.87, -0.05, 0.43, 1],
          default: { duration: 0.3 },
        }}
      >
        <h1>Services</h1>
      </motion.div>
      <div className="home-link">
        <Link ref={homeLink} className={isFixed ? "fixed" : "absolute"} to="/">
          HOME
        </Link>
        <motion.div
          className="socials"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            y: -2,
          }}
          transition={{
            ease: [0.87, -0.05, 0.43, 1],
            default: { duration: 0.6 },
          }}
        >
          <SocialsComponent />
        </motion.div>
      </div>
      <section className="services-container">
        {/* one section */}
        <div className="services-row-a">
          <motion.div className="col-txt">
            <p>{loremIpsum}</p>
            <ul>
              <li>Service item 1</li>
              <li>Service item 2</li>
              <li>Service item 3</li>
            </ul>
          </motion.div>

          <motion.div className="col-img">
            <img className="img-responsive" alt="test" src={Leni3} />
          </motion.div>

          <div className="dash-lft"></div>
        </div>

        {/* one section */}
        <div className="services-row-b">
          <motion.div className="col-img">
            <img className="img-responsive" alt="test" src={Leni} />
          </motion.div>
          <motion.div className="col-txt">
            <p>{loremIpsum}</p>
          </motion.div>
          <div className="dash-rght"></div>
        </div>
        {/* one section */}
        <div className="services-row-a">
          <motion.div className="col-txt">
            <p>{loremIpsum}</p>
            <ul>
              <li>Service item 1</li>
              <li>Service item 1</li>
              <li>Service item 1</li>
              <li>Service item 1</li>
              <li>Service item 1</li>
            </ul>
          </motion.div>
          <motion.div className="col-img">
            <img className="img-responsive" alt="test" src={Leni2} />
          </motion.div>
        </div>

        {/* footer */}

        <div className="services-footer">
          <div className="services-footer-content">
            <h2>
              “Incididunt ut/ labore et dolore magna aliqua/ Ut enim ad minim
              veniam.”
            </h2>
            <div className="footer-cta">
              <p className="cta-txt">Still have questions?</p>
              <button>Connect</button>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

ServicesPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

const ServicesPage = ({ data }) => {
  const { markdownRemark: post } = data;
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
          <ServicesPageTemplate
            data-scroll-section
            title={post.frontmatter.title}
            content={post.content}
          />
        </main>
      </LocomotiveScrollProvider>
    </Layout>
  );
};

ServicesPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ServicesPage;

export const servicesPageQuery = graphql`
query ServicesPage {
  markdownRemark(frontmatter: { templateKey: { eq: "services-page" } }) {

  }
}
`;

export const servicesPageQuery = graphql`
  query ServicesPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
