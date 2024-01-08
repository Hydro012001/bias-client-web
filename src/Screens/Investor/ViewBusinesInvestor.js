import React, { useEffect, useState } from "react";
import logoIcon from "../../icons/logo.jpg";
import axios from "axios";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { Loan } from "loanjs";
import InvestModal from "../../Components/InvestModal";
import { Toast, ToastContainer, Alert, Button } from "react-bootstrap";
import { mapInvestorProfile } from "../../Utils/InvestorProfileMap";
import calculateTotalInvest, {
  displayBusinessStation,
} from "../../Utils/Compute";
import { LoanCalculate } from "../../Components/LoanCalculator";
function ViewBusinesInvestor(props) {
  const location = useLocation();
  const searchLocation = new URLSearchParams(location.search);
  const business = searchLocation.get("id");
  const [businessDetails, setBusinessDetails] = useState([]);
  const [capital, setCapital] = useState("");
  const user_id = localStorage.getItem("user_id");
  const [interest, setIntrest] = useState("");
  const [month, setMonth] = useState("");
  const [show, setShow] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("");
  const [alertStatus, setalertStatus] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showNotVerified, setshowNotVerified] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}/api/viewentrepbusiness`, {
        buss_id: business,
      })
      .then((res) => {
        if (res.data.status) {
          setBusinessDetails(res.data.result);
          setCapital(res.data.result[0].buss_capital);
          setIntrest(res.data.result[0].buss_approved_percent);
          setMonth(res.data.result[0].buss_approved_updated_month);
        } else {
          if (res.data.hasInvesment) {
            setShowAlert(true);
          }
        }
      })
      .catch((error) => alert(error.message));
  }, [business]);

  const computeReturn = (amount, interest, month) => {
    //  const loandata = new Loan(amount, month, parseInt(interest));
    const loandata = LoanCalculate(amount, month, parseInt(interest));
    return loandata.totalAmountReturn;
  };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const handleShow = () => {
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}/getInvestHasInvestments`, {
        buss_id: business,
        user_id: user_id,
      })
      .then((res) => {
        if (res.data.status) {
          if (res.data.userVerifid) {
            if (res.data.hasInvesment) {
              setShowAlert(true);
            } else {
              setShow(!show);
            }
          } else {
            setshowNotVerified(true);
          }
        } else {
          setAlertMsg(res.data.message);
          setalertStatus(true);
          setAlertType("danger");
        }
      })
      .catch((error) => {
        setAlertMsg(error.message);
        setalertStatus(true);
        setAlertType("danger");
      });
  };

  // const calculateTotalInvest = (investment) => {
  //   const investDetails = investment.map((item) => item.invest_amount);

  //   let totalSum = 0;

  //   for (let i = 0; i < investDetails.length; i++) {
  //     totalSum += parseFloat(investDetails[i]);
  //   }
  //   if (totalSum) {
  //     return totalSum;
  //   } else {
  //     return 0;
  //   }
  // };
  return (
    <>
      {showNotVerified ? (
        <ToastContainer position="top-center" className="p-3">
          <Toast
            className="d-inline-block m-1"
            bg="danger"
            show={showNotVerified}
            delay={2000}
            onClose={() => {
              setshowNotVerified(!showNotVerified);
              navigate("/investor/account/profile");
            }}
            autohide
          >
            <Toast.Body className="primary text-light">
              You are not verified...Please verify your account first
            </Toast.Body>
          </Toast>
        </ToastContainer>
      ) : (
        ""
      )}

      <ToastContainer position="top-center" className="p-3">
        <Toast
          className="d-inline-block m-1"
          bg={alertType}
          show={alertStatus}
          delay={2000}
          onClose={() => {
            setalertStatus(false);
            navigate("/investor/feeds/list/all/category/all");
          }}
          autohide
        >
          <Toast.Body className="primary text-light">{alertMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
      {showAlert ? (
        <div
          className="text-center mt-5 d-flex align-items-center justify-content-center"
          style={{ height: "20rem" }}
        >
          <Alert
            variant="danger"
            onClose={() => {
              setShowAlert(false);
              navigate("/investor/feeds/list/all/category/all");
            }}
            dismissible
          >
            <Alert.Heading>Oh snap! You made an investment</Alert.Heading>
            <p>
              You have already made an investemnt of this business... Please go
              to the investment page to update, delete this investments
            </p>
            <div className="d-flex justify-content-end">
              <Button
                onClick={() => {
                  setShowAlert(false);
                  navigate("/investor/account/investment");
                }}
                variant="outline-danger"
                className="outline-danger border border-danger border border-2"
              >
                Go to Investment
              </Button>
              <Button
                onClick={() => {
                  setShowAlert(false);
                  navigate("/investor/feeds/list/all/category/all");
                }}
                variant="primary"
                className=" border border-primary border border-2 ms-4"
              >
                Go to Feeds
              </Button>
            </div>
          </Alert>
        </div>
      ) : (
        <>
          {show ? (
            <>
              <InvestModal
                handleShow={handleShow}
                capital={capital}
                month={month}
                interest={interest}
                returnSum={computeReturn(capital, month, interest)}
                msg={setAlertMsg}
                alertType={setAlertType}
                alertStatus={setalertStatus}
                buss_id={business}
                capitalRemains={
                  capital - calculateTotalInvest(businessDetails[0].investments)
                }
              />
            </>
          ) : (
            <div className="container-fluid">
              {businessDetails ? (
                <div className=" justify-content-md-center  row mt-5">
                  {businessDetails.map((item) => (
                    <div
                      key={item.buss_id}
                      className="d-flex flex-column align-items-center"
                    >
                      <div className=" shadow row mt-4 col-11  align-items-center p-3">
                        <div className="col text-center">
                          <img
                            src={item.buss_photo}
                            alt="Business Logo"
                            style={{ height: "10rem" }}
                          />
                        </div>
                        <div className="col">
                          <p
                            className="card-title fs-4"
                            style={{ fontWeight: "500" }}
                          >
                            {item.buss_name}
                          </p>

                          <div className="d-flex bg-info ps-5">
                            <div className="d-flex flex-column justify-content-center ">
                              <div class="  d-flex flex-column">
                                <span className=" d-flex">
                                  <label class="form-label fw-bold fs-4 text-primary">
                                    ₱{" "}
                                    {computeReturn(
                                      item.buss_capital,
                                      item.buss_approved_percent,
                                      item.buss_approved_updated_month
                                    )}
                                  </label>
                                </span>
                                <label class="form-label ">
                                  For {item.buss_approved_updated_month} month
                                  with {item.buss_approved_percent}% interest
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex align-items-center mt-4 ms-4">
                            <label className=" fw-bold w-50">Investors</label>
                            <div class="text-center d-flex align-items-center gap-2">
                              {mapInvestorProfile(item.investments, 2)}
                            </div>
                          </div>
                          <div className="d-flex align-items-center mt-4 ms-4">
                            <label className=" fw-bold w-50">
                              Remain Amount
                            </label>
                            <label className=" fw-bold fs-5">
                              ₱{" "}
                              {(
                                parseFloat(item.buss_capital) -
                                calculateTotalInvest(item.investments)
                              ).toFixed(2)}
                            </label>
                          </div>
                          <div className="d-flex align-items-center mt-4 ms-4">
                            <label className=" fw-bold w-50">Capital</label>
                            <label className=" fw-bold fs-5">
                              ₱ {parseFloat(item.buss_capital).toFixed(2)}
                            </label>
                          </div>
                          <div className="d-flex mt-4  ms-4">
                            <label className=" fw-bold w-50">
                              Business Type
                            </label>
                            <div className="d-flex gap-2 flex-wrap w-50">
                              <span className="border p-2 ">
                                {item.buss_type}
                              </span>

                              {JSON.parse(item.buss_type_name).map((data) => (
                                <span className="border p-2 ">{data}</span>
                              ))}
                            </div>
                          </div>
                          <div className="d-flex  mt-4 ms-4">
                            <label className=" fw-bold w-50">Location</label>
                            <label className=" w-50 fs-6">
                              {item.buss_address}
                            </label>
                          </div>

                          {/* <div className="mt-3"></div>
                <div className="mt-3">
                  <p className="fs-5 fw-bold">Business Credintials</p>
                  <div></div>
                </div> */}
                          <div className="mt-3 ms-4">
                            <button
                              type="button"
                              class="btn btn-primary"
                              onClick={handleShow}
                            >
                              Invest
                            </button>
                          </div>
                        </div>
                      </div>
                      <div
                        className="shadow row mt-4 col-11 mt-2 align-items-center p-3 "
                        style={{ height: "7rem" }}
                      >
                        <div className="border border-start-0  border-top-0 border-bottom-0 col-4 d-flex">
                          <div className="text-center col">
                            <img
                              src={
                                item.buss_user_profile
                                  ? item.buss_user_profile
                                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                              }
                              alt="Business Logo"
                              style={{ height: "5rem", width: "5rem" }}
                              className="rounded-circle"
                            />
                          </div>
                          <span className="d-flex flex-column  justify-content-center gap-2 ">
                            <label>{`${item.entrep_fname} ${item.entrep_mname} ${item.entrep_lname}`}</label>
                            <Button
                              variant="primary"
                              class="btn btn-primary w-50"
                              as={NavLink}
                              to={`/investor/entrep-details?entrep_id=${item.buss_user_id}`}
                            >
                              Profile
                            </Button>{" "}
                          </span>
                        </div>
                        <div className="col">
                          <span className="d-flex gap-4">
                            <label className=" ">Business Experince</label>
                            <label
                              className=" text-primary"
                              style={{ fontWeight: "500" }}
                            >
                              {capitalizeFirstLetter(
                                item.buss_experience.toUpperCase()
                              )}
                            </label>
                          </span>
                          {item.buss_experience === "yes" ? (
                            <span className="d-flex gap-4">
                              <label className=" ">Past Business</label>
                              <label
                                className=" text-primary"
                                style={{ fontWeight: "500" }}
                              >
                                {item.buss_prev_name}
                              </label>
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="shadow row mt-4 col-11 mt-2  p-3">
                        <div className="d-flex flex-column mt-4 mb-4">
                          <label className="fs-5 bg-info d-flex align-items-center mb-3 ps-3 pt-2 pb-2">
                            High-traffic Area
                          </label>

                          <div className="d-flex gap-2 flex-wrap w-100">
                            {displayBusinessStation(item.buss_station_name)}
                            {/* {JSON.parse(item.buss_station_name).map(
                                (data) => (
                                  <span className="border p-2 ">
                                    {data.name}
                                  </span>
                                )
                              )} */}
                          </div>
                        </div>
                        <div className="mb-4">
                          <label className="fs-5 bg-info d-flex align-items-center mb-3 ps-3 pt-2 pb-2">
                            Summary
                          </label>
                          <label className="ps-3">{item.buss_summary}</label>
                        </div>
                        <div className="mb-4">
                          <label className="fs-5 bg-info d-flex align-items-center mb-3 ps-3 pt-2 pb-2">
                            Target Audience
                          </label>
                          <label className="ps-3">
                            {item.buss_target_audience}
                          </label>
                        </div>
                        {/* <div className="mb-4">
                          <label className="fs-5 bg-info d-flex align-items-center mb-3 ps-3 pt-2 pb-2">
                            Target Audience
                          </label>
                          <label className="ps-3">
                            {item.buss_target_audience}
                          </label>
                        </div> */}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}

export default ViewBusinesInvestor;
