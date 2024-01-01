import React from "react";
import Header from "components/Headers/Header";
import { Col, Container, Row, Button } from "reactstrap";
import LOVE_MEMENTO_from_FHP_PNG from "../assets/img/custom/LOVE_MEMENTO_from_FHP_PNG.png";

function AddMementos() {
  return (
    <>
      <Header />
      <Container>
        <div className="text-center">
          <a
            href="https://momento-platform.web.app/main/gallery"
            target="_blank"
          >
            <img
              src={LOVE_MEMENTO_from_FHP_PNG}
              alt="Under construction"
              className="img-fluid mt-2"
              width={700}
            />{" "}
          </a>
        </div>
        {/* <h1 className="text-center mt-3">INFO: QR Codes for your Mementos </h1>
        <h1 className="text-center">
          Fans love it when you put both types in your mementos{" "}
        </h1>
        <div className="container my-4 ">
          <div className="row">
            <div className="col-lg-6 col-12">
              <h2 className="text-center">Static QRs</h2>
              <h3 className="text-center">When to use?</h3>
              <p className="text-center">
                <strong className="font-weight-bold">
                  Answer : Most of the QR codes{" "}
                </strong>
                you will put on a memento will be "unchanging" or Static QR
                codes. That's because you will want same video to play each time
                that Static QR code is scanned.
              </p>
              <h2 className="text-center">Where to get static QRs</h2>
              <ul>
                <li className="textWrap">
                  https://new.express.adobe.com/tools/generate-qr-code
                </li>
                <li>
                  <a>Qrcodechimp.com - your free plan link</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-6 col-12">
              <h2 className="text-center">Dynamic QRs</h2>
              <h3 className="text-center">When to use?</h3>
              <p className="text-center">
                <strong className="fs-1 font-weight-bold">
                  Now, let's say the fan{" "}
                </strong>
                has one of your mementos on their wall. They scanned each QR and
                enjoyed the videos.
                <strong className="font-weight-bold">
                  {" "}
                  But you have new something to tell them.
                </strong>{" "}
                If you remembered to put a dynamic QR in the memento when you
                made it, you can edit it and the fan can{" "}
                <strong className="text-underline font-weight-bold">
                  use the old momento to see a new video
                </strong>
                Here's how :
              </p>
              <h2 className="text-center ">Where to get dynamic QRs</h2>
              <ul>
                <li>
                  <a>Qrcodechimp.com - your free plan link</a>
                </li>
                <li>
                  <a>
                    <h3>
                      <strong className="text-underline font-weight-bold">
                        Where to edit{" "}
                      </strong>
                      (i.e, to put in the new video )?
                    </h3>
                    Edit button at Qrcodechimp.com - your free plan{" "}
                  </a>
                </li>
                <li>
                  <a className="textWrap">
                    <h3 className="text-underline font-weight-bold  ">
                      Where to learn fast? - Watch the video
                    </h3>
                    https://www.loom.com/share/5a124172ee814eb627f93b358cd7b5c80
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div> */}
      </Container>
    </>
  );
}

export default AddMementos;
