import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import "../Screens/CSS/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBillTrendUp,
  faWallet,
  faPager,
  faChartLine,
  faMessage,
  faUser,
  faBell,
  faBars,
  faRightFromBracket,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import logoIcon from "../icons/logo.jpg";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import NotificationInvestor from "../Screens/Investor/Notification";
import ChatComponent from "../Screens/Chat/ChatComponent";
import { decryptTextId } from "./EncryptIDs";
import ErrorHandler from "../ErrorPage/ErrorHandler";

// import io from "socket.io-client";

// const socket = io("http://localhost:3007", {
//   transports: ["websocket"],
//   upgrade: false,
//   query: {
//     // Specify the origin of the application (either http://localhost:3000 or http://localhost:3001)
//     origin: "http://localhost:3000",
//     userId: localStorage.getItem("user_id"), // Replace with the actual origin of the client application
//   },
// });
export default function NavbarInvestor() {
  const auth = localStorage.getItem("auth");
  const user_id = localStorage.getItem("user_id");
  const [numberOfNotif, setNumberOfNotif] = useState([]);
  const [isNavigationBarOpen, setNavigationBarOpen] = useState(false);
  const [showRequest, setShowRequest] = useState(false);
  const userType = localStorage.getItem("userType");
  const [showChatbot, setShowChatBot] = useState(false);
  const [showOutlet, setShowOutlet] = useState(false);
  const navigate = useNavigate();
  const handleShowSubMenu = () => {
    setShowRequest(!showRequest);
  };

  useEffect(() => {
    try {
      const authValue = decryptTextId(auth);
      if (authValue !== "authorized") {
        navigate("/login");
        alert("You are not authrized in this page. Please go back to login");
        setShowOutlet(false);
      } else {
        setShowOutlet(true);
      }
    } catch (error) {
      navigate("/login");
      alert("You are not authrized in this page. Please go back to login");
    }
  }, [auth]);

  useEffect(() => {
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
        }
      })
      .catch((error) => {
        ErrorHandler(error, navigate);
      });
  }, [user_id]);

  // useEffect(() => {
  //   axios
  //     .post(`${process.env.REACT_APP_NETWORK_ADD}/getNotif`, {
  //       user_id: user_id,
  //     })
  //     .then((res) => {
  //       if (res.data.status) {
  //         setNumberOfNotif(res.data.result);
  //       } else {
  //         console.log(res.data.message);
  //       }
  //     });
  // }, []);
  const NotifCountNumber = (number) => {
    if (parseInt(number) > 99) {
      const badgeNumb = "99+";
      return badgeNumb;
    } else {
      return number;
    }
  };

  const handleShowChatbot = () => {
    setShowChatBot(!showChatbot);
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
            {" "}
            <Navbar.Brand href="#home">
              {" "}
              <img
                src={logoIcon}
                alt="Logo"
                className="rounded-circle img-fluid"
                style={{ height: "30px" }}
              />
            </Navbar.Brand>
            {/* <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={
                <Popover id={`popover-positioned-left`}>
                  <Popover.Body>
                    <Chatbots />
                  </Popover.Body>
                </Popover>
              }
            >
             
            </OverlayTrigger> */}
            <Button as={NavLink} to={"/investor/chat"}>
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
                    <NotificationInvestor />
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
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to={"feeds/list/all/category/all"}>
                Feeds{" "}
              </Nav.Link>{" "}
              <Nav.Link as={NavLink} to={"account/investment"}>
                Investment{" "}
              </Nav.Link>
              <Nav.Link as={NavLink} to={"account/profile"}>
                Profile{" "}
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to={"/"}
                onClick={() => localStorage.clear()}
              >
                Logout{" "}
              </Nav.Link>
              {/* <NavDropdown
                title="Account"
                id={`offcanvasNavbarDropdown-expand-end`}
              >
                <NavDropdown.Item as={NavLink} to={"account/profile"}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to={"account/business"}>
                  Business
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to={"account/chat"}>
                  Chat
                </NavDropdown.Item>
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
      {showOutlet ? <Outlet /> : ""}
    </>
  );
}
