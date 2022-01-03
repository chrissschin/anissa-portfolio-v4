import * as THREE from "three";
import React from "react";

import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image, ScrollControls, Scroll, useScroll } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { state, damp } from "./Util";

import PropTypes from "prop-types";
import { graphql, Link } from "gatsby"; // to query for image data
import Layout from "../components/Layout";
import Content from "../components/Content";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ChemexImage from "../../static/img/chemex.jpg";
import ServicesButton from "../components/ServicesButton";

const Detail = class extends React.Component {
  render() {
    const { post } = this.props;
    console.log("the post", post);

    return (
      <Layout>
        <DetailPageTemplate
          title={post.frontmatter.title}
          content={post.html}
          image1={post.frontmatter.image1}
          description={post.frontmatter.description}
          galleryImages={post.frontmatter.galleryImages}
        />
        <Canvas
          style={{ height: "65vh" }}
          gl={{ antialias: false }}
          dpr={[1, 1.5]}
          onPointerMissed={() => (state.clicked = null)}
        >
          <Items />
        </Canvas>
      </Layout>
    );
  }
};

export default Detail;

// eslint-disable-next-line
const DetailPageTemplate = ({
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
      <div className="dash-rght"></div>

      <div className="detail-row">
        <div className="detail-info">
          <p>
            Lorem ipsum text to go here random. The random text goes here
            description. The green juice mixed with apples. Brown pots.
          </p>
          <p>
            Does not support export = and import =, because those cannot be
            compiled to ES.next. Workaround: Convert to using export default and
            export const, and import x, y from “z”.
          </p>
        </div>
        <div className="detail-links">
          <ServicesButton />
          <Link to="/">HOME</Link>
        </div>
      </div>
      <span className="date">12/ 31/ 2022</span>
    </div>
  );
};

const Item = ({ index, position, scale, c = new THREE.Color(), ...props }) => {
  const ref = useRef();
  const scroll = useScroll();
  const { clicked, urls } = useSnapshot(state);
  const [hovered, hover] = useState(false);
  const click = () => (state.clicked = index === clicked ? 0 : index);

  const over = () => hover(true);
  const out = () => hover(false);
  useFrame((state, delta) => {
    const y = scroll.curve(
      index / urls.length - 1.5 / urls.length,
      4 / urls.length
    );
    ref.current.material.scale[1] = ref.current.scale.y = damp(
      ref.current.scale.y,
      clicked === index ? 5 : 4 + y,
      8,
      delta
    );
    ref.current.material.scale[0] = ref.current.scale.x = damp(
      ref.current.scale.x,
      clicked === index ? 4.7 : scale[0],
      6,
      delta
    );
    if (clicked !== null && index < clicked)
      ref.current.position.x = damp(
        ref.current.position.x,
        position[0] - 2,
        6,
        delta
      );
    if (clicked !== null && index > clicked)
      ref.current.position.x = damp(
        ref.current.position.x,
        position[0] + 2,
        6,
        delta
      );
    if (clicked === null || clicked === index)
      ref.current.position.x = damp(
        ref.current.position.x,
        position[0],
        6,
        delta
      );

    ref.current.material.color.lerp(
      c.set(hovered || clicked === index ? "white" : "#aaa"),
      hovered ? 0.3 : 0.1
    );
  });
  return (
    <Image
      ref={ref}
      {...props}
      position={position}
      scale={scale}
      onClick={click}
      onPointerOver={over}
      onPointerOut={out}
    />
  );
};

const Items = ({ w = 0.8, gap = 0.25 }) => {
  const { urls } = useSnapshot(state);
  const { width } = useThree((state) => state.viewport);
  const xW = w + gap;
  return (
    <ScrollControls
      horizontal
      damping={8}
      pages={(width - xW * 2 + urls.length * xW) / width}
    >
      <Scroll>
        {
          urls.map((url, i) => <Item key={i} index={i} position={[(i * xW) - (xW * 4), 0, 1.2]} scale={[w, 4, 1]} url={url} />) /* prettier-ignore */
        }
      </Scroll>
    </ScrollControls>
  );
};
