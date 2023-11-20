import React, { useEffect, useState } from "react";
import axios from "axios";

import ListGroup from "react-bootstrap/ListGroup";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
export default function NotificationInvestor({ showNotifBar }) {
  const user_id = localStorage.getItem("user_id");
  const userType = localStorage.getItem("userType");
  const [notifList, setNotifList] = useState([]);
  useEffect(() => {
    if (userType === "investor") {
      axios
        .post(`${process.env.REACT_APP_NETWORK_ADD}:3006/getNotif`, {
          user_id: user_id,
          notif_type: "investment",
        })
        .then((res) => {
          if (res.data.status) {
            const dataResponse = res.data.result;
            const sortedData = dataResponse.sort(
              (a, b) =>
                new Date(b.notif_created_at) - new Date(a.notif_created_at)
            );

            setNotifList(sortedData);
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
  }, [user_id, userType]);

  const [show, setShow] = useState(true);

  const handleClose = () => {
    showNotifBar();
  };

  const handleReadNotif = (notifID) => {
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}:3006/updateNotifstatus`, {
        notif_id: notifID,
      })
      .then((res) => {
        if (res.data.status) {
        } else {
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    // <div className="notif-contianer" style={{ marginTop: "5rem" }}>
    //   <div className="notif-header"></div>
    //   <div className="noti-box">
    //     {notifList.map((item, index) => (
    //       <div className="notif-content" key={index}>
    //         <div>{item.notif_type}</div>
    //         <div className="notif-msg">{item.notif_content}</div>
    //         <div>{new Date(item.notif_timestamp).toDateString()}</div>
    //         <button>View</button>
    //         <button>Remove</button>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <>
      {notifList ? (
        <ListGroup>
          {notifList.map((item) => (
            <ListGroup.Item
              onClick={() => {
                handleReadNotif(item.notif_id);
              }}
              title={`${item.notif_content}`}
              action
              variant={
                item.notif_status === "read"
                  ? "ligth"
                  : item.notif_status === "unread"
                  ? "secondary"
                  : ""
              }
              key={item.notif_id}
              className="mb-2"
            >
              {item.notif_type === "buss_update" ? (
                <div className="d-flex align-items-center gap-2 ">
                  <div class="text-center ">
                    <img
                      src={item.buss_photo}
                      className="rounded-circle"
                      alt="..."
                      style={{ width: `2rem`, height: `2rem` }}
                    />
                  </div>
                  <span
                    className="d-flex flex-column "
                    style={{ width: "11rem" }}
                  >
                    <Nav.Link
                      as={NavLink}
                      to={`/entrepreneur/account/business`}
                    >
                      <label
                        className="text-truncate w-100"
                        style={{ fontSize: ".7rem" }}
                      >
                        {item.notif_content}
                      </label>
                    </Nav.Link>

                    <label style={{ fontSize: ".5rem" }}>
                      {new Date(item.notif_created_at).toLocaleDateString()}
                    </label>
                  </span>
                </div>
              ) : item.notif_type === "investment" ? (
                <div className="d-flex align-items-center gap-2">
                  <div class="text-center ">
                    <img
                      src={item.buss_photo}
                      className="rounded-circle"
                      alt="..."
                      style={{ width: `2rem`, height: `2rem` }}
                    />
                  </div>
                  <span
                    className="d-flex flex-column "
                    style={{ width: "11rem" }}
                  >
                    <Nav.Link as={NavLink} to={`/investor/account/investment`}>
                      <label
                        className="text-truncate w-100"
                        style={{ fontSize: ".7rem" }}
                      >
                        {item.notif_content}
                      </label>
                    </Nav.Link>

                    <label style={{ fontSize: ".5rem" }}>
                      {new Date(item.notif_created_at).toLocaleDateString()}
                    </label>
                  </span>
                </div>
              ) : item.notif_type === "buss_invest" ? (
                <div className="d-flex align-items-center gap-2">
                  <div class="text-center ">
                    <img
                      src={item.investorProfile}
                      className="rounded-circle"
                      alt="..."
                      style={{ width: `2rem`, height: `2rem` }}
                    />
                  </div>
                  <span
                    className="d-flex flex-column "
                    style={{ width: "11rem" }}
                  >
                    <Nav.Link
                      as={NavLink}
                      to={`/entrepreneur/account/business`}
                    >
                      <label
                        className="text-truncate w-100"
                        style={{ fontSize: ".7rem" }}
                      >
                        {item.notif_content}
                      </label>
                    </Nav.Link>

                    <label style={{ fontSize: ".5rem" }}>
                      {new Date(item.notif_created_at).toLocaleDateString()}
                    </label>
                  </span>
                </div>
              ) : item.notif_type === "user" ? (
                <div className="d-flex align-items-center gap-2">
                  <div class="text-center ">
                    <img
                      src={item.investorProfile}
                      className="rounded-circle"
                      alt="..."
                      style={{ width: `2rem`, height: `2rem` }}
                    />
                  </div>
                  <span
                    className="d-flex flex-column "
                    style={{ width: "11rem" }}
                  >
                    <Nav.Link
                      as={NavLink}
                      to={`/entrepreneur/account/business`}
                    >
                      <label
                        className="text-truncate w-100"
                        style={{ fontSize: ".7rem" }}
                      >
                        {item.notif_content}
                      </label>
                    </Nav.Link>

                    <label style={{ fontSize: ".5rem" }}>
                      {new Date(item.notif_created_at).toLocaleDateString()}
                    </label>
                  </span>
                </div>
              ) : (
                ""
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        ""
      )}
    </>
  );
}
