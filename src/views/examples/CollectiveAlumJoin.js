import Header from "components/Headers/Header";
import React from "react";

const CollectiveAlumJoin = () => {
  return (
    <>
      <Header />
      <p className="text-dark auth-desc-title mt-0">
        CollectiveAlums.com & Match4Future.com
      </p>
      <p className="text-dark ca-desc-points">
        1-{" "}
        <a href="https://collective-alums-main.web.app" target="_blank">
          CollectiveAlums
        </a>{" "}
        is a communication app for sending emails. <br />
        <br />
        2- Those emails Alums and athletes can send are for School Officials.
        <br />
        <br />
        3- . If you know a Coach at a school or an Administrator, you athletes
        can send an email alerting that Coach or Administrator about the
        benefits of FansHelpPlayers
        <br />
        <br />
        4- Let’s get the word out so everybody can participate.
        <br />
        <br />
        5- . Match4Future opens for operations in 2024. The goal is to help
        athletes find short internships, so they learn about future job
        opportunities.
        <br />
      </p>
    </>
  );
};

export default CollectiveAlumJoin;
