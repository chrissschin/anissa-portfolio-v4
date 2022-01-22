import * as React from "react";
import { Helmet } from "react-helmet";
import "./all.sass";
import useSiteMetadata from "./SiteMetadata";
import { withPrefix } from "gatsby";

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata();
  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="theme-color" content="#fff" />
        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <link rel="icon" href="" />
        {/* <meta
          property="og:image"
          content={`${withPrefix("/")}img/og-image.jpg`}
        /> */}
      </Helmet>
      <div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default TemplateWrapper;
