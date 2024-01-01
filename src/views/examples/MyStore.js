import Header from "components/Headers/Header";
import React from "react";
import { Container } from "reactstrap";
import storeUnderConstruction from "../../assets/img/custom/store-under-construction.png";

const MyStore = () => {
  return (
    <>
      <Header />
      <Container>
        <div className="text-center mt-5">
          <img
            src={storeUnderConstruction}
            alt="Under construction"
            className="img-fluid"
          />
        </div>
      </Container>
    </>
  );
};

export default MyStore;
