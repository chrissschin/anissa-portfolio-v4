import React from "react";
import PropTypes from "prop-types";
import DetailPage from "../../templates/detail-page";

const DetailPagePreview = ({ entry, widgetFor }) => {
  return <DetailPage />;
};

DetailPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default DetailPagePreview;
