import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import HomeImage from "../img/home.jpeg";
import ManImage from "../img/man.jpg";
import ChemexImage from "../../static/img/chemex.jpg";
import BlogImage from "../../static/img/blog-index.jpg";
import { Link } from "gatsby";
import {
  motion,
  useViewportScroll,
  useTransform,
  useSpring,
} from "framer-motion";

// eslint-disable-next-line
export const ServicesPageTemplate = ({ contentComponent, content }) => {
  const PageContent = contentComponent || Content;
  const offset = 70;
  const loremIpsum =
    "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC,";
  const [elementTop, setElementTop] = useState(0);

  const [clientHeight, setClientHeight] = useState(0);
  const ref = useRef(null);
  const ref2 = useRef(null);
  const { scrollY } = useViewportScroll();

  // start animating our element when we've scrolled it into view
  const initial = elementTop - clientHeight;
  // end our animation when we've scrolled the offset specified
  const final = elementTop + offset;

  const yRange = useTransform(scrollY, [initial, final], [20, 400]);
  const yRange2 = useTransform(scrollY, [initial, final], [20, -300]);
  const yRange3 = useTransform(scrollY, [initial, final], [40, -100]);
  // apply a spring to ease the result
  const y = useSpring(yRange, { stiffness: 180, damping: 16 });
  const y2 = useSpring(yRange2, { stiffness: 150, damping: 16 });
  const y3 = useSpring(yRange3, { stiffness: 100, damping: 16 });

  // scroll fixed stuff
  // tweak this
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isFixed, setIsFixed] = useState(true);
  const homeLink = useRef(null);
  // const scrollHeight = Math.max(
  //   document.body.scrollHeight,
  //   document.documentElement.scrollHeight,
  //   document.body.offsetHeight,
  //   document.documentElement.offsetHeight,
  //   document.body.clientHeight,
  //   document.documentElement.clientHeight
  // );
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // if (currentScrollY > scrollHeight / 2) {
    //   setIsFixed(false);
    // } else {
    //   setIsFixed(true);
    // }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // useLayoutEffect(() => {
  //   const element = ref.current;
  //   // save our layout measurements in a function in order to trigger
  //   // it both on mount and on resize
  //   const onResize = () => {
  //     // use getBoundingClientRect instead of offsetTop in order to
  //     // get the offset relative to the viewport
  //     setElementTop(
  //       element.getBoundingClientRect().top + window.scrollY ||
  //         window.pageYOffset
  //     );
  //     setClientHeight(window.innerHeight);
  //   };
  //   onResize();
  //   window.addEventListener("resize", onResize);
  //   return () => window.removeEventListener("resize", onResize);
  // }, [ref]);

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
