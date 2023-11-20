import { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/investment.css";
import Loader from "../../Components/loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import AccumalatedAmt from "../../Components/AccumalatedAmt";
import { Nav } from "react-bootstrap";
import iconlog from "../../icons/logo.jpg";
import { NavLink } from "react-router-dom";
import { computeDateStart } from "../../Utils/Compute";

export default function Investment() {
  const user_id = localStorage.getItem("user_id");
  const [investments, setInvestment] = useState([]);
  const [todayDate, setTodayDate] = useState("");
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}:3006/investment`, {
        user_id: user_id,
      })
      .then((res) => {
        if (res.data.status) {
          setInvestment(res.data.result);
          setTodayDate(res.data.todayDate);
          console.log(res.data.result);
        } else {
          return (
            <div>
              <h1>No Data</h1>
            </div>
          );
        }
      })
      .catch((error) => alert(error));
  }, [user_id]);

  return (
    <>
      {/* <div className="investment" style={{ marginTop: "5rem" }}>
        <div className="investment-container">
          <div className="header-investment">
            <p>Investment Details</p>
          </div>
          <div className="filter-header">
            <div>
              <select>
                <option>Filter</option>
                <option>Recent</option>
                <option>Approved</option>
                <option>Progress</option>
              </select>
            </div>
            <input type="text" placeholder="Search investment" />
          </div>
          <div className="invest-feed-container">
            {investments.map((item, index) => (
              <div key={item.invst_id}>
                <div className="investment-feeds">
                  <div className="header-feeds">
                    <p>{item.buss_name}</p>
                  </div>
                  <div className="investment-details">
                    <div className="title-image">
                      <div className="investment-title"></div>
                      <div className="investment-image">
                        {ImageLoaded ? (
                          <img
                            src={item.buss_photo}
                            alt="Logo"
                            id="investment-image"
                            onLoad={() => setImageLoaded(true)}
                          />
                        ) : (
                          <div>
                            <Loader />
                            <img
                              src={item.buss_photo}
                              alt="Logo"
                              id="investment-image"
                              onLoad={() => setImageLoaded(true)}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <span id="investment-details">
                      <p>Investment Amount:</p>{" "}
                      <p id="text"> {parseFloat(item.invst_amt).toFixed(2)}</p>
                    </span>

                    <span id="investment-details">
                      <p>Invest Status:</p>
                      <p id="text"> {item.invst_status}</p>
                    </span>
                    <span id="investment-details">
                      <p>No. Month: </p> <p id="text">{item.invst_num_month}</p>
                    </span>
                    <span id="investment-details">
                      <p>Invesment Interest: </p>{" "}
                      <p id="text"> {item.invst_interest}</p>
                    </span>
                    <span id="investment-details">
                      <p>Investment Type: </p>{" "}
                      <p id="text"> {item.invst_type}</p>
                    </span>
                    <span id="investment-details">
                      <p>Business name: </p> <p id="text"> {item.buss_name}</p>
                    </span>
                    <span id="investment-details">
                      <p>Entrepreneur Name: </p>{" "}
                      <p id="text">
                        {" "}
                        {item.entrepFname} {item.entrepMname} {item.entrepLname}
                      </p>
                    </span>
                    <span id="investment-details">
                      <p>Entrepreneur Contact No.: </p>{" "}
                      <p id="text"> {item.entrepContact}</p>
                    </span>
                    <span></span>
                    <AccumalatedAmt buss_id={item.buss_id} />
                  </div>

                  <div
                    onClick={() => handleShowExpand(index)}
                    className="expand-button"
                    title="Click to show investment installments"
                  >
                    {showExpand[index] ? (
                      <>
                        <p>Show less</p>

                        <FontAwesomeIcon
                          icon={faArrowUp}
                          className="icon-close"
                        />
                      </>
                    ) : (
                      <>
                        <p>Show more</p>
                        <FontAwesomeIcon icon={faArrowUp} className="icon-up" />
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      <div className="contianer d-flex   pt-2 gap-3 ">
        <div className="w-100 position-relative ">
          <Nav
            justify
            variant="underline"
            defaultActiveKey="/investor"
            style={{ height: "4rem", width: "100%" }}
            className="d-flex flex-row align-items-center mt-5 ps-3 mb-5 z-index-2  shadow-none border position-fixed bg-light"
          >
            <Nav.Item>
              <Nav.Link to={"/investor/investment"} as={NavLink}>
                All
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-1">In Progress</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-2">Completed</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-3">Returned</Nav.Link>
            </Nav.Item>
          </Nav>
          <div className="mt-5 pt-5 d-flex flex-column justify-content-center p-2">
            <div class="d-flex mb-3 mt-5">
              <button
                class="input-group-text bg-primary text-light"
                id="inputGroup-sizing-default"
              >
                Search
              </button>
              <input
                type="text"
                placeholder="You can search investment id, investment type and business type"
                class="form-control"
                aria-label="Sizing example input"
              />
            </div>
            {investments ? (
              <>
                {investments.map((item) => (
                  <div
                    className="border d-flex  flex-column  pb-4 mb-4"
                    style={{ width: "100%" }}
                    key={item.invst_id}
                  >
                    <div className="d-flex align-items-center pt-3 pb-3 justify-content-between">
                      <span className=" w-md d-flex align-items-center gap-4 ps-2">
                        <label className="fw-bold">{`${item.user_fname} ${item.user_mname} ${item.user_lname}`}</label>
                        <button
                          type="button"
                          class="btn btn-outline-primary border border-2 border-primary"
                        >
                          View Business
                        </button>
                      </span>
                      <span className="w-50 d-flex align-items-center justify-content-end gap-4 me-3">
                        <label>
                          {item.invst_start_date ? (
                            <>
                              {computeDateStart(
                                new Date(item.invst_start_date),
                                new Date(todayDate)
                              )}
                            </>
                          ) : (
                            "In Progress"
                          )}
                        </label>
                      </span>
                    </div>
                    <div className="border-top border-bottom d-flex pt-4 pb-4 gap-2">
                      <img
                        src={item.buss_photo}
                        alt="Logo"
                        style={{ width: "8rem", height: "8rem" }}
                      />
                      <span className="d-flex flex-column">
                        <label className="fw-bold">
                          {item.buss_name}, {item.buss_type},{" "}
                          {item.buss_type_name}
                        </label>
                        <label>Amount Invest: ₱ {item.invst_amt}</label>
                        <label>{item.invst_num_month} months</label>
                        <label>Interest: {item.invst_interest}%</label>
                        <label>Total Interest: {item.invst_interest_sum}</label>
                        <label>
                          <label className="fw-bold">Total Return</label> ₱{" "}
                          {item.invst_returned_amt}{" "}
                        </label>
                      </span>
                    </div>
                    <div className="w-100 pt-4 d-flex justify-content-end gap-4">
                      <button type="button" class="btn btn-danger">
                        Delete
                      </button>
                      <button type="button" class="btn btn-secondary">
                        Update
                      </button>
                      <button type="button" class="btn btn-primary">
                        More
                      </button>
                      <button type="button" class="btn btn-success ">
                        Withdraw
                      </button>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}
