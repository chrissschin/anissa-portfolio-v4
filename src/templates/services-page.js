import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

// eslint-disable-next-line
export const ServicesPageTemplate = ({ contentComponent, content }) => {
  const PageContent = contentComponent || Content;

  return (
    <div>
      <h1>Serices Header</h1>
      <section className="services-container">
        <div className="services-row-a">
          <h2>text</h2>
          <h2>iamge</h2>
        </div>
        <div className="services-row-b">
          <h2>image</h2>
          <h2>text</h2>
        </div>
        <div className="services-footer">
          <div className="txt-huge">
            <h2>BIG TEXT</h2>
          </div>
          <div className="services-cta">
            <h2>text then btn</h2>
          </div>
        </div>
      </section>
    </div>
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
