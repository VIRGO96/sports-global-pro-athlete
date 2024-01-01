import React, { useState } from "react";
import {
  Navbar,
  Container,
  NavbarBrand,
  Button,
  Modal,
  ModalBody,
} from "reactstrap";
import copy from "copy-to-clipboard";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/authActions";
import Logo from "../../assets/img/custom/logo.png";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { getNotification } from "store/actions/notificationAction";
import { sendEmailToFanNotification } from "store/actions/notificationAction";
const AdminNavbar = (props) => {
  const [logoutModal, setLogoutModal] = useState(false);
  const [show, setShow] = useState(false);
  let dispatch = useDispatch();
  let auth = useSelector((state) => state.auth);
  let { notification } = useSelector((state) => state.notification);
  const logoutToggle = () => {
    setLogoutModal(!logoutModal);
  };
  const toggle = () => {
    setShow(!show);
  };
  useEffect(() => {
    dispatch(getNotification(auth.uid));
  }, []);
  const sendEmail = (obj) => {
    let payload = {
      fanEmail: obj.fanEmail,
      id: obj.id,
    };
    dispatch(sendEmailToFanNotification(payload));
    setShow(false);
  };
  return (
    <>
      {auth.user.chatRate ? null : (
        <div>
          <marquee
            className="marqueeTagset d-none d-md-block"
            direction="right"
            height="100px"
          >
            You need to set chat rate per minute on your profile section
          </marquee>
        </div>
      )}

      <Navbar
        className={
          auth.user.chatRate
            ? "navbar-topBanner bg-white d-none d-md-flex"
            : "navbar-top bg-white d-none d-md-flex"
        }
        expand="md"
        id="navbar-main"
      >
        <NavbarBrand className="pt-0" href="/">
          <img className="mx-2" alt={Logo} src={Logo} height="70px" />
        </NavbarBrand>
        <Container fluid>
          <div className="mx-auto">
            <div className="text-center">
              <strong className="text-dark pointer">Watch </strong>
              <strong className="text-primary pointer">/ Like </strong>
              <strong className="text-danger pointer">/ Share</strong>
            </div>
            <div className="d-flex mt-1">
              <a href="https://youtu.be/yxfs0nlQwTg" target="_blank">
                https://youtu.be/yxfs0nlQwTg
              </a>
              <Button
                size="sm"
                className="bg-dark ml-2 text-white"
                onClick={() => {
                  copy("https://youtu.be/yxfs0nlQwTg");
                  toast.success("Link Copied");
                }}
              >
                Copy
              </Button>
            </div>
          </div>
          <div>
            {notification.length > 0 ? (
              <>
                <Button
                  className="bg-transparent border-0 nav-notification"
                  onClick={toggle}
                >
                  <i className="fa fa-solid fa-bell notification"></i>
                </Button>
              </>
            ) : (
              <Button className="bg-transparent border-0 nav-notification">
                <i className="fa fa-solid fa-bell" onClick={toggle}></i>
              </Button>
            )}
            {!show ? null : (
              <>
                <div className="dropDown">
                  {notification.length > 0 ? (
                    notification.map((items, index) => {
                      return (
                        <>
                          <div className="text-center my-2">
                            A Sports Fan named {items.fanName} just bought a
                            badge from you.Would you like to send this Fan an
                            email telling Fan you are ready to chat with him or
                            her? Button below sends that email.You can also
                            check the Question Database on your Chat Home Page
                            to see if this Fan has already posted a question you
                            wish to answer.If yes, you can click one of the
                            'arrange chat' buttons on Chat Home page to set up
                            Chat.
                          </div>
                          <hr />
                          <div className="text-right">
                            <Button
                              color="primary my-3"
                              onClick={() => sendEmail(items)}
                            >
                              Send Email to Fan who Bought my badge
                            </Button>
                          </div>
                          <hr />
                        </>
                      );
                    })
                  ) : (
                    <p className="text-center">no new notification</p>
                  )}
                </div>
              </>
            )}

            <Button className="bg-transparent border-0" onClick={logoutToggle}>
              Logout
            </Button>
          </div>
        </Container>
      </Navbar>
      <Modal isOpen={logoutModal} centered toggle={logoutToggle}>
        <ModalBody>
          <div className="text-center">
            <i
              className="fa fa-sign-out-alt text-primary"
              style={{ fontSize: 70 }}
            ></i>
            <br />
            <br />
            <span className="mt-5" style={{ fontSize: 30 }}>
              Are you sure?
            </span>
            <br />
            <br />
            <span className="mt-5" style={{ fontSize: 16 }}>
              You want to logout.
            </span>
            <br />
            <br />
            <br />
            <Button color="secondary" onClick={logoutToggle}>
              Cancel
            </Button>{" "}
            <Button color="primary" onClick={() => dispatch(logout())}>
              Logout
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default AdminNavbar;
