import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

// eslint-disable-next-line
export const DetailPageTemplate = ({
  title,
  content,
  description,
  contentComponent,
}) => {
  const PageContent = contentComponent || Content;

  return (
    <div>
      <h1>hello im a detail page template wrapper</h1>
      <h2>{title}</h2>
      <h3>{description}</h3>
      <PageContent content={content}></PageContent>
    </div>
  );
};

DetailPageTemplate.propTypes = {
  title: PropTypes.node.isRequired,
  content: PropTypes.string,
  description: PropTypes.string,
  contentComponent: PropTypes.func,
};

const DetailPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <DetailPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        tags={post.frontmatter.tags}
        description={post.frontmatter.description}
      />
    </Layout>
  );
};

DetailPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default DetailPage;

export const detailPageQuery = graphql`
  query DetailPageById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
      }
    }
  }
`;
