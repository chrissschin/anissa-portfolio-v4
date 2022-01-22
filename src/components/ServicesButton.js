import React from "react";
import { Link } from "gatsby";

const ServicesButton = class extends React.Component {
  render() {
    return (
      <Link to="/services">
        <button>Services</button>
      </Link>
    );
  }
};

export default ServicesButton;
