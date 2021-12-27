import React from "react";
import PropTypes from "prop-types";
import { DetailPageTemplate } from "../../templates/detail-page";

const DetailPagePreview = ({ entry, widgetFor }) => {
  const tags = entry.getIn(["data", "tags"]);
  return (
    <DetailPageTemplate
      content={widgetFor("body")}
      description={entry.getIn(["data", "description"])}
      title={entry.getIn(["data", "title"])}
    />
  );
};

DetailPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default DetailPagePreview;
