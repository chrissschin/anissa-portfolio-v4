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
    markdownRemark: PropTypes.shape({
      id: PropTypes.any,
      html: PropTypes.any,
      frontmatter: PropTypes.shape({
        date: PropTypes.string,
        title: PropTypes.string,
        image1: PropTypes.any,
        image2: PropTypes.any,
        image3: PropTypes.any,
        image4: PropTypes.any,
        image5: PropTypes.any,
        image6: PropTypes.any,
        image7: PropTypes.any,
        image8: PropTypes.any,
      }),
    }),
  }),
};

export default DetailPage;

// export const detailPageQuery = graphql`
//   query DetailPageById($id: String!) {
//     markdownRemark(id: { eq: $id }) {
//       id
//       html
//       frontmatter {
//         date(formatString: "MMMM DD, YYYY")
//         title
//         description
//         image1 {
//           childImageSharp {
//             gatsbyImageData(quality: 100, layout: FULL_WIDTH)
//           }
//         }
//         image2 {
//           childImageSharp {
//             gatsbyImageData(quality: 100, layout: FULL_WIDTH)
//           }
//         }
//         image3 {
//           childImageSharp {
//             gatsbyImageData(quality: 100, layout: FULL_WIDTH)
//           }
//         }
//         image4 {
//           childImageSharp {
//             gatsbyImageData(quality: 100, layout: FULL_WIDTH)
//           }
//         }
//         image5 {
//           childImageSharp {
//             gatsbyImageData(quality: 100, layout: FULL_WIDTH)
//           }
//         }
//         image6 {
//           childImageSharp {
//             gatsbyImageData(quality: 100, layout: FULL_WIDTH)
//           }
//         }
//         image7 {
//           childImageSharp {
//             gatsbyImageData(quality: 100, layout: FULL_WIDTH)
//           }
//         }
//         image8 {
//           childImageSharp {
//             gatsbyImageData(quality: 100, layout: FULL_WIDTH)
//           }
//         }
//       }
//     }
//   }
// `;
