import React from "react";
import Layout from "../components/Layout";
import "../styles/documentation.sass";
import NextUpdatesList from "../components/NextUpdatesList";

// eslint-disable-next-line
export const DocumentationPageTemplate = ({}) => {
  return (
    <div className="documentation">
      <h2 className="documentation--h2">Release ver. 0.1</h2>
      <h3 className="documentation--h3">Next updates: </h3>

      <NextUpdatesList />

      <div className="documentation--how-to">
        <h2>How to use:</h2>
        <p>
          To login go here&nbsp;
          <a href="/admin" target="_blank">
            http://anissatestsite.netlify.app/admin
          </a>
          <br></br>
          You should be able to login with your google account otherwise just
          lmk!
        </p>
        <p>Once you've logged in, you should be able to add some recent work</p>
        <p>To do that: </p>
        <ol>
          <li>Click Details on the left side panel</li>
          <li>Click new Details</li>
          <li>Fill in details</li>
          <li>
            To add images, click add gallery at the bottom, upload and choose
            your images. <br />
            Try to keep the images jpg format if you can! It will save space and
            load your site faster.
          </li>
        </ol>
      </div>
    </div>
  );
};

const DocumentationPage = ({ data }) => {
  return (
    <Layout>
      <DocumentationPageTemplate />
    </Layout>
  );
};

export default DocumentationPage;
