import React from "react";
import IgSvg from "../img/social/instagram.svg";

export const SocialsComponent = () => {
  return (
    <div className="home-socials">
      <a
        href="https://instagram.com/anissasil?utm_medium=copy_link"
        target="_blank"
      >
        <img alt="Instagram" src={IgSvg}></img>
      </a>
    </div>
  );
};

export default SocialsComponent;
