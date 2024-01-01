import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { createSessionBadge } from "store/actions/SeasonActions";
import { toast } from "react-toastify";
import cross from "../assets/img/cross.svg";
import Paypal from "./Paypal";
import { isManagerExist } from "store/actions/SeasonActions";

const Games = [
  " FOOTBALL",
  "BASKETBALL",
  "SOCCER",
  "BASEBALL",
  "VOLLEYBALL",
  "HOCKEY",
];
const Match = ["TENNIS", "GOLF"];
const Meets = ["Gymnastics", "Swimming", "Track & Field"];

const SeasonalBadgeAddModal = ({ toggle, addModal }) => {
  const dispatch = useDispatch();
  const { user, uid } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.season);
  const allSports = Games.concat(Match, Meets);
  const [badgePayment, setBadgePayment] = useState(false);
  const setLoading = false;
  const [badgeData, setBadgeData] = useState({
    type: "",
    year: "",
    sport: "",
    listNumber: "",
    onlineUrlPrice: "",
    qrCodePrice: "",
    videoURL: "",
    qrCode: "",
    managerEmail: "",
  });
  const [managerEmail, setManagerEmail] = useState("");
  useEffect(() => {
    setBadgeData({
      type: "",
      year: "",
      sport: "",
      listNumber: "",
      onlineUrlPrice: "",
      qrCodePrice: "",
      videoURL: "",
      qrCode: "",
    });
    setManagerEmail("");
  }, [toggle]);
  const getNext5Years = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 5; i++) {
      years.push(`${currentYear + i}-${String(currentYear + i + 1).slice(-2)}`);
    }
    return years;
  };

  const submitBadge = (payload) => {
    if (managerEmail == "") {
      dispatch(
        createSessionBadge(uid, payload, () => {
          setBadgeData({
            type: "",
            year: "",
            sport: "",
            listNumber: "",
            onlineUrlPrice: "",
            qrCodePrice: "",
          });
          setManagerEmail("");
          toggle();
          setBadgePayment(false);
        })
      );
    } else {
      let obj = { ...payload, managerEmail: managerEmail };
      dispatch(
        isManagerExist(managerEmail, () => {
          dispatch(
            createSessionBadge(uid, obj, () => {
              setBadgeData({
                type: "",
                year: "",
                sport: "",
                listNumber: "",
                onlineUrlPrice: "",
                qrCodePrice: "",
              });
              setManagerEmail("");
              toggle();
              setBadgePayment(false);
            })
          );
        })
      );
    }
  };

  const getPaypalDetail = (details) => {
    const payload = {
      athleteID: user?.athleteID,
      ...badgeData,
      sportType: Games.includes(badgeData?.sport)
        ? "Games"
        : Match.includes(badgeData?.sport)
        ? "Match"
        : Meets.includes(badgeData?.sport)
        ? "Meet"
        : "",
      amount: details?.purchase_units[0].amount,
      purchaseID: details?.id,
    };
    submitBadge(payload);
  };

  return (
    <Modal isOpen={addModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create seasonal Badge</ModalHeader>
      <h5 className="text-danger text-center">
        First 5 templates free, then $0.30 each to post
      </h5>
      <ModalBody>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            const isBadgeDataValid = Object.keys(badgeData)
              .filter((key) => key !== "type")
              .every((key) => badgeData[key] !== "");

            if (isBadgeDataValid) {
              if (
                user?.seasonalBadge === undefined ||
                user?.seasonalBadge < 5
              ) {
                const payload = {
                  athleteID: user?.athleteID,
                  ...badgeData,
                  sportType: Games.includes(badgeData?.sport)
                    ? "Games"
                    : Match.includes(badgeData?.sport)
                    ? "Match"
                    : Meets.includes(badgeData?.sport)
                    ? "Meet"
                    : "",
                };
                submitBadge(payload);
              } else {
                setBadgePayment(true);
              }
            } else {
              toast.error("Invalid badgeData: Some Fields are empty.");
            }
          }}
        >
          <Row>
            <Col className="col-6">
              <FormGroup>
                <Label for="exampleSelect">Type</Label>
                <Input
                  id="exampleSelect"
                  name="select"
                  type="select"
                  value={badgeData?.type}
                  onChange={(e) =>
                    setBadgeData({ ...badgeData, type: e.target.value })
                  }
                >
                  <option value="">--Select Type--</option>
                  <option value="Pre">Pre</option>
                  <option value="Post">Post</option>
                </Input>
              </FormGroup>
            </Col>
            <Col className="col-6">
              <FormGroup>
                <Label for="exampleSelect">Season</Label>
                <Input
                  id="exampleSelect"
                  name="select"
                  type="select"
                  value={badgeData?.year}
                  onChange={(e) =>
                    setBadgeData({ ...badgeData, year: e.target.value })
                  }
                >
                  <option>--Select Season--</option>
                  {getNext5Years().map((year) => (
                    <option key={year}>{year}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col className="col-6">
              <FormGroup>
                <Label for="exampleSelect">Sport</Label>
                <Input
                  id="exampleSelect"
                  name="select"
                  type="select"
                  value={badgeData?.sport}
                  onChange={(e) =>
                    setBadgeData({ ...badgeData, sport: e.target.value })
                  }
                >
                  <option>--Select Sport--</option>
                  {allSports?.map((sport) => {
                    return <option value={sport}>{sport}</option>;
                  })}
                </Input>
              </FormGroup>
            </Col>
            <Col className="col-6">
              <FormGroup>
                <Label for="exampleSelect">Number</Label>
                <Input
                  id="exampleSelect"
                  name="select"
                  type="select"
                  value={badgeData?.listNumber}
                  onChange={(e) =>
                    setBadgeData({ ...badgeData, listNumber: e.target.value })
                  }
                >
                  <option>--Select Number--</option>
                  {Array.from({ length: 60 }).map((_, index) => (
                    <option value={index + 1}>{index + 1}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col className="col-6">
              <FormGroup>
                <Label for="exampleManager">Add manager Email</Label>
                <Input
                  id="exampleManager"
                  name="select"
                  type="text"
                  placeholder="Add manager Email"
                  value={managerEmail}
                  onChange={(e) => setManagerEmail(e.target.value)}
                ></Input>
              </FormGroup>
            </Col>
            <Col className="col-6">
              <FormGroup>
                <Label for="exampleSelect">Online Video URL</Label>
                <Input
                  id="exampleSelect"
                  name="select"
                  type="text"
                  placeholder="Video URL"
                  value={badgeData?.videoURL}
                  onChange={(e) =>
                    setBadgeData({
                      ...badgeData,
                      videoURL: e.target.value,
                    })
                  }
                ></Input>
              </FormGroup>
            </Col>
            <Col className="col-6">
              <FormGroup>
                <Label for="exampleSelect">Online URL Price</Label>
                <Input
                  id="exampleSelect"
                  name="select"
                  type="select"
                  value={badgeData?.onlineUrlPrice}
                  onChange={(e) =>
                    setBadgeData({
                      ...badgeData,
                      onlineUrlPrice: e.target.value,
                    })
                  }
                >
                  <option value="">--Select Price--</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="8">8</option>
                </Input>
              </FormGroup>
            </Col>
            <Col className="col-6">
              <FormGroup className="d-flex flex-column">
                <Label for="exampleSelect">QR Code</Label>
                {badgeData?.qrCode && (
                  <div className="position-relative">
                    <img
                      src={URL.createObjectURL(badgeData?.qrCode)}
                      alt=""
                      className="mb-3"
                      width={80}
                      height={80}
                    />
                    <img
                      src={cross}
                      width={20}
                      alt=""
                      className="position-absolute"
                      style={{
                        top: "-11%",
                        left: "39%",
                        cursor: "pointer",
                      }}
                      onClick={() => setBadgeData({ ...badgeData, qrCode: "" })}
                    />
                  </div>
                )}
                {!badgeData?.qrCode && (
                  <Input
                    id="exampleSelect"
                    name="select"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setBadgeData({ ...badgeData, qrCode: file });
                      }
                    }}
                  ></Input>
                )}
              </FormGroup>{" "}
            </Col>
            <Col className="col-6">
              <FormGroup>
                <Label for="exampleSelect">Online QR Price</Label>
                <Input
                  id="exampleSelect"
                  name="select"
                  type="select"
                  value={badgeData?.qrCodePrice}
                  onChange={(e) =>
                    setBadgeData({ ...badgeData, qrCodePrice: e.target.value })
                  }
                >
                  <option value="">--Select Price--</option>
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="16">16</option>
                </Input>
              </FormGroup>{" "}
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Button color="primary" type="submit">
              {loading ? (
                <Spinner size="sm" className="mx-4" />
              ) : (
                "Create Bagde"
              )}
            </Button>
          </Row>
          {badgePayment && (
            <>
              <h5 className="text-center text-danger my-2">
                You have reached your limit of free posts, pay $0.30 to continue
              </h5>
              <div>
                <Paypal
                  price={0.3 + 0.5}
                  getPaypalDetail={getPaypalDetail}
                  setLoading={setLoading}
                />
              </div>
            </>
          )}
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default SeasonalBadgeAddModal;
