import React, { useRef, Suspense } from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby"; // to query for image data
import Content from "../components/Content";
import ChemexImage from "../../static/img/chemex.jpg";

import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Scroll, Image, useIntersect } from "@react-three/drei";

const Detail = React.lazy(() => import("../components/Detail"));

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
  return (
    <div className="detail-page">
      <h2>Kate Beckinsdale</h2>
      <Link to="/">HOME</Link>
      {/* <p>{description}</p> */}
      {/* <div>
                <GatsbyImage image={getImage(image1)} alt="text" />
                <h2>list of images go here probably</h2>
                {galleryImages.map((i) => {
                  return <GatsbyImage image={getImage(i)} alt="text" />;
                })}
                <p></p>
              </div> */}
    </div>
  );
};

DetailPageTemplate.propTypes = {
  title: PropTypes.node.isRequired,
  content: PropTypes.string,
  description: PropTypes.string,
  contentComponent: PropTypes.func,
};

const Item = ({ url, scale, ...props }) => {
  const visible = useRef(false);
  const ref = useIntersect((isVisible) => (visible.current = isVisible));
  const { height } = useThree((state) => state.viewport);
  useFrame((state, delta) => {
    ref.current.position.y = THREE.MathUtils.damp(
      ref.current.position.y,
      visible.current ? 0 : -height / 2 + 1,
      4,
      delta
    );
    ref.current.material.zoom = THREE.MathUtils.damp(
      ref.current.material.zoom,
      visible.current ? 1 : 1.5,
      4,
      delta
    );
  });
  return (
    <group {...props}>
      <Image ref={ref} scale={scale} url={url} />
    </group>
  );
};

const Items = () => {
  const { width: w, height: h } = useThree((state) => state.viewport);
  return (
    <Scroll>
      <Item
        url={ChemexImage}
        scale={[w / 3, w / 3, 1]}
        position={[-w / 6, 0, 0]}
      />
      <Item
        url={ChemexImage}
        scale={[2, w / 3, 1]}
        position={[w / 30, -h, 0]}
      />
      <Item
        url={ChemexImage}
        scale={[w / 3, w / 5, 1]}
        position={[-w / 4, -h * 1, 0]}
      />
      <Item
        url={ChemexImage}
        scale={[w / 5, w / 5, 1]}
        position={[w / 4, -h * 1.2, 0]}
      />
      <Item
        url={ChemexImage}
        scale={[w / 5, w / 5, 1]}
        position={[w / 10, -h * 1.75, 0]}
      />
      <Item
        url={ChemexImage}
        scale={[w / 3, w / 3, 1]}
        position={[-w / 4, -h * 2, 0]}
      />
      <Item
        url={ChemexImage}
        scale={[w / 3, w / 5, 1]}
        position={[-w / 4, -h * 2.6, 0]}
      />
      <Item
        url={ChemexImage}
        scale={[w / 2, w / 2, 1]}
        position={[w / 4, -h * 3.1, 0]}
      />
      <Item
        url={ChemexImage}
        scale={[w / 2.5, w / 2, 1]}
        position={[-w / 6, -h * 4.1, 0]}
      />
    </Scroll>
  );
};

const DetailPage = ({ data }) => {
  const { markdownRemark: post } = data;
  console.log(post);
  const isSSR = typeof window === "undefined";

  return (
    <>
      {!isSSR && (
        <React.Suspense fallback={<div />}>
          <Detail post={post} />
          {/* <Layout>
        <DetailPageTemplate
          title={post.frontmatter.title}
          content={post.html}
          image1={post.frontmatter.image1}
          description={post.frontmatter.description}
          galleryImages={post.frontmatter.galleryImages}
        />
        <Canvas
          style={{ height: "100vh" }}
          onCreated={(state) => state.gl.setClearColor("#0c0c0c")}
          orthographic
          camera={{ zoom: 80 }}
          gl={{
            alpha: false,
            antialias: false,
            stencil: false,
            depth: false,
          }}
          dpr={[1, 1.5]}
        >
          <ScrollControls damping={6} pages={5}>
            <Items />
            <Scroll html style={{ width: "100%" }}></Scroll>
          </ScrollControls>
        </Canvas>
      </Layout> */}
        </React.Suspense>
      )}
    </>
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
