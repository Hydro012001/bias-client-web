import React from "react";
import { Nav } from "react-bootstrap";
import iconlog from "../../icons/logo.jpg";
import { NavLink, Outlet } from "react-router-dom";
function Account(props) {
  return (
    <div>
      {/* <Nav
        defaultActiveKey="/investment"
        className="flex-column align-items-center pt-5 shadow-none  d-flex col-2 mt-5 pe-4"
        style={{ height: "30rem" }}
      >
        <div className="d-flex ps-3  gap-3 justify-content-center align-items-center ">
          <img
            src={iconlog}
            alt="Logo"
            className="rounded-circle float-end img-thumbnail "
            style={{ width: "3rem" }}
          />
          <div className="flex-column d-flex">
            <label className="fw-bold fs-6 ">arvel@gmail.com</label>

            <label style={{ fontSize: "12px" }}>Edit Profile</label>
          </div>
        </div>
        <div className=" row ps-4 pt-3 ">
          <Nav.Link as={NavLink} to={"profile"} className="fw-bold text-dark">
            My Profile
          </Nav.Link>
          <Nav.Link
            to={"investment"}
            as={NavLink}
            className="fw-bold text-dark"
          >
            My Investment
          </Nav.Link>
          <Nav.Link eventKey="link-2" className="fw-bold text-dark">
            Link
          </Nav.Link>
        </div>
      </Nav> */}
      <Outlet />
    </div>
  );
}

export default Account;
