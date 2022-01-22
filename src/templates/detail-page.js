import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby"; // to query for image data
const Detail = React.lazy(() => import("../components/Detail"));

const DetailPage = ({ data }) => {
  const { markdownRemark: post } = data;
  const isSSR = typeof window === "undefined";
  return (
    <>
      {!isSSR && (
        <React.Suspense fallback={<div />}>
          <Detail post={post} />
        </React.Suspense>
      )}
    </>
  );
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
        galleryImages {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
      }
    }
  }
`;
