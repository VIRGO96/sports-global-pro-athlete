import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Paypal from "components/Paypal";
import firebase from "../../../config/firebase";
import { createShopOrder } from "store/actions/shopAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const ShopUser = () => {
  let docID = uuidv4();
  const [quantity, setQuantity] = useState("");
  const [pack, setPack] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [state, setState] = useState("");
  const [getAllStates, setGetAllStates] = useState("");
  const [getAllCities, setGetAllCities] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [appartment, setAppartment] = useState("");
  const [postCode, setPostCode] = useState("");
  const [shippingFee, setShippingFee] = useState(1.99);
  const [signAmount, setSignAmount] = useState("");
  const [totalSignAmount, setTotalSignAmount] = useState("");
  const [posterAmount, setPosterAmount] = useState("");
  const [totalPoserAmount, setTotalPoserAmount] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [checkOut, setCheckOut] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name } = useParams();
  let history = useHistory();
  const dispatch = useDispatch();
  const handleSignNumber = (value) => {
    setSignAmount(value);
  };
  const handlePosterAmount = (value) => {
    setPosterAmount(value);
  };
  const defaultStateProps = {
    options:
      getAllStates.length > 0
        ? getAllStates.map((insti) => {
            return insti.name;
          })
        : [],
    getOptionLabel: (option) => option,
  };
  const defaultCitiesProps = {
    options: getAllCities.length > 0 ? getAllCities : [],
    getOptionLabel: (option) => option,
  };

  const getPaypalDetail = (details) => {
    var amount = {
      value: Number(totalAmount).toFixed(2),
      currency_code: "USD",
    };
    let obj = {
      firstName: firstName,
      lastName: lastName,
      state: state,
      city: city,
      appartment: appartment,
      address: address,
      postalCode: postCode,
      companyName: companyName,
      amount: amount,
      order_id: details.id,
      docID: docID,
      country: "US",
      quantity: quantity,
      type:
        name == "sign" ? "Scroll Sign" : name == "poster" ? "poster" : "both",
      created_at: firebase.firestore.Timestamp.now(),
      via: "paypal",
    };
    if (pack !== "") {
      obj.pack = pack;
    }
    dispatch(
      createShopOrder({
        obj,
        onSuccess: () => {
          toast.success(
            name == "sign"
              ? "Scroll Sign purchased successfully"
              : name == "poster"
              ? "Poster purchased successfully"
              : "Both Scroll Sign And Poster purchased successfully"
          );
          setCheckOut(false);
          setFirstName("");
          setLastName("");
          setState("");
          setCity("");
          setAppartment("");
          setAddress("");
          setPostCode("");
          setTotalAmount("");
          setSignAmount("");
          setPosterAmount("");
          setCompanyName("");
        },
      })
    );
  };

  useEffect(() => {
    setTotalSignAmount(signAmount * 2.99);
    setTotalPoserAmount(posterAmount * 1.99);
    setTotalAmount(
      Number(totalSignAmount) + Number(totalPoserAmount) + Number(shippingFee)
    );
  }, [posterAmount, signAmount, totalPoserAmount, totalSignAmount]);

  useEffect(() => {
    var session_url = "https://countriesnow.space/api/v0.1/countries/states";

    axios
      .post(session_url, {
        country: "United States",
      })
      .then((response) => {
        setGetAllStates(response.data.data.states);
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  }, []);
  useEffect(() => {
    if (state) {
      var session_url =
        "https://countriesnow.space/api/v0.1/countries/state/cities";

      axios
        .post(session_url, {
          country: "United States",
          state: state,
        })
        .then((response) => {
          setGetAllCities(response.data.data);
        })
        .catch((error) => {
          alert(error.response.data.error);
        });
    }
  }, [state]);
  const paymentFields = () => {
    if (name == "sign") {
      return (
        <>
          <Row>
            <Col md={6}>
              <Label className="pt-2">
                <b>Number Needed of Signs:</b>
              </Label>
              <Input
                required
                type="text"
                value={signAmount}
                onChange={(e) => {
                  handleSignNumber(e.target.value);
                  setQuantity(e.target.value);
                }}
                className="inputSet"
                placeholder="Your Number Of Signs"
              />
            </Col>
            <Col></Col>
          </Row>
        </>
      );
    } else if (name == "poster") {
      return (
        <>
          <Row>
            <Col md={6}>
              <Label className="pt-2">
                <b>Pack of(10)--how many ‘10-Packs’? </b>
              </Label>
              <Input
                required
                type="text"
                value={posterAmount}
                onChange={(e) => {
                  handlePosterAmount(e.target.value);
                  setQuantity(e.target.value);
                }}
                className="inputSet"
                placeholder="Your Number Of 10-Packs"
              />
            </Col>
            <Col></Col>
          </Row>
        </>
      );
    } else {
      return (
        <Row>
          <Col md={6}>
            <Label className="pt-2">
              <b>Number Needed of Signs:</b>
            </Label>
            <Input
              required
              type="text"
              value={signAmount}
              onChange={(e) => {
                handleSignNumber(e.target.value);
                setQuantity(e.target.value);
              }}
              className="inputSet"
              placeholder="Your Number Of Signs"
            />
          </Col>
          <Col md={6}>
            <Label className="pt-2">
              <b>Pack of(10)--how many ‘10-Packs’? </b>
            </Label>
            <Input
              required
              type="text"
              value={posterAmount}
              onChange={(e) => {
                handlePosterAmount(e.target.value);
                setPack(e.target.value);
              }}
              className="inputSet"
              placeholder="Your Number Of 10-Packs"
            />
          </Col>
        </Row>
      );
    }
  };

  return (
    <>
      <div
        onClick={history.goBack}
        className="ml-2 ml-md-5 mt-2 backBtn d-flex justify-content-center align-items-center pointer"
      >
        <i class="fas fa-chevron-left fa-lg"></i>
      </div>
      <div className="no-gutters justify-content-center row">
        <div className="col-lg-8 px-3 px-md-0">
          <div className="complaint-card mt-2 mb-3">
            <div className="pt-2 pt-lg-5 pl-2 pl-lg-5 pr-2 pr-lg-5 pb-3">
              <Form>
                <Row>
                  <Col md={2}></Col>

                  <Col md={8}>
                    <Label className="mb-0">
                      <b>Company (Optional):</b>
                    </Label>
                    <Input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="inputSet"
                      placeholder="Your Company Name"
                    />
                  </Col>
                  <Col md={2}></Col>
                </Row>
                <Row className="mt-2">
                  <Col md={6}>
                    <Label>
                      <b>First Name:</b>
                    </Label>
                    <Input
                      required
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="inputSet"
                      placeholder="Your First Name"
                    />
                  </Col>
                  <Col md={6}>
                    <Label className="pt-2 pt-md-0">
                      <b>Last Name:</b>
                    </Label>
                    <Input
                      required
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="inputSet"
                      placeholder="Your Last Name"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Label className="pt-2">
                      <b>State:</b>
                    </Label>
                    <Autocomplete
                      {...defaultStateProps}
                      id="auto-complete"
                      autoComplete
                      includeInputInList
                      disableClearable={true}
                      disableListWrap
                      value={state}
                      freeSolo
                      onChange={(e, val) => {
                        setState(val);
                        setCity("");
                      }}
                      renderInput={(params) => (
                        <TextField {...params} variant="standard" />
                      )}
                    />
                  </Col>
                  <Col md={6}>
                    <Label className="pt-2">
                      <b>City:</b>
                    </Label>
                    <Autocomplete
                      {...defaultCitiesProps}
                      id="auto-complete"
                      autoComplete
                      includeInputInList
                      loading={getAllCities.length > 0 ? false : true}
                      disableClearable={true}
                      disableListWrap
                      value={city}
                      freeSolo
                      onChange={(e, val) => {
                        setCity(val);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} variant="standard" />
                      )}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Label className="pt-2">
                      <b>Street Address:</b>
                    </Label>
                    <Input
                      required
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="inputSet"
                      placeholder="Your Address"
                    />
                  </Col>
                  <Col md={6}>
                    <Label className="pt-2">
                      <b>Appartment No:</b>
                    </Label>
                    <Input
                      required
                      type="text"
                      value={appartment}
                      onChange={(e) => setAppartment(e.target.value)}
                      className="inputSet"
                      placeholder="Your Appartment No"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Label className="pt-2">
                      <b>Postal Code:</b>
                    </Label>
                    <Input
                      required
                      type="text"
                      value={postCode}
                      onChange={(e) => setPostCode(e.target.value)}
                      className="inputSet"
                      placeholder="Your Postal Code"
                    />
                  </Col>
                  <Col md={6}>
                    <Label className="pt-2">
                      <b>Flat Rate Fee For Shipping:</b>
                    </Label>
                    <div className="dollarSignOuter">
                      <i className="fas fa-dollar-sign fa-lg dollarSign"></i>
                      <Input
                        required
                        type="text"
                        className="inputSet pl-4"
                        value={shippingFee}
                        readOnly
                      />
                    </div>
                  </Col>
                </Row>
                {paymentFields()}
                <Row>
                  <Col md={6}>
                    <Label className="pt-2">
                      <b>Total Amount:</b>
                    </Label>
                    <div className="dollarSignOuter">
                      <i className="fas fa-dollar-sign fa-lg dollarSign"></i>{" "}
                      <Input
                        required
                        type="text"
                        className="inputSet pl-4"
                        value={Number(totalAmount).toFixed(2)}
                        readOnly
                      />
                    </div>
                  </Col>
                </Row>

                <div className="d-flex justify-content-end mt-4">
                  {checkOut ? (
                    <div>
                      <Paypal
                        setLoading={setLoading}
                        description={
                          name == "sign"
                            ? `ORDER PAYMENT - A sign was bought with payment ${totalAmount}} order id ${docID}`
                            : name == "poster"
                            ? `ORDER PAYMENT - A poster was bought with payment ${totalAmount} order id ${docID}`
                            : `ORDER PAYMENT - Both poster and sign was bought with payment ${totalAmount} order id ${docID}`
                        }
                        price={Number(totalAmount).toFixed(2)}
                        getPaypalDetail={getPaypalDetail}
                      />
                    </div>
                  ) : (
                    <Button
                      className="submitBtn"
                      color="primary"
                      type="submit"
                      onClick={() => {
                        setCheckOut(true);
                      }}
                      disabled={
                        name == "sign"
                          ? !firstName ||
                            !lastName ||
                            !state ||
                            !city ||
                            !appartment ||
                            !address ||
                            !postCode ||
                            !signAmount
                          : name == "poster"
                          ? !firstName ||
                            !lastName ||
                            !state ||
                            !city ||
                            !appartment ||
                            !address ||
                            !postCode ||
                            !posterAmount
                          : !firstName ||
                            !lastName ||
                            !state ||
                            !city ||
                            !appartment ||
                            !address ||
                            !postCode ||
                            !signAmount ||
                            !posterAmount
                      }
                    >
                      Pay Now
                    </Button>
                  )}
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopUser;
