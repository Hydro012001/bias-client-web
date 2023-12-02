import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../Screens/CSS/navbar.css";

import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import axios from "axios";
import logoIcon from "../icons/logo.jpg";

import "../Screens/CSS/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMessage } from "@fortawesome/free-solid-svg-icons";

import { Button } from "react-bootstrap";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import NotificationEntrep from "../Screens/Entrepreneur/NotificationEntrep";

export default function NavbarEntrep() {
  const navigate = useNavigate();
  const [numberOfNotif, setNumberOfNotif] = useState([]);
  // const [isNavigationBarOpen, setNavigationBarOpen] = useState(false);
  const userType = localStorage.getItem("userType");

  const [showRequest, setShowRequest] = useState(false);
  // const handleShowSubMenu = () => {
  //   setShowRequest(!showRequest);
  // };

  const user_id = localStorage.getItem("user_id");
  useEffect(() => {
    if (!user_id) {
      navigate("/error");
    }
  }, [user_id, navigate]);

  useEffect(() => {
    if (userType === "investor") {
      axios
        .post(`${process.env.REACT_APP_NETWORK_ADD}/getNotif`, {
          user_id: user_id,
          notif_type: "investment",
        })
        .then((res) => {
          if (res.data.status) {
            const unreadNotif = res.data.result;
            const numofUnreadNotif = unreadNotif.filter((item) => {
              if (item.notif_status === "unread") return item;
            });
            setNumberOfNotif(numofUnreadNotif);
            // console.log(res.data.result);
          }
        })
        .catch((error) => {
          alert(error);
        });
    } else if (userType === "entrepreneur") {
      {
        axios
          .post(`${process.env.REACT_APP_NETWORK_ADD}/getNotif`, {
            user_id: user_id,
            notif_type: "business",
          })
          .then((res) => {
            if (res.data.status) {
              const unreadNotif = res.data.result;
              const numofUnreadNotif = unreadNotif.filter((item) => {
                if (item.notif_status === "unread") return item;
              });
              setNumberOfNotif(numofUnreadNotif);
            }
          })
          .catch((error) => {
            alert(error);
          });
      }
    }
  }, [user_id, userType]);

  const NotifCountNumber = (number) => {
    if (parseInt(number) > 99) {
      const badgeNumb = "99+";
      return badgeNumb;
    } else {
      return number;
    }
  };
  return (
    <>
      <Navbar
        expand="lg"
        className=" mb-3 "
        bg="primary"
        variant={"dark"}
        fixed="top"
      >
        <Container fluid>
          <div>
            <Navbar.Brand href="#home" className="ms-2">
              <img
                src={logoIcon}
                alt="Logo"
                className="rounded-circle img-fluid"
                style={{ height: "30px " }}
              />
            </Navbar.Brand>
            <Button as={NavLink} to={"account/chat"}>
              <FontAwesomeIcon icon={faMessage} size="lg" />
            </Button>
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={
                <Popover
                  id={`popover-positioned-left`}
                  style={{ width: "60rem" }}
                >
                  <Popover.Header as="h3">{`Notifications`}</Popover.Header>
                  <Popover.Body>
                    <NotificationEntrep />
                  </Popover.Body>
                </Popover>
              }
            >
              <Button className="position-relative">
                <FontAwesomeIcon icon={faBell} size="lg" />
                {numberOfNotif.length !== 0 ? (
                  <span
                    class="position-absolute  start-400  translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: ".5rem", top: ".8rem" }}
                  >
                    {NotifCountNumber(numberOfNotif.length)}
                    <span class="visually-hidden">unread messages</span>
                  </span>
                ) : (
                  ""
                )}
              </Button>
            </OverlayTrigger>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to={"account/profile"}>
                Profile{" "}
              </Nav.Link>{" "}
              <Nav.Link as={NavLink} to={"account/business"}>
                Business{" "}
              </Nav.Link>{" "}
              <Nav.Link
                as={NavLink}
                to={"/"}
                onClick={() => localStorage.clear()}
              >
                Logout{" "}
              </Nav.Link>{" "}
              {/* <NavDropdown
                title="Account"
                id={`offcanvasNavbarDropdown-expand-end`}
              >
                <NavDropdown.Item as={NavLink}>Profile</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to={"account/business"}>
                  Business
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink}>Chat</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to={"account/wallet"}>
                  Wallet
                </NavDropdown.Item>

                <NavDropdown.Item
                  as={NavLink}
                  to={"/"}
                  onClick={() => localStorage.clear()}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <Navbar
        expand="end"
        className=" mb-3 "
        bg="primary"
        variant={"dark"}
        fixed="top"
      >
        <Container fluid>
          <Navbar.Brand href="#">
            {" "}
            <img
              src={logoIcon}
              alt="Logo"
              className="rounded-circle img-fluid"
              style={{ height: "30px" }}
            />
          </Navbar.Brand>
          <div className="col-5  d-flex justify-content-end gap-4">
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-end`} />

            <Nav className="justify-content-end flex-grow-1 pe-3"></Nav>
          </div>
        </Container>
      </Navbar> */}

      <Outlet />
    </>
  );
}
