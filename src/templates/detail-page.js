import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby"; // to query for image data
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

// eslint-disable-next-line
export const DetailPageTemplate = ({
  title,
  content,
  image1,
  description,
  contentComponent,
  galleryImages,
}) => {
  const PageContent = contentComponent || Content;
  console.log(image1);
  console.log(galleryImages);
  return (
    <div>
      <h1>TITLE</h1>
      <p>{description}</p>
      <div>
        <GatsbyImage image={getImage(image1)} alt="text" />
        <h2>list of images go here probably</h2>
        {galleryImages.map((i) => {
          return <GatsbyImage image={getImage(i)} alt="text" />;
        })}
        <p></p>
      </div>
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
  console.log(post);
  return (
    <Layout>
      <DetailPageTemplate
        title={post.frontmatter.title}
        content={post.html}
        image1={post.frontmatter.image1}
        description={post.frontmatter.description}
        galleryImages={post.frontmatter.galleryImages}
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
        galleryImages: PropTypes.any,
      }),
    }),
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
        image1 {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
        image2 {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
        galleryImages {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
      }
    }
  }
`;
