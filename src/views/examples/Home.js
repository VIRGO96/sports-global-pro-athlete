import React, { useEffect, useState } from "react";
import Fan from "../../assets/img/custom/PinClipart1.png";
import Athlete from "../../assets/img/custom/balls.png";
import Coach from "../../assets/img/custom/Untitled.png";
import Logo from "../../assets/img/custom/logo.png";
import landingBadge from "../../assets/img/custom/landingBadge.jpg";

import {
  Col,
  Container,
  Row,
  Button,
  Modal,
  ModalBody,
  Input,
  Label,
  Alert,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import Apple1 from "../../assets/img/custom/step1.PNG";
import Apple2 from "../../assets/img/custom/step 2.png";
import Apple3 from "../../assets/img/custom/step 3.PNG";
import Android1 from "../../assets/img/custom/android_1.jpg";
import Android2 from "../../assets/img/custom/android_2.jpg";
import Android3 from "../../assets/img/custom/android_3.jpg";
import { browserName, CustomView } from "react-device-detect";
import AndroidStep from "../../assets/img/custom/androidstep.PNG";
import SafariStep from "../../assets/img/custom/safaristep.PNG";
import QRCode from "react-qr-code";
import imageInModal from "../../assets/img/custom/imagesInModal.PNG";
import { Link } from "react-router-dom";
function Home() {
  const [registerNotice, setRegisterNotice] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const [appleModal, setAppleModal] = useState(false);
  const [androidModal, setAndroidModal] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [active, setActive] = useState(0);
  const history = useHistory();
  const appleToggle = () => {
    setActive(0);
    setAppleModal(!appleModal);
  };
  const androidToggle = () => {
    setActive(0);
    setAndroidModal(!androidModal);
  };
  const registerNoticeToggle = () => {
    setRegisterModal(!registerModal);
  };
  const showAlertToggle = () => {
    setShowAlert(!showAlert);
  };
  useEffect(() => {
    const checkInstall = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;
    setIsInstalled(checkInstall);
  }, []);
  const checkIsInstalled = () => {
    window.addEventListener("appinstalled", (evt) => {
      setIsInstalled(true);
    });
  };
  const [isShow, setIsShow] = useState(false);
  const toggle = () => {
    setIsShow(!isShow);
  };
  const [isShow2, setIsShow2] = useState(false);
  const toggle2 = () => {
    setIsShow2(!isShow);
  };
  return (
    <div className="bg-white h-100vh">
      {checkIsInstalled()}
      <Container fluid>
        <Row>
          <Col lg="4" className="align-self-center  text-center">
            {/* <div className="text-center text-lg-left ">
              <h2
                className="font-weight-bold d-flex justify-content-between
    align-items-end pt-4"
              >
                <b>SEND VIDEO TO FRIEND</b>
                <a
                  href="#"
                  target="_blank"
                  className="text-white btn btn-primary my-1"
                >
                  Coach <br /> Perspective
                </a>
              </h2>
            </div> */}
            <div className="d-flex justify-content-start mt-1">
              <div>
                <Button
                  size="sm"
                  className="bg-dark mr-2 text-white"
                  onClick={() => {
                    copy("https://youtu.be/JH80O7GEZqU");
                    toast.success("Link Copied");
                  }}
                >
                  Copy
                </Button>
              </div>
              <a href="https://youtu.be/JH80O7GEZqU" target="_blank">
                https://youtu.be/JH80O7GEZqU
              </a>
            </div>
            <div className="d-flex justify-content-start mt-1">
              <div>
                <Button
                  size="sm"
                  className="bg-dark mr-2 text-white"
                  onClick={() => {
                    copy("https://www.youtube.com/watch?v=GL7A25v7Vas");
                    toast.success("Link Copied");
                  }}
                >
                  Copy
                </Button>
              </div>
              <a
                href="https://www.youtube.com/watch?v=GL7A25v7Vas"
                target="_blank"
              >
                https://youtu.be/GL7A25v7Vas
              </a>
            </div>
            <div className="d-flex justify-content-start mt-1">
              <div>
                <Button
                  size="sm"
                  className="bg-dark mr-2 text-white"
                  onClick={() => {
                    copy("https://www.youtube.com/watch?v=wqIqq6CHJBU");
                    toast.success("Link Copied");
                  }}
                >
                  Copy
                </Button>
              </div>
              <a
                href="https://www.youtube.com/watch?v=wqIqq6CHJBU"
                target="_blank"
              >
                https://youtu.be/wqIqq6CHJBU
              </a>
            </div>
            <div className="d-flex justify-content-start mt-1">
              <div>
                <Button
                  size="sm"
                  className="bg-dark mr-2 text-white"
                  onClick={() => {
                    copy("https://youtu.be/XI9Ms-iqsR0");
                    toast.success("Link Copied");
                  }}
                >
                  Copy
                </Button>
              </div>
              <a href="https://youtu.be/XI9Ms-iqsR0" target="_blank">
                https://youtu.be/XI9Ms-iqsR0
              </a>
            </div>
            <div className="d-flex justify-content-start mt-1">
              <div>
                <Button
                  size="sm"
                  className="bg-dark mr-2 text-white"
                  onClick={() => {
                    copy("https://www.youtube.com/watch?v=Td-rTTRcZug");
                    toast.success("Link Copied");
                  }}
                >
                  Copy
                </Button>
              </div>
              <a
                href="https://www.youtube.com/watch?v=Td-rTTRcZug"
                target="_blank"
              >
                https://youtu.be/Td-rTTRcZug
              </a>
            </div>
            <div className="d-flex justify-content-start mt-1">
              <div>
                <Button
                  size="sm"
                  className="bg-dark mr-2 text-white"
                  onClick={() => {
                    copy(
                      "https://www.youtube.com/watch?v=tI6h_gnGIek&feature=youtu.be"
                    );
                    toast.success("Link Copied");
                  }}
                >
                  Copy
                </Button>
              </div>
              <a
                href="https://www.youtube.com/watch?v=tI6h_gnGIek&feature=youtu.be"
                target="_blank"
              >
                https://youtu.be/tI6h_gnGIek
              </a>
            </div>
            <div className="d-flex justify-content-start mt-1">
              <div>
                <Button
                  size="sm"
                  className="bg-dark mr-2 text-white"
                  onClick={() => {
                    copy("https://youtu.be/JRl3uMqV0hQ");
                    toast.success("Link Copied");
                  }}
                >
                  Copy
                </Button>
              </div>
              <a
                href="https://youtu.be/JRl3uMqV0hQ
								"
                target="_blank"
              >
                https://youtu.be/JRl3uMqV0hQ
              </a>
            </div>
            <div className="d-flex justify-content-start mt-1">
              <div>
                <Button
                  size="sm"
                  className="bg-dark mr-2 text-white"
                  onClick={() => {
                    copy("https://www.youtube.com/watch?v=CsWOCWA8IPM");
                    toast.success("Link Copied");
                  }}
                >
                  Copy
                </Button>
              </div>
              <a
                href="https://www.youtube.com/watch?v=CsWOCWA8IPM
								"
                target="_blank"
              >
                https://bit.ly/3R6urSK
              </a>
            </div>
            <div className="text-center text-lg-left mt-2 ">
              <h2 className="font-weight-bold">
                <b>Help videos go viral, so players benefit</b>
              </h2>
            </div>
          </Col>
          <Col lg="4" className="align-self-center text-center">
            <div className="d-flex flex-wrap ">
              <a
                href="https://athlete-for-brand.web.app/time-slot"
                target="_blank"
                className="text-white btn btn-primary my-1"
              >
                {/* Match4Future */}1 on 1 CHAT
              </a>
              <a
                href="https://athlete-for-brand.web.app/time-slot"
                target="_blank"
                className="text-white btn btn-primary my-1"
              >
                GROUP CHAT
                {/* CollectiveAlums */}
              </a>
              <Link className="text-white btn btn-primary my-1" to="/shop">
                Shop
              </Link>

              <a
                href="https://momento-platform.web.app/"
                target="_blank"
                className="text-white btn btn-primary my-1"
              >
                {/* Ambassador4Brand + CHAT */}
                MEMENTOS
              </a>

              <a
                href="https://unkle501.web.app"
                target="_blank"
                className="text-white btn btn-primary my-1"
              >
                {/* UNKLE501 */}
                DONATE
              </a>
              <Link className="text-white btn btn-primary my-1" to="/trending">
                Trending
              </Link>
              <Link className="text-white btn btn-primary my-1" to="/badges">
                TALKING BADGES
              </Link>
              <a
                href="https://fhp-fans.web.app/fan/athlete-sessionals-buy"
                target="_blank"
                className="text-white btn btn-primary my-1"
              >
                View Videos Fav Athlete
              </a>
            </div>
            <img src={Logo} alt="logo" className="img-fluid" />
            <br />
            <strong className="text-danger">
              <i>Click for info</i>
            </strong>
            <br />
            <i className="fas fa-arrow-circle-down text-danger"></i>
            <br />
            <a
              href="https://www.youtube.com/watch?v=CsWOCWA8IPM"
              target="_blank"
            >
              https://www.youtube.com/watch?v=CsWOCWA8IPM
            </a>
            <br />
            <a href="https://youtu.be/uIWftF7cjug" target="_blank">
              https://youtu.be/uIWftF7cjug
            </a>
          </Col>
          <Col lg="4" className="align-self-center text-center">
            {!isInstalled && (
              <>
                <h1 className="auth-heading">Load app to save time</h1>
                <CustomView condition={browserName === "Safari"}>
                  <ul style={{ listStyle: "Number" }}>
                    <li>
                      <h5>
                        Choose the{" "}
                        <u>
                          <b>Share up-arrow</b>
                        </u>{" "}
                        at the bottom of your Safari screen
                      </h5>
                    </li>
                    <li>
                      <h5>
                        and select{" "}
                        <u>
                          <b>Add to Home Screen</b>
                        </u>
                      </h5>
                    </li>
                  </ul>
                </CustomView>
                <div className="d-flex justify-content-center">
                  <div className="text-dark">
                    <i
                      className="fab fa-apple fa-2x pointer "
                      onClick={appleToggle}
                    ></i>
                    <br />
                    <strong>Apple</strong>
                    <br />
                    <strong>IPhone</strong>
                  </div>
                  <div className="custom-border-left ml-3"></div>
                  <div className="ml-3 text-dark">
                    <i
                      className="fab fa-android fa-2x pointer text-success"
                      onClick={androidToggle}
                    ></i>
                    <br />
                    <strong>Android + </strong>
                    <br />
                    <strong>Non-Apple Phones</strong>
                  </div>
                </div>
              </>
            )}
          </Col>
        </Row>
      </Container>
      <Modal isOpen={appleModal} centered>
        <div className="d-flex p-2">
          <i
            className="fa fa-times pointer ml-auto text-danger"
            onClick={appleToggle}
          ></i>
        </div>
        <div className="mx-auto">
          <Button
            size="sm"
            color="secondary"
            disabled={active == 0}
            onClick={() => {
              if (active != 0) {
                setActive(active - 1);
              }
            }}
          >
            Prev
          </Button>
          <Button
            color="primary"
            size="sm"
            disabled={active == 3}
            onClick={() => {
              if (active != 3) {
                setActive(active + 1);
              }
            }}
          >
            Next
          </Button>
        </div>
        <ModalBody className="text-center ">
          <img
            src={SafariStep}
            alt="Safari Step"
            className={`${active != 0 && "d-none"} img-fluid`}
          />
          <img
            src={Apple1}
            alt="Step1"
            className={`${active != 1 && "d-none"} img-fluid`}
          />
          <img
            src={Apple2}
            alt="Step2"
            className={`${active != 2 && "d-none"} img-fluid`}
          />
          <p className={`${active != 3 && "d-none"}`}>
            Click the add button above. This can take a few minutes to load up
            your mobile screen. You can close this screen.
          </p>
          <img
            src={Apple3}
            alt="Step3"
            className={`${active != 3 && "d-none"} img-fluid`}
          />
        </ModalBody>
      </Modal>
      <Modal isOpen={androidModal} centered>
        <div className="d-flex p-2">
          <i
            className="fa fa-times pointer ml-auto text-danger"
            onClick={androidToggle}
          ></i>
        </div>
        <div className="mx-auto">
          <Button
            size="sm"
            color="secondary"
            disabled={active == 0}
            onClick={() => {
              if (active != 0) {
                setActive(active - 1);
              }
            }}
          >
            Prev
          </Button>
          <Button
            color="primary"
            size="sm"
            disabled={active == 3}
            onClick={() => {
              if (active != 3) {
                setActive(active + 1);
              }
            }}
          >
            Next
          </Button>
        </div>
        <ModalBody className="text-center">
          <img
            src={AndroidStep}
            alt="AndroidStep"
            className={`${active != 0 && "d-none"} img-fluid`}
          />
          <img
            src={Android1}
            alt="Step1"
            className={`${active != 1 && "d-none"} img-fluid`}
          />
          <img
            src={Android2}
            alt="Step2"
            className={`${active != 2 && "d-none"} img-fluid`}
          />
          <img
            src={Android3}
            alt="Step3"
            className={`${active != 3 && "d-none"} img-fluid`}
          />
        </ModalBody>
      </Modal>
      <Modal isOpen={registerModal} centered>
        <div className="d-flex p-2">
          <i
            className="fa fa-times pointer ml-auto text-danger"
            onClick={registerNoticeToggle}
          ></i>
        </div>
        <ModalBody>
          <strong>BEFORE Registering, read this Notice</strong>
          <Label className="custom-label text-dark">
            Here, student athletes sell NIL licenses & act as Brand Ambassadors
            in video chats with fans. We endeavor to follow the NCAA’s guidance.
            Prior to registration, feel free to check with your school, your
            parents, or other advisors if you have questions.
          </Label>
          <div className="d-flex mt-2 ml-4">
            <Input
              required
              type="checkbox"
              className="custom-checkbox"
              checked={registerNotice}
              onChange={(e) => setRegisterNotice(e.target.checked)}
            />
            <Label className="custom-checkbox-label text-dark mx-4 mt-1">
              I've read the Notice and will comply.
            </Label>
          </div>
          <div className="text-right mt-2">
            <Button color="secondary" onClick={registerNoticeToggle}>
              Cancel
            </Button>
            <Button
              color="primary"
              disabled={!registerNotice}
              onClick={() => {
                history.push("/auth/login");
              }}
            >
              Continue
            </Button>
          </div>
        </ModalBody>
      </Modal>
      <Container className="mb-3">
        <div className="">
          <h2 className="auth-heading text-center mt-3">I am a</h2>
        </div>
        <br />
        <>
          <Modal isOpen={showAlert}>
            <Container>
              <div
                style={{
                  background: "white",
                }}
              >
                <div className="d-flex pr-2 pt-4">
                  <i
                    className="fa fa-times pointer ml-auto text-danger"
                    onClick={showAlertToggle}
                  ></i>
                </div>{" "}
                <div className="my-auto">
                  <p className="text-primary m-0">
                    <b>Video Url</b>
                  </p>
                  <a
                    href="https://youtu.be/bvmnXRJUIiQ"
                    style={{
                      color: "black",
                      wordBreak: "break-word",
                    }}
                    target="_blank"
                    alt="video"
                  >
                    https://youtu.be/bvmnXRJUIiQ
                  </a>
                </div>
              </div>
            </Container>
          </Modal>
        </>
        <Row className="">
          {/* <Col md="4">
            <div className="text-center">
              <a
                href="https://Youtu.be/rHxlMcm-5m0"
                target="_blank"
                alt="video"
              >
                https://Youtu.be/rHxlMcm-5m0
              </a>
            </div>
            <h2 className="auth-heading text-center mt-4">
              Coach<sup>*</sup>
            </h2>
            <a href="https://fhp-coach-platform.web.app" target="_blank">
              <img src={Coach} className="pointer" alt="logo" width="100%" />
            </a>
          </Col> */}
          <Col md="6">
            <div className="text-center">
              <a
                href="https://Youtu.be/zdb8fNnRsuc"
                target="_blank"
                alt="video"
              >
                https://Youtu.be/zdb8fNnRsuc
              </a>
            </div>
            <h2 className="auth-heading text-center mt-4">Athlete</h2>
            <img
              src={Athlete}
              className="pointer"
              onClick={registerNoticeToggle}
              alt="logo"
              width="100%"
            />
          </Col>
          <Col className="d-flex justify-content-end position-relative" md="6">
            <a
              href="https://youtu.be/czhgYJumWOw"
              target="_blank"
              alt="video"
              className="position-absolute"
            >
              https://youtu.be/czhgYJumWOw
            </a>
            <h2 className="auth-heading mt-5">Fan</h2>
            <a href="https://fhp-fans.web.app/fan">
              <img className="mt-5" src={Fan} alt="logo" height="330px" />
            </a>
          </Col>
        </Row>
        <h2 className="text-center mt-3">
          NOTICE: Offers are void where prohibited by law , NCAA regulation, or
          School policy.
        </h2>
        <h2 className="text-center mt-3">
          <sup>*</sup>NOTE: NCAA Guidance allows schools/coaches to administer a
          marketplace that matches student-athletes with NIL opportunities CLICK{" "}
          <span className="text-primary curser-pointer" onClick={toggle}>
            LINK
          </span>{" "}
          and to 'promote' student athlete participation in paid platforms CLICK{" "}
          <span className="text-primary curser-pointer" onClick={toggle2}>
            LINK
          </span>
          ..
        </h2>
      </Container>
      <Modal isOpen={isShow} toggle={toggle} size="lg" centered>
        <ModalBody>
          <div className="font-weight-600">
            <p>
              The NCAA{" "}
              <b>
                <u>guidance</u>
              </b>{" "}
              approved on 26 October 2022 clarifies how schools can interact and
              support enrolled student-athletes’ NIL activities.
            </p>
            <p>
              {" "}
              a. Schools are encouraged to provide educational training to
              current student-athletes on such topics as financial literacy,
              taxes, entrepreneurship, and social media practices. According to
              the guidance, these educational programs also can be provided to
              collectives, boosters, and prospective student-athletes.
            </p>
            <p>
              <p className="m-0">
                {" "}
                b. With respect to supporting student-athlete activities:
              </p>{" "}
              Schools{" "}
              <b>
                <u>are</u>
              </b>{" "}
              allowed to: administer a marketplace that matches student-athletes
              with NIL opportunities; arrange space for NIL entities and
              student-athletes to meet on campus or in school facilities; and
              promote student-athlete NIL activity on paid platforms, provided
              that the student-athlete or NIL entity is paying the going rate
              for the advertisement.
            </p>
            <p>
              {" "}
              c. Schools are{" "}
              <b>
                <u>not</u>
              </b>{" "}
              allowed to: communicate with NIL entities regarding specific
              student-athlete requests or demands for compensation; assist
              proactively in the implementation of a specific student-athlete’s
              NIL activity; and provide a student-athlete access to equipment,
              unless the same benefit is generally available to the
              institution’s students.
            </p>
            <p>
              <p className="m-0">
                {" "}
                d. With respect to supporting NIL entities and collectives:
              </p>{" "}
              Schools{" "}
              <b>
                <u>are</u>
              </b>{" "}
              allowed to: assist NIL entities in raising money for those
              entities; provide assets (e.g., tickets) to NIL entities under
              sponsorship agreements if those assets are available to other
              sponsors; encourage donors to provide funding to NIL entities if
              they are not directed to a specific sport or student-athlete; and
              facilitate meetings between donors and NIL entities.
            </p>
            <p>
              {" "}
              e. Schools{" "}
              <b>
                <u>are</u>
              </b>{" "}
              not allowed to: subscribe to nor donate cash to the NIL entity;
              provide assets to a donor as an incentive for providing funds to
              the NIL entity; and allow athletics department staff members to be
              employed by an NIL entity.
            </p>
            <p>
              {" "}
              f. Further, schools are{" "}
              <b>
                <u>not</u>
              </b>{" "}
              allowed to engage in certain negotiating, revenue sharing, and
              compensating activities, including to allow staff members to
              represent enrolled student-athletes for NIL deals; or enter in
              contracts with the student-athletes for the sale of products
              related to NIL deals; or engage in student-athlete revenue
              sharing; or allow coaches to compensate student-athletes to
              promote the coach’s camp.
            </p>
          </div>

          <div className="text-right">
            <Button color="primary" onClick={() => setIsShow(false)}>
              Close
            </Button>
          </div>
        </ModalBody>
      </Modal>
      <Modal isOpen={isShow2} toggle={toggle2} size="lg" centered>
        <ModalBody>
          <div>
            <h2>
              In 2023, the NCAA Division I Board of Directors directed the
              Division I Council to develop proposals to improve the environment
              for student-athletes engaging in name, image, and likeness
              activities in college sports. Among the proposals the working
              group is expected to present to the council in October 2023 are
              rules that would:{" "}
            </h2>
            <h2>
              <ul>
                <li>
                  Develop a registration process for NIL service providers (such
                  as agents and financial advisors) and NIL entities (those who
                  contract with student-athletes for the use of their NIL).{" "}
                </li>
                <li>
                  Create a standardized contract or standard contract terms that
                  could include certain information to be required, including
                  terms like fee structures and the specific activities for
                  which athletes would be compensated.
                </li>
                <li>
                  Establish disclosure requirements for student-athletes and/or
                  NIL entities that could serve as a resource for
                  student-athletes and would be intended to provide transparency
                  about NIL activities
                </li>
              </ul>
            </h2>
          </div>

          <div className="text-right">
            <Button color="primary" onClick={() => setIsShow2(false)}>
              Close
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Home;
