import * as THREE from "three";
import React from "react";

import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image, ScrollControls, Scroll, useScroll } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { state, damp } from "./Util";

import { Link } from "gatsby"; // to query for image data
import Layout from "../components/Layout";
import ServicesButton from "../components/ServicesButton";

// ALL COMPONENTS TO DETAIL PAGE BELOW
const DetailPageLayout = ({ content, title }) => {
  return (
    <div className="detail-page">
      <h2>{title}</h2>
      <div className="dash-rght"></div>
      <div className="detail-row">
        <div
          className="detail-info"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
        <div className="detail-links">
          <ServicesButton />
          <Link to="/">HOME</Link>
        </div>
      </div>
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

const Items = ({ w = 1.25, gap = 0.25, galleryImages }) => {
  const galleryLinks = galleryImages.map((i) => {
    return i.childImageSharp.gatsbyImageData.images.fallback.src;
  });

  const { urls } = useSnapshot(state);
  const { width } = useThree((state) => state.viewport);
  const xW = w + gap;
  console.log("urls gallery:", galleryLinks);
  return (
    <ScrollControls
      horizontal
      damping={8}
      pages={(width - xW * 2 + galleryLinks.length * xW) / width}
    >
      <Scroll>
        {
          galleryLinks.map((url, i) => <Item key={i} index={i} position={[(i * xW) - (xW * 4), 0, 1.2]} scale={[w, 4, 1]} url={url} />) /* prettier-ignore */
        }
      </Scroll>
    </ScrollControls>
  );
};

// what renders to the page
const DetailPageTemplate = class extends React.Component {
  render() {
    const { post } = this.props;
    return (
      <Layout>
        <DetailPageLayout
          title={post.frontmatter.title}
          content={post.html}
          galleryImages={post.frontmatter.galleryImages}
        />
        <Canvas
          style={{ height: "65vh" }}
          gl={{ antialias: false }}
          dpr={[1, 1.5]}
          onPointerMissed={() => (state.clicked = null)}
        >
          <Items galleryImages={post.frontmatter.galleryImages} />
        </Canvas>
      </Layout>
    );
  }
};

export default DetailPageTemplate;
