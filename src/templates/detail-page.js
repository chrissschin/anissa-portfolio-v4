import React from "react";
import { graphql } from "gatsby"; // to query for image data
import { useBreakpoint } from "gatsby-plugin-breakpoints";
const Detail = React.lazy(() => import("../components/Detail"));
const DetailMobile = React.lazy(() => import("../components/DetailMobile"));

const DetailPage = ({ data }) => {
  const breakpoints = useBreakpoint();
  const { markdownRemark: post } = data;
  const isSSR = typeof window === "undefined";
  return (
    <>
      {!isSSR && (
        <React.Suspense fallback={<div />}>
          {breakpoints.sm ? (
            <DetailMobile post={post} />
          ) : (
            <Detail post={post} />
          )}
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
        galleryImages {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
      }
    }
  }
`;
