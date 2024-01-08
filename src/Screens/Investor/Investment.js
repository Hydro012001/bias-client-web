import { useEffect, useState } from "react";
import axios from "axios";

import Loader from "../../Components/loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import AccumalatedAmt from "../../Components/AccumalatedAmt";
import {
  Button,
  Container,
  Dropdown,
  Modal,
  Nav,
  Navbar,
  Form,
  ToastContainer,
  Toast,
} from "react-bootstrap";
import iconlog from "../../icons/logo.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { computeDateStart } from "../../Utils/Compute";
import UpdateInvestmentModa from "../../Components/DisplayBusiness/UpdateInvestmentModa";
import { decryptId, encryptId } from "../../Components/Encryptor";
import { encrypTextId } from "../../Components/EncryptIDs";
import Typewriter from "typewriter-effect";
import StarRatings from "react-star-ratings";

export default function Investment() {
  const user_id = localStorage.getItem("user_id");
  const [investments, setInvestment] = useState([]);
  const [todayDate, setTodayDate] = useState("");
  const [show, setShow] = useState(false);
  const [rating, setRatings] = useState(0);
  const [feedbackShow, setfeedbackShow] = useState(false);
  const [showUpdateModalForm, setShowUpdatModalForm] = useState(false);
  const [withdrawResult, setwithdrawResult] = useState([]);
  const navigate = useNavigate();
  const [emailPaypal, setEmailPaypal] = useState("");
  const [amountWithdraw, setAmountWithdraw] = useState(0);
  const [withdrawInvstID, setwithdrawInvstID] = useState("");
  const [EntrepProfile, setEntrepProfile] = useState("");
  const [EntrepName, setEntrepName] = useState("");
  const [EntrepId, setEntrepId] = useState("");
  const [feedbackContent, setFeedbackContent] = useState("");
  const [invstId, setInvstId] = useState("");
  const [category, setCategory] = useState("all");
  const [showToast, setshowToast] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("");
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}/investment`, {
        user_id: user_id,
      })
      .then((res) => {
        if (res.data.status) {
          setInvestment(res.data.result);
          setTodayDate(res.data.todayDate);
          // localStorage.setItem(
          //   "invest_update_data",
          //   encryptId(res.data.resultUpdateInvste)
          // );
          setwithdrawResult(res.data.withdrawResutl);
        } else {
          return (
            <div>
              <h1>No Data</h1>
            </div>
          );
        }
      })
      .catch((error) => {
        setAlertMsg(error.message);
        setAlertType("success");
        setshowToast("danger");
      });
  }, [user_id]);

  const handleShowUpdateModalForm = (bussid, invstid, data) => {
    localStorage.setItem("investmentData", encryptId(data));
    navigate(
      `/investor/investment-update?buss_id=${encodeURIComponent(
        bussid
      )}&invst_id=${encodeURIComponent(invstid)}`
    );

    // axios.post(`${process.env.REACT_APP_NETWORK_ADD}/investment`,{

    // });
  };

  const checkUserHasWithdrawRequest = (invst_id) => {
    if (withdrawResult.length > 0) {
      const status = withdrawResult.filter(
        (item) => item.withdraw_invst_id === invst_id
      );

      if (status.length > 0) {
        if (
          status[0].withdraw_status === "request" ||
          status[0].withdraw_status === "send" ||
          status[0].withdraw_status === "receive" ||
          status[0].withdraw_status === "cancel"
        ) {
          return { value: true, status: status[0].withdraw_status };
        } else {
          return { value: false };
        }
      } else {
        return { value: false };
      }
    } else {
      return { value: false };
    }
  };

  const calculateReaminingMonths = (todaydate, startDate, endDate) => {
    const monthsFromStart =
      todaydate.getMonth() -
      startDate.getMonth() +
      12 * (todaydate.getFullYear() - startDate.getFullYear());

    // Calculate the difference in months between the start date and end date
    const totalMonths =
      endDate.getMonth() -
      startDate.getMonth() +
      12 * (endDate.getFullYear() - startDate.getFullYear());

    // Calculate the remaining months
    const totaRemains = totalMonths - monthsFromStart;

    if (totaRemains < 0) {
      return 0;
    } else {
      return totaRemains;
    }
  };

  const handleRequestWithdraw = () => {
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}/requestWithdraw`, {
        amountWithdraw,
        emailPaypal,
        withdrawInvstID,
      })
      .then((res) => {
        if (res.data.status) {
          setAlertMsg(res.data.message);
          setAlertType("success");
          setshowToast(true);
          window.location.reload();
        } else {
          setAlertMsg(res.data.message);
          setAlertType("danger");
          setshowToast(true);
        }
      })
      .catch((error) => {
        setAlertMsg(error.message);
        setAlertType("danger");
        setshowToast(true);
      });
  };

  const handleClose = () => {
    setShow(!show);
  };
  const handleFeedbackClose = () => {
    setfeedbackShow(false);
  };

  const handleFeedbackShow = (profile, name, id, invstId) => {
    setEntrepProfile(profile);
    setEntrepName(name);
    setEntrepId(id);
    setInvstId(invstId);
    setfeedbackShow(true);
  };

  const changeRating = (newRating) => {
    setRatings(newRating);
    // You can perform additional actions here based on the new rating
  };
  const handleSubmitFeedback = () => {
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}/submitfeedback`, {
        feedbackContent,
        rating,
        EntrepId,
        invstId,
      })
      .then((res) => {
        if (res.data.status) {
          alert(res.data.message);
          window.location.reload();
        } else {
          alert(res.data.message);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  useEffect(() => {
    const sortedData = investments.sort((a, b) => {
      const dateA = new Date(a.invst_created_at);
      const dateB = new Date(b.invst_created_at);

      if (dateA >= new Date(startDate) && dateA <= new Date(endDate)) {
        if (dateB >= new Date(startDate) && dateB <= new Date(endDate)) {
          return dateA - dateB;
        } else {
          return -1; // 'a' is within the range, but 'b' is not, so 'a' comes first
        }
      } else if (dateB >= new Date(startDate) && dateB <= new Date(endDate)) {
        return 1; // 'b' is within the range, but 'a' is not, so 'b' comes first
      } else {
        return 0; // both 'a' and 'b' are outside the range, their order doesn't matter
      }
    });

    setInvestment(sortedData);
  }, [startDate, endDate]);
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
      {showToast ? (
        <ToastContainer position="top-center" className="p-3">
          <Toast
            className="d-inline-block m-1"
            bg={alertType}
            show={showToast}
            delay={3000}
            onClose={() => setshowToast(false)}
            autohide
          >
            <Toast.Body className="primary text-light">{alertMsg}</Toast.Body>
          </Toast>
        </ToastContainer>
      ) : (
        ""
      )}

      <div className="contianer mt-5 pt-3 gap-3 ">
        {" "}
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary ">
          <Container fluid>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto" variant="pills">
                {" "}
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    Type
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setCategory("all")}>
                      All
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setCategory("request")}>
                      Request
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setCategory("approved")}>
                      Approved
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setCategory("started")}>
                      Started
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setCategory("cancel")}>
                      Cancelled
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setCategory("complete")}>
                      Complete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>

              <Form className="d-flex align-items-center gap-2">
                <label className="w-50">Start Date</label>
                <Form.Control
                  type="date"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Form>
              <Form className="d-flex align-items-center gap-2">
                <label className="w-50">End Date</label>
                <Form.Control
                  type="date"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Withdrawal Request </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                id="floatingInput"
                onChange={(e) => setEmailPaypal(e.target.value)}
                placeholder="name@example.com"
              />
              <label for="floatingInput">Enter you paypal email address</label>
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Amount to Withdraw
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                readOnly
                value={amountWithdraw}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleRequestWithdraw}>
              Withdraw
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={feedbackShow} onHide={handleFeedbackClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Give you feedback and ratings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center align-items-center flex-column">
              <img
                src={EntrepProfile}
                alt="Enrtep Profile"
                className="rounded-circle shadow-sm mb-2"
                style={{ width: "10rem", height: "10rem" }}
              />
              <label className="fw-bold mb-3">{EntrepName}</label>
              <StarRatings
                rating={rating}
                starRatedColor="yellow"
                changeRating={changeRating}
                numberOfStars={5}
                name="rating"
              />
              <div class="form-floating w-75">
                <textarea
                  class="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea"
                  style={{ height: "10rem" }}
                  onChange={(e) => setFeedbackContent(e.target.value)}
                ></textarea>
                <label for="floatingTextarea">Feedback</label>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleFeedbackClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmitFeedback}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        <div className=" d-flex flex-column justify-content-center p-2">
          {investments ? (
            <>
              {investments.map((item) => (
                <div
                  className="border d-flex  flex-column  pb-4 mb-4"
                  style={{ width: "100%" }}
                  key={item.invst_id}
                >
                  {category === "all" ? (
                    <>
                      <div className="d-flex align-items-center pt-3 pb-3 justify-content-between">
                        <span className="w-50 w-md d-flex align-items-center gap-4 ps-2">
                          <label className="fw-bold">{`${item.user_fname} ${item.user_mname} ${item.user_lname}`}</label>
                          {/* <button
                            type="button"
                            class="btn btn-outline-primary border border-2 border-primary"
                          >
                            View Business
                          </button> */}
                        </span>
                        {item.invst_start_date && item.invst_end_date ? (
                          <>
                            {checkUserHasWithdrawRequest(item.invst_id)
                              .status === "send" ? (
                              <>
                                {" "}
                                {new Date(todayDate) >=
                                  new Date(item.invst_end_date) &&
                                item.invst_status === "started" ? (
                                  <div className=" d-flex bg-secondary align-items-center w-50 justify-content-center">
                                    <Typewriter
                                      options={{
                                        strings: [
                                          "Your withdrawal amount has been send",
                                          "Click the recieve button to complete the transactions.",
                                        ],
                                        autoStart: true,
                                        loop: true,
                                        deleteSpeed: 30,
                                        delay: 70,
                                        wrapperClassName:
                                          "fw-bold text-primary",
                                      }}
                                    />
                                  </div>
                                ) : (
                                  ""
                                )}
                              </>
                            ) : (
                              <>
                                {" "}
                                {new Date(todayDate) >=
                                  new Date(item.invst_end_date) &&
                                item.invst_status === "started" ? (
                                  <div className=" d-flex bg-secondary align-items-center w-50 justify-content-center">
                                    <Typewriter
                                      options={{
                                        strings: [
                                          "Your investment is ready to be withdraw....",
                                        ],
                                        autoStart: true,
                                        loop: true,
                                        deleteSpeed: 30,
                                        delay: 70,
                                        wrapperClassName:
                                          "fw-bold text-primary",
                                      }}
                                    />
                                  </div>
                                ) : (
                                  ""
                                )}
                              </>
                            )}
                          </>
                        ) : (
                          ""
                        )}

                        <span className="w-50 d-flex align-items-center justify-content-end gap-4 me-3">
                          {new Date(todayDate) >=
                            new Date(item.invst_start_date) &&
                          new Date(todayDate) <=
                            new Date(item.invst_end_date) ? (
                            <label className="fw-bold">
                              Months Remains :{" "}
                              <label className="text-primary">
                                {" "}
                                {calculateReaminingMonths(
                                  new Date(todayDate),
                                  new Date(item.invst_start_date),
                                  new Date(item.invst_end_date)
                                )}
                              </label>
                            </label>
                          ) : (
                            ""
                          )}

                          <label className="fw-bold text-primary">
                            {item.invst_status.toUpperCase()}
                          </label>
                        </span>
                      </div>
                      <div className="border-top border-bottom d-flex pt-4 pb-4 ps-2 gap-2 align-items-center">
                        <img
                          src={item.buss_photo}
                          alt="Logo"
                          style={{ width: "8rem", height: "8rem" }}
                        />
                        <span className="d-flex flex-column">
                          <label className="fw-bold">
                            {item.buss_name}, {item.buss_type}
                            {JSON.parse(item.buss_type_name).map(
                              (data) => `, ${data}`
                            )}
                          </label>

                          <label>Amount Invest: ₱ {item.invst_amt}</label>
                          <label>{item.invst_num_month} months</label>
                          <label>Interest: {item.invst_interest}%</label>
                          <label>
                            Total Interest: {item.invst_interest_sum}
                          </label>
                          <label>
                            <label className="fw-bold">Total Return</label> ₱{" "}
                            {item.invst_returned_amt}{" "}
                          </label>
                          <label>
                            <label className="fw-bold">Commencement</label>{" "}
                            {item.invst_status === "complete" ? (
                              <label className="fw-bold rounded-pill p-1 ps-2 pe-2 bg-primary text-light">
                                Claimed
                              </label>
                            ) : (
                              <label
                                className="rounded-pill p-1 bg-success shadow"
                                style={{ fontSize: ".8rem" }}
                              >
                                {item.invst_start_date ? (
                                  <>
                                    {computeDateStart(
                                      new Date(item.invst_start_date),
                                      new Date(todayDate),
                                      new Date(item.invst_end_date)
                                    )}
                                  </>
                                ) : (
                                  "In Progress"
                                )}
                              </label>
                            )}
                          </label>
                        </span>
                      </div>
                      <div className="w-100 pt-4 d-flex justify-content-between gap-4 ps-2 pe-2">
                        {item.invst_status === "complete" ? (
                          ""
                        ) : item.invst_status === "cancel" ? (
                          <label>Investment is cancelled</label>
                        ) : (
                          <div className="d-flex gap-5">
                            <label>
                              <label className="fw-bold text-primary">
                                Start Date:
                              </label>{" "}
                              {item.invst_start_date
                                ? new Date(
                                    item.invst_start_date
                                  ).toLocaleDateString()
                                : "Waiting"}
                            </label>
                            <label>
                              <label className="fw-bold text-primary">
                                Maturity Date:
                              </label>{" "}
                              {item.invst_end_date ? (
                                <>
                                  {" "}
                                  {new Date(
                                    item.invst_end_date
                                  ).toLocaleDateString()}{" "}
                                </>
                              ) : (
                                "Waiting"
                              )}
                            </label>
                          </div>
                        )}

                        <div className=" d-flex justify-content-end gap-4">
                          {item.invst_status === "request" ? (
                            <button
                              type="button"
                              class="btn btn-secondary"
                              onClick={() =>
                                handleShowUpdateModalForm(
                                  encrypTextId(item.buss_id.toString()),
                                  encrypTextId(item.invst_id.toString()),
                                  item
                                )
                              }
                            >
                              Update
                            </button>
                          ) : (
                            ""
                          )}
                          {item.invst_status === "complete" ? (
                            <>
                              <h1>Your investment is complete</h1>
                            </>
                          ) : (
                            <>
                              {checkUserHasWithdrawRequest(item.invst_id)
                                .value ? (
                                <>
                                  {new Date(todayDate) >=
                                    new Date(item.invst_end_date) &&
                                  item.invst_status === "started" &&
                                  checkUserHasWithdrawRequest(item.invst_id)
                                    .status === "send" ? (
                                    <button
                                      type="button"
                                      class="btn btn-primary "
                                      onClick={() =>
                                        handleFeedbackShow(
                                          item.user_profile,
                                          `${item.user_fname} ${item.user_mname} ${item.user_lname}`,
                                          item.user_id,
                                          item.invst_id
                                        )
                                      }
                                    >
                                      Receive
                                    </button>
                                  ) : new Date(todayDate) >=
                                      new Date(item.invst_end_date) &&
                                    item.invst_status === "started" &&
                                    checkUserHasWithdrawRequest(item.invst_id)
                                      .status === "receive" ? (
                                    ""
                                  ) : new Date(todayDate) >=
                                      new Date(item.invst_end_date) &&
                                    item.invst_status === "started" &&
                                    checkUserHasWithdrawRequest(item.invst_id)
                                      .status === "cancel" ? (
                                    <>
                                      <label className="fw-bold">
                                        Your withdrawal request was
                                        cancel...Please request another
                                        withdrawal
                                      </label>
                                      <button
                                        type="button"
                                        class="btn btn-success "
                                        onClick={() => {
                                          setAmountWithdraw(
                                            parseFloat(item.invst_returned_amt)
                                          );
                                          setwithdrawInvstID(item.invst_id);
                                          setShow(true);
                                        }}
                                      >
                                        {" "}
                                        {
                                          checkUserHasWithdrawRequest(
                                            item.invst_id
                                          ).status
                                        }
                                        Withdraw
                                      </button>
                                    </>
                                  ) : (
                                    <label className="fw-bold">
                                      Waiting for withdrawal apporval
                                    </label>
                                  )}
                                </>
                              ) : (
                                <>
                                  <p>
                                    {
                                      checkUserHasWithdrawRequest(item.invst_id)
                                        .status
                                    }
                                  </p>
                                  {new Date(todayDate) >=
                                    new Date(item.invst_end_date) &&
                                  item.invst_status === "started" ? (
                                    <button
                                      type="button"
                                      class="btn btn-success "
                                      onClick={() => {
                                        setAmountWithdraw(
                                          parseFloat(item.invst_returned_amt)
                                        );
                                        setwithdrawInvstID(item.invst_id);
                                        setShow(true);
                                      }}
                                    >
                                      {" "}
                                      {
                                        checkUserHasWithdrawRequest(
                                          item.invst_id
                                        ).status
                                      }
                                      Withdraw
                                    </button>
                                  ) : (
                                    ""
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  ) : item.invst_status === category ? (
                    <>
                      <div className="d-flex align-items-center pt-3 pb-3 justify-content-between">
                        <span className="w-50 w-md d-flex align-items-center gap-4 ps-2">
                          <label className="fw-bold">{`${item.user_fname} ${item.user_mname} ${item.user_lname}`}</label>
                          <button
                            type="button"
                            class="btn btn-outline-primary border border-2 border-primary"
                          >
                            View Business
                          </button>
                        </span>
                        {item.invst_start_date && item.invst_end_date ? (
                          <>
                            {checkUserHasWithdrawRequest(item.invst_id)
                              .status === "send" ? (
                              <>
                                {" "}
                                {new Date(todayDate) >=
                                  new Date(item.invst_end_date) &&
                                item.invst_status === "started" ? (
                                  <div className=" d-flex bg-secondary align-items-center w-50 justify-content-center">
                                    <Typewriter
                                      options={{
                                        strings: [
                                          "Your withdrawal amount has been send",
                                          "Click the recieve button to complete the transactions.",
                                        ],
                                        autoStart: true,
                                        loop: true,
                                        deleteSpeed: 30,
                                        delay: 70,
                                        wrapperClassName:
                                          "fw-bold text-primary",
                                      }}
                                    />
                                  </div>
                                ) : (
                                  ""
                                )}
                              </>
                            ) : (
                              <>
                                {" "}
                                {new Date(todayDate) >=
                                  new Date(item.invst_end_date) &&
                                item.invst_status === "started" ? (
                                  <div className=" d-flex bg-secondary align-items-center w-50 justify-content-center">
                                    <Typewriter
                                      options={{
                                        strings: [
                                          "Your investment is ready to be withdraw....",
                                        ],
                                        autoStart: true,
                                        loop: true,
                                        deleteSpeed: 30,
                                        delay: 70,
                                        wrapperClassName:
                                          "fw-bold text-primary",
                                      }}
                                    />
                                  </div>
                                ) : (
                                  ""
                                )}
                              </>
                            )}
                          </>
                        ) : (
                          ""
                        )}

                        <span className="w-50 d-flex align-items-center justify-content-end gap-4 me-3">
                          {new Date(todayDate) >=
                            new Date(item.invst_start_date) &&
                          new Date(todayDate) <=
                            new Date(item.invst_end_date) ? (
                            <label className="fw-bold">
                              Months Remains :{" "}
                              <label className="text-primary">
                                {" "}
                                {calculateReaminingMonths(
                                  new Date(todayDate),
                                  new Date(item.invst_start_date),
                                  new Date(item.invst_end_date)
                                )}
                              </label>
                            </label>
                          ) : (
                            ""
                          )}

                          <label className="fw-bold text-primary">
                            {item.invst_status.toUpperCase()}
                          </label>
                        </span>
                      </div>
                      <div className="border-top border-bottom d-flex pt-4 pb-4 ps-2 gap-2 align-items-center">
                        <img
                          src={item.buss_photo}
                          alt="Logo"
                          style={{ width: "8rem", height: "8rem" }}
                        />
                        <span className="d-flex flex-column">
                          <label className="fw-bold">
                            {item.buss_name}, {item.buss_type}
                            {JSON.parse(item.buss_type_name).map(
                              (data) => `, ${data}`
                            )}
                          </label>

                          <label>Amount Invest: ₱ {item.invst_amt}</label>
                          <label>{item.invst_num_month} months</label>
                          <label>Interest: {item.invst_interest}%</label>
                          <label>
                            Total Interest: {item.invst_interest_sum}
                          </label>
                          <label>
                            <label className="fw-bold">Total Return</label> ₱{" "}
                            {item.invst_returned_amt}{" "}
                          </label>
                          <label>
                            <label className="fw-bold">Commencement</label>{" "}
                            {item.invst_status === "complete" ? (
                              <label className="fw-bold rounded-pill p-1 ps-2 pe-2 bg-primary text-light">
                                Claimed
                              </label>
                            ) : (
                              <label
                                className="rounded-pill p-1 bg-success shadow"
                                style={{ fontSize: ".8rem" }}
                              >
                                {item.invst_start_date ? (
                                  <>
                                    {computeDateStart(
                                      new Date(item.invst_start_date),
                                      new Date(todayDate),
                                      new Date(item.invst_end_date)
                                    )}
                                  </>
                                ) : (
                                  "In Progress"
                                )}
                              </label>
                            )}
                          </label>
                          {/* <label>
                          <label className="fw-bold">Latest Updates</label>{" "}
                          <label
                            className="rounded-pill p-1 bg-success shadow"
                            style={{ fontSize: ".8rem" }}
                          >
                            {getLatestInvestment(item.invst_id)}
                          </label>
                        </label> */}
                        </span>
                      </div>
                      <div className="w-100 pt-4 d-flex justify-content-between gap-4 ps-2 pe-2">
                        {item.invst_status === "complete" ? (
                          ""
                        ) : item.invst_status === "cancel" ? (
                          <label>Investment is cancelled</label>
                        ) : (
                          <div className="d-flex gap-5">
                            <label>
                              <label className="fw-bold text-primary">
                                Start Date:
                              </label>{" "}
                              {item.invst_start_date
                                ? new Date(
                                    item.invst_start_date
                                  ).toLocaleDateString()
                                : "Waiting"}
                            </label>
                            <label>
                              <label className="fw-bold text-primary">
                                Maturity Date:
                              </label>{" "}
                              {item.invst_end_date ? (
                                <>
                                  {" "}
                                  {new Date(
                                    item.invst_end_date
                                  ).toLocaleDateString()}{" "}
                                </>
                              ) : (
                                "Waiting"
                              )}
                            </label>
                          </div>
                        )}

                        <div className=" d-flex justify-content-end gap-4">
                          {item.invst_status === "request" ? (
                            <button
                              type="button"
                              class="btn btn-secondary"
                              onClick={() =>
                                handleShowUpdateModalForm(
                                  encrypTextId(item.buss_id.toString()),
                                  encrypTextId(item.invst_id.toString()),
                                  item
                                )
                              }
                            >
                              Update
                            </button>
                          ) : (
                            ""
                          )}
                          {item.invst_status === "complete" ? (
                            <>
                              <h1>Your investment is complete</h1>
                            </>
                          ) : (
                            <>
                              {checkUserHasWithdrawRequest(item.invst_id)
                                .value ? (
                                <>
                                  {new Date(todayDate) >=
                                    new Date(item.invst_end_date) &&
                                  item.invst_status === "started" &&
                                  checkUserHasWithdrawRequest(item.invst_id)
                                    .status === "send" ? (
                                    <button
                                      type="button"
                                      class="btn btn-primary "
                                      onClick={() =>
                                        handleFeedbackShow(
                                          item.user_profile,
                                          `${item.user_fname} ${item.user_mname} ${item.user_lname}`,
                                          item.user_id,
                                          item.invst_id
                                        )
                                      }
                                    >
                                      Receive
                                    </button>
                                  ) : new Date(todayDate) >=
                                      new Date(item.invst_end_date) &&
                                    item.invst_status === "started" &&
                                    checkUserHasWithdrawRequest(item.invst_id)
                                      .status === "recieve" ? (
                                    ""
                                  ) : new Date(todayDate) >=
                                      new Date(item.invst_end_date) &&
                                    item.invst_status === "started" &&
                                    checkUserHasWithdrawRequest(item.invst_id)
                                      .status === "cancel" ? (
                                    <>
                                      <label className="fw-bold">
                                        Your withdrawal request was
                                        cancel...Please request another
                                        withdrawal
                                      </label>
                                      <button
                                        type="button"
                                        class="btn btn-success "
                                        onClick={() => {
                                          setAmountWithdraw(
                                            parseFloat(item.invst_returned_amt)
                                          );
                                          setwithdrawInvstID(item.invst_id);
                                          setShow(true);
                                        }}
                                      >
                                        {" "}
                                        {
                                          checkUserHasWithdrawRequest(
                                            item.invst_id
                                          ).status
                                        }
                                        Withdraw
                                      </button>
                                    </>
                                  ) : (
                                    <label className="fw-bold">
                                      Waiting for withdrawal apporval
                                    </label>
                                  )}
                                </>
                              ) : (
                                <>
                                  {new Date(todayDate) >=
                                    new Date(item.invst_end_date) &&
                                  item.invst_status === "started" ? (
                                    <button
                                      type="button"
                                      class="btn btn-success "
                                      onClick={() => {
                                        setAmountWithdraw(
                                          parseFloat(item.invst_returned_amt)
                                        );
                                        setwithdrawInvstID(item.invst_id);
                                        setShow(true);
                                      }}
                                    >
                                      Withdraw
                                    </button>
                                  ) : (
                                    ""
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </>
          ) : (
            ""
          )}
        </div>
        {/* <div className="w-100 position-relative ">
          <Nav
            justify
            variant="underline"
            defaultActiveKey="/investor"
            style={{ height: "4rem", width: "100%" }}
            className="d-flex flex-row align-items-center mt-5 ps-3 mb-5 z-index-2  shadow-none border position-fixed bg-light"
          >
            <Nav.Item>
              <Nav.Link
                to={"/investor/account/investment?status=all"}
                as={NavLink}
              >
                All
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                to={"/investor/account/investment?status=request"}
                as={NavLink}
              >
                Request
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                to={"/investor/account/investment?status=approved"}
                as={NavLink}
              >
                Approved
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                to={"/investor/account/investment?status=returned"}
                as={NavLink}
              >
                Returned
              </Nav.Link>
            </Nav.Item>
          </Nav>
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
        </div> */}
      </div>
    </>
  );
}
