import Header from "components/Headers/Header";
import React from "react";
import { Button, Col, Container, Row } from "reactstrap";
import { saveAs } from "file-saver";
import SocialMediaDownloadAble from "../../assets/img/custom/SocialMediaAd-DownloadNew.jpg";

function AthletePostThisPage() {
  const downloadImage = (e) => {
    e.preventDefault();
    saveAs(SocialMediaDownloadAble, "image.jpg");
  };
  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col xs="12" md="6">
            <img
              src={SocialMediaDownloadAble}
              alt="SocialMediaDownloadAble"
              className="img-fluid"
            />

            <div className="d-flex justify-content-center flex-column text-center mt-3">
              <h1 className="text-dark font-weight-bold ">
                Or Post This LINK:
              </h1>
              <a href="https://youtu.be/Oh_eiPI_AIE">
                https://youtu.be/Oh_eiPI_AIE
              </a>
            </div>
          </Col>
          <Col md="6">
            <p className="text-dark">
              1. Hello Brand Ambassdor. FHP wants to help you in making
              communications better between student athletes and fans. Here's an
              ad you could post on Social Media.
            </p>
            <Button onClick={downloadImage} className="mx-auto">
              Download!
            </Button>

            <p className="mt-1 text-dark">
              2.In the description you use for your post, you might include one
              of these:
            </p>
            <ul style={{ listStyleType: "lower-alpha" }}>
              <li>
                Remind Fans to check out the FHP video explaining site details.
              </li>
              <li>
                You could add your FHP Registeration number. so Fans can easily
                find your profile and buy your Teams Badges.
              </li>
              <li>
                Or mention Ambassador4Brand and offer to give Fans a guided tour
                of the FHP site as a Pay-by-minute video screenshare session.
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AthletePostThisPage;
