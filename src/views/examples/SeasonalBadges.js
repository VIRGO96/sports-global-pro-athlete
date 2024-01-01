import Header from "components/Headers/Header";
import SeasonalBadgeAddModal from "components/SeasonalBadgeAddModal";
import SeasonalEditModal from "components/SeasonalEditModal";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  Container,
  Row,
  Spinner,
  Table,
  Col,
  Modal,
} from "reactstrap";
import { deleteBadge } from "store/actions/SeasonActions";
import { getSeasonalBages } from "store/actions/SeasonActions";
import image from "../../assets/img/custom/image.png";
const SeasonalBadges = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { seasonLoading, athleteBadges } = useSelector((state) => state.season);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [objToEdit, setObjToEdit] = useState(null);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);

  const Modaltoggle1 = () => setModal1(!modal1);
  const Modaltoggle2 = () => {
    setModal2(!modal2);
    setModal1(false);
  };

  const toggle = () => {
    setAddModal(!addModal);
    setModal2(false);
  };
  const editToggle = () => {
    if (editModal) {
      setObjToEdit(null);
    }
    setEditModal(!editModal);
  };

  useEffect(() => {
    dispatch(getSeasonalBages(user?.athleteID));
  }, []);

  return (
    <>
      <Header />
      <Container fluid>
        <h3 className="text-center mb-3">Seasonal Badges</h3>
        <Card className="p-3">
          <Row className="justify-content-end px-4 mb-3">
            <Button onClick={Modaltoggle1} color="primary" className="float-right">
              Create Bagde
            </Button>
          </Row>
          {seasonLoading ? (
            <Row className="justify-content-center">
              <Spinner size="sm" />
            </Row>
          ) : (
            <Table striped responsive borderless>
              {athleteBadges?.length > 0 ? (
                <>
                  <thead>
                    <tr className="text-center">
                      <th>
                        <strong>#</strong>
                      </th>
                      <th>
                        <strong>Sport</strong>
                      </th>
                      <th>
                        <strong>Season</strong>
                      </th>
                      <th>
                        <strong>Online Price</strong>
                      </th>
                      <th>
                        <strong>QR Code Price</strong>
                      </th>
                      <th>
                        <strong>Actions</strong>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {athleteBadges?.map((item) => {
                      return (
                        <tr className="text-center">
                          <th scope="row">
                            {item?.sportType.toUpperCase() +
                              " - " +
                              item?.listNumber}
                          </th>
                          <td>{item?.sport}</td>
                          <td>{item?.year}</td>
                          <td>${item?.onlineUrlPrice}</td>
                          <td>${item?.qrCodePrice}</td>
                          <td>
                            <Button
                              size="sm"
                              color="primary"
                              className="px-3"
                              onClick={() => {
                                setObjToEdit(item);
                                editToggle();
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              color="danger"
                              onClick={() =>
                                dispatch(deleteBadge(user?.id, item.id))
                              }
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </>
              ) : (
                <>No Badge Exists</>
              )}
            </Table>
          )}
        </Card>
        <SeasonalBadgeAddModal toggle={toggle} addModal={addModal} />
        <SeasonalEditModal
          toggle={editToggle}
          editModal={editModal}
          updateObj={objToEdit}
        />
      </Container>
      <Modal isOpen={modal1} toggle={Modaltoggle1}>
        <Container className="px-2">
          <h2 className=" mt-4 ml-4">
            STEPS FOR MAKING AND POSTING SEASONAL ONLINE VIDEO (OVV)
          </h2>
          <ol className="font-weight-bold">
            <li>Athlete records the video.</li>
            <li>
              Athlete post video on YouTube, selecting visibility as 'Unlisted'
            </li>
            <li>
              Athlete names file by specifying OVV-Sports-year-Pre or Post or
              Blank , game/meet/match/OR turny, and number
            </li>
            <li>Athlete collects URL</li>
            <li>
              Athlete visits upload template for seasonal online view video
            </li>
            <li>athlete inputs OVV</li>
            <li>
              Athlete inputs selection of one of : Game or meet or Match or
              Turny.
            </li>
            <li>Athlete inputs year of season.</li>
            <li>
              Athlete inputs number (as for Game or Meet or Match or Turny)
            </li>
            <li>System requests url</li>
            <li>Athlete input selection for post or pre or leaves blank</li>
            <li>Athlete inputs url</li>
          </ol>
        </Container>
        <div className="d-flex justify-content-end align-items-end mb-2 mr-4">
          <Button className="" color="primary" onClick={Modaltoggle2}>
            Ok
          </Button>
        </div>
      </Modal>
      <Modal isOpen={modal2} toggle={Modaltoggle2} size="xl">
        <Container className="px-2 py-4">
          <Row>
            <Col lg="8">
              <ol className="font-weight-bold ">
                <li>
                  At start of reason , Athlete requests system prepare badge :
                  system adds his name , Id # and photo. athlete accepts.
                </li>
                <li>
                  After accepting basic season badge from system , Athlete
                  adjusts template by adding items he chooses: Sport , year of
                  season, Game or match or meet or Tourn. This is the accepted/
                  adjusted badge base.
                </li>
                <li>Accociated with first game , athlete records a video.</li>
                <li>Athlete stores video on YouTube</li>
                <li>Athlete marks visibility setting as 'Unlisted'</li>
                <li>
                  Athlete collects and saves the URL from YouTube of video he
                  stored.
                </li>
                <li>
                  Athlete proceeds to template where he is directed to use the
                  badge Base and click QR.
                </li>
                <li>
                  Athlete clicking QR on Badge Base template is directed to
                  QRcodechimp where he adds the url which he saved. This adding
                  provides a downloadable static QR code.
                </li>
                <li>
                  Athlete downloads the QR from Qrcodechimp and uploads it into
                  the badge base.
                </li>
                <li>
                  Athlete fills in template including pre or post or blank, the
                  game # , and any text he chooses into the 'type data' spaces.
                  Athlete submits.
                </li>
                <li>Athlete selects price for the seasonal badge.</li>
                <li>Athlete posts the seasonal badge , ready for fan to buy</li>
              </ol>
            </Col>

            <Col className="d-flex justify-content-center align-items-center">
              <img src={image} alt="img" width="90%" />
            </Col>
          </Row>
        </Container>
        <div className="d-flex justify-content-end align-items-end mb-2 mr-4">
          <Button className="" color="primary" onClick={toggle}>
            Ok
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default SeasonalBadges;
