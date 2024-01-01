import React from "react";
import badgeImg from "../../assets/img/brand/fhp-badge.jpg";
const Badges = () => {
  return (
    <div className="text-center bg-white py-4">
      <img src={badgeImg} alt="badgeImg" width="100%" />
      <a
        href="https://fhp-fans.web.app/fan/search-player"
        className="btn btn-primary"
        target="_blank"
      >
        Search
      </a>
    </div>
  );
};

export default Badges;
