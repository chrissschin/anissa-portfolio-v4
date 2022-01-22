import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import HomeImage from "../img/home.jpeg";
import ChemexImage from "../../static/img/chemex.jpg";
import BlogImage from "../../static/img/blog-index.jpg";
import { Link } from "gatsby";
import { motion } from "framer-motion";

// eslint-disable-next-line
export const ServicesPageTemplate = ({}) => {
  const loremIpsum =
    "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC,";

  // const [clientHeight, setClientHeight] = useState(0);
  // const { scrollY } = useViewportScroll();

  // // start animating our element when we've scrolled it into view
  // const initial = elementTop - clientHeight;
  // // end our animation when we've scrolled the offset specified
  // const final = elementTop + offset;

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
          default: { duration: 0.6 },
        }}
      >
        <h1>Services</h1>
      </motion.div>
      <div className="home-link">
        <Link ref={homeLink} className={isFixed ? "fixed" : "absolute"} to="/">
          HOME
        </Link>
        <div className="socials">
          <img alt="test" src="https://via.placeholder.com/20"></img>
          <img alt="test" src="https://via.placeholder.com/20"></img>
        </div>
      </div>
      <section className="services-container">
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
            <img className="img-responsive" alt="test" src={HomeImage} />
          </motion.div>

          <div className="dash-lft"></div>
        </div>

        {/* one section */}
        <div className="services-row-b">
          <motion.div className="col-img">
            <img className="img-responsive" alt="test" src={ChemexImage} />
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
            <img className="img-responsive" alt="test" src={BlogImage} />
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

  return (
    <Layout>
      <ServicesPageTemplate
        title={post.frontmatter.title}
        content={post.content}
      />
    </Layout>
  );
};

ServicesPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ServicesPage;

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
