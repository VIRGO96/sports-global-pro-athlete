/*eslint-disable*/
import React, { useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import Logo from "../../assets/img/custom/logo.png";
// reactstrap components
import {
  Button,
  Collapse,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  Modal,
  ModalBody,
} from "reactstrap";
import { logout } from "../../store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getNotification } from "store/actions/notificationAction";

const Sidebar = (props) => {
  const [collapseOpen, setCollapseOpen] = useState();
  const [logoutModal, setLogoutModal] = useState(false);
  let auth = useSelector((state) => state.auth);
  let dispatch = useDispatch();
  const logoutToggle = () => {
    setLogoutModal(!logoutModal);
  };
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  // creates the links that appear in the left menu / Sidebar
  const [show, setShow] = useState(false);
  let { notification } = useSelector((state) => state.notification);

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
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout == "/admin") {
        return (
          <NavItem key={key}>
            <NavLink
              to={prop.layout + prop.path}
              tag={NavLinkRRD}
              onClick={closeCollapse}
              activeClassName="active"
            >
              {/* <i className={prop.icon} /> */}
              <span className="boldClass">{prop.name}</span>
            </NavLink>
          </NavItem>
        );
      }
    });
  };

  const { bgColor, routes, logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  return (
    <>
      {auth.user.chatRate ? null : (
        <div>
          <marquee
            className="marqueeTagset d-md-none d-block"
            direction="right"
            height="100px"
          >
            You need to set chat rate per minute on your profile section
          </marquee>
        </div>
      )}

      <Navbar
        style={auth.user.chatRate ? { top: "0" } : { top: "23px" }}
        className="navbar-vertical fixed-left navbar-light bg-primary custom-sidebar"
        expand="md"
        id="sidenav-main"
      >
        <Container fluid>
          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* User */}
          <Nav className="align-items-center d-md-none">
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
            <Button onClick={logoutToggle}>Logout</Button>
          </Nav>
          {/* Collapse */}
          <Collapse navbar isOpen={collapseOpen}>
            {/* Collapse header */}
            <div className="navbar-collapse-header d-md-none">
              <Row>
                {logo ? (
                  <Col className="collapse-brand" xs="6">
                    {logo.innerLink ? (
                      <Link to="/">
                        <img alt={logo.imgAlt} src={Logo} />
                      </Link>
                    ) : (
                      <a href="/">
                        <img alt={logo.imgAlt} src={Logo} />
                      </a>
                    )}
                  </Col>
                ) : null}
                <Col className="collapse-close" xs="6">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleCollapse}
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
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
            {/* Navigation */}
            <Nav navbar>{createLinks(routes)}</Nav>
            <Nav className="mb-md-3" navbar>
              <NavItem className="nav-bottom mt-2 mt-md-0">
                <NavLink>
                  {/* <i className="ni ni-spaceship" /> */}
                  <Link
                    to={{
                      pathname: `/terms-and-conditions`,
                      search: "?" + `admin`,
                    }}
                    // target='_blank'
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    Terms & Conditions
                  </Link>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
};

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default Sidebar;
