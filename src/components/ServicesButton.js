import React from "react";
import { Link } from "gatsby";

const ServicesButton = class extends React.Component {
  render() {
    return (
      <Link to="/services">
        <button>Servicess</button>
      </Link>
    );
  }
};

export default ServicesButton;
