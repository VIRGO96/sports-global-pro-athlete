import Header from "components/Headers/Header";
import React from "react";
import { useSelector } from "react-redux";
import { Button, Container, Label, Row, Col } from "reactstrap";
import sidePic from "../../assets/img/custom/SideIconFHP.png";
import QRCode from "react-qr-code";

const YourCards = () => {
  const { user } = useSelector((state) => state.auth);

  const handlePrint = (divPrint) => {
    var printContents = document.getElementById(divPrint).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
    window.location.reload();
  };
  return (
    <>
      <Header />

      <Container fluid>
        <div className="d-flex justify-content-md-end justify-content-center">
          <Button color="primary" onClick={() => handlePrint("printMe")}>
            Download
          </Button>
        </div>

        <Row className="d-flex">
          <Col xs={0} md={0} lg={1} className="hideImg">
            <img src={sidePic} />
          </Col>
          <Col xs={12} md={12} lg={5} className="ml-md-3 pr-lg-0 pl-lg-4">
            <h2 className="text-dark"> A. Print on paper.</h2>
            <h2 className="text-dark"> B. Hand out to fans </h2>
            <div id="printMe">
              <div className="PrintCard mt-md-5">
                <div className="d-flex px-2 justify-content-between">
                  <div>
                    <Label className="text-dark">Name:</Label>
                    <span className="m-0 text-dark ml-1">
                      {user?.first_name} {user?.last_name}
                    </span>
                  </div>
                  <div>
                    <Label className="text-dark">Reg #:</Label>
                    <span className="m-0 text-dark ml-1">
                      {user?.athleteID}
                    </span>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <div>
                    <label className="mr-1">
                      <b>FANSHELPPLAYERS</b>
                    </label>
                    <QRCode
                      title="fhp"
                      value={`https://fans-help-players-athlete.web.app`}
                      size={50}
                    />
                  </div>
                  <div className="mt-3">
                    <QRCode
                      className="mr-1"
                      title="A4B"
                      value={`https://athlete-for-brand.web.app`}
                      size={50}
                    />
                    <label>
                      <b>AMBASSADOR4BRAND</b>
                    </label>
                  </div>

                  <div className="mt-3">
                    <label className="mr-1">
                      <b>MATCH4FUTURE</b>
                    </label>
                    <QRCode
                      title="M4F"
                      value={`https://match4future-platform.web.app`}
                      size={50}
                    />
                  </div>
                  <div className="mt-3">
                    <QRCode
                      className="mr-1"
                      title="Unkle"
                      value={`https://unkle501.web.app`}
                      size={50}
                    />
                    <label>
                      <b>UNKLE501</b>
                    </label>
                  </div>
                  <div className="mt-3">
                    <label className="mr-1">
                      <b>COLLECTIVEALUMS</b>
                    </label>
                    <QRCode
                      title="Unkle"
                      value={`https://collective-alums-main.web.app`}
                      size={50}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={0} md={0} lg={1} className="pl-0"></Col>
        </Row>

        <br />
        <br />
      </Container>
    </>
  );
};

export default YourCards;
