import { useEffect, useState } from "react";

import "../Screens/CSS/entrepHome.css";
import axios from "axios";
import Loader from "./loader";
import logoIcon from "../icons/logo.jpg";
import CalendarComponent from "./datesofpayments";
import { NavLink, useNavigate } from "react-router-dom";
import { encryptId } from "./Encryptor";
import { Button, Toast, ToastContainer, Accordion } from "react-bootstrap";
import Pitch from "./pitch";
import ErrorMsg from "./ErrorMsg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faCheck,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import keyword_extractor from "keyword-extractor";
import { formatDateToCustomString } from "../Utils/Compute";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebaseConfig";
export default function Post() {
  const user_id = localStorage.getItem("user_id");
  const [bussinessDisplay, setBussinesDisplay] = useState([]);
  const [ImageLoaded, setImageLoaded] = useState(false);
  const [showPitchBusiness, setShowPitchBusiness] = useState(false);
  const [erromsg, setErrorMsg] = useState();
  const [showAlert, setShowAlert] = useState(null);
  const [alertType, setAlertType] = useState("");
  const navigate = useNavigate();
  const [btnStatus, setBtnStatus] = useState(false);
  const [receipt, setReceipt] = useState("");
  const [uploadBtnStatus, setUploadBtnStatus] = useState(false);
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}:3006/business`, {
        user_id: user_id,
      })
      .then((res) => {
        setBussinesDisplay(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, [user_id]);
  const handleNavigateViewBusiness = (id, capital) => {
    const encrypt = encryptId(id);
    sessionStorage.setItem("capitalBuss", capital);
    navigate(`view/${encrypt}`);
  };

  // const handleShowPitchBusiness = () => {
  //   axios
  //     .post(`${process.env.REACT_APP_NETWORK_ADD}:3006/checkUserStatus`, {
  //       user_id: user_id,
  //     })
  //     .then((res) => {
  //       if (res.data.success) {
  //         setShowPitchBusiness(!showPitchBusiness);
  //       } else {
  //         setErrorMsg(res.data.message);
  //       }
  //     });
  // };

  const handleShowPitchBusiness = () => {
    setShowPitchBusiness(!showPitchBusiness);
  };

  const filterBusinessUseFundsStatus = (useFunds, businesSendFunds) => {
    console.log(businesSendFunds);
    const InitialsendBusinessFundsData = businesSendFunds;
    const dataSendBusinessFunds = InitialsendBusinessFundsData.map(
      (item) => item
    );
    const filterUseFunds = useFunds.map((item) => {
      const matchFund = dataSendBusinessFunds.find(
        (match) => match.bussFunds_id === item.id
      );

      if (matchFund) {
        return {
          ...item,
          status: "send",
          bussFunds_amount_recieve_status:
            matchFund.bussFunds_amount_recieve_status,
          bussFunds_reciept: matchFund.bussFunds_reciept,
          bussFunds_reciept_status: matchFund.bussFunds_reciept_status,
        };
      } else {
        return { ...item, status: "not send" };
      }
    });
    console.log(dataSendBusinessFunds);
    return filterUseFunds;
  };

  // const handleGetKeyword = () => {
  //   const sentence =
  //     "local residents and visitors in the immediate vicinity of the bakery's location. This includes families, working professionals, and students who are looking for high-quality, freshly baked goods. Additionally, we would target health-conscious individuals who appreciate gluten-free and low-sugar options. We aim to create a welcoming and cozy atmosphere for customers of all ages, emphasizing the joy of indulging in delicious, freshly made treats. Our marketing efforts would focus on engaging with the local community through various channels to cater to the specific tastes and preferences of our target audience.";

  //   const extract = keyword_extractor.extract(sentence, {
  //     language: "english",
  //     remove_digits: true,
  //     return_changed_case: true,
  //     remove_duplicates: false,
  //   });

  //   console.log(extract);
  // };

  const handleUpdateBusinessFundsStatus = (useFundsId) => {
    setBtnStatus(true);
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}:3006/updatesUseFunds`, {
        id: useFundsId,
      })
      .then((res) => {
        if (res.data.status) {
          setShowAlert(true);
          setErrorMsg(res.data.message);
          setBtnStatus(false);
          setAlertType("success");
          setReceipt("");
        } else {
          setShowAlert(true);
          setBtnStatus(false);
          setErrorMsg(res.data.message);
          setAlertType("danger");
          setReceipt("");
        }
      })
      .catch((error) => {
        setBtnStatus(false);
        setShowAlert(true);
        setErrorMsg(error.message);
        setAlertType("danger");
        setReceipt("");
      });
  };
  const handleUploadReceipt = async (id) => {
    // console.log(id);
    setUploadBtnStatus(true);
    const filename = receipt[0].name;

    const storageRef = ref(storage, `sample1/${filename}`);

    const snapshot = await uploadBytes(storageRef, receipt[0]);
    const urlDowloand = await getDownloadURL(snapshot.ref);

    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}:3006/uplaodreceipt`, {
        id: id,
        url: urlDowloand,
        status: "pending",
      })
      .then((res) => {
        if (res.data.status) {
          setShowAlert(true);
          setErrorMsg(res.data.message);
          setUploadBtnStatus(false);
          setAlertType("success");
        } else {
          setShowAlert(true);
          setUploadBtnStatus(false);
          setErrorMsg(res.data.message);
          setAlertType("danger");
        }
      })
      .catch((error) => {
        setUploadBtnStatus(false);
        setShowAlert(true);
        setErrorMsg(error.message);
        setAlertType("danger");
      });
  };
  return (
    // <div className="details">
    //   {erromsg ? (
    //     <ErrorMsg msg={erromsg} />
    //   ) : (
    //     <>
    //       <div className="button-pitch">
    //         <button onClick={handleShowPitchBusiness}>Pitch</button>
    //       </div>
    //       <div className="list-business">
    //         <div className="list">
    //           {bussinessDisplay.length === 0 ? (
    //             <h1>No Business Created</h1>
    //           ) : (
    //             <div className="feedsDetails">
    //               {bussinessDisplay.map((item) => (
    //                 <div
    //                   className="businessFeeds"
    //                   key={item.buss_id}
    //                   onClick={() =>
    //                     handleNavigateViewBusiness(
    //                       item.buss_id,
    //                       item.buss_capital
    //                     )
    //                   }
    //                 >
    //                   <label>
    //                     Business Name:
    //                     <label> {item.buss_name}</label>
    //                   </label>
    //                   <br />
    //                   <div className="image">
    //                     {ImageLoaded ? (
    //                       <img
    //                         src={item.buss_photo}
    //                         alt="Logo"
    //                         onLoad={() => setImageLoaded(true)}
    //                       />
    //                     ) : (
    //                       <div className="imageLOader">
    //                         <Loader />
    //                         <img
    //                           src={item.buss_photo}
    //                           alt="Logo"
    //                           id="image"
    //                           onLoad={() => setImageLoaded(true)}
    //                         />
    //                       </div>
    //                     )}
    //                   </div>
    //                   <div>
    //                     <p>Business Status: {item.buss_status}</p>
    //                   </div>
    //                 </div>
    //               ))}
    //             </div>
    //           )}
    //         </div>
    //         {/* <CalendarComponent /> */}
    //       </div>
    //     </>
    //   )}
    // </div>

    <div className="container-fluid pt-5">
      <ToastContainer position="top-center" className="p-3 position-sticky">
        {" "}
        <Toast
          className="d-inline-block m-1"
          bg={alertType}
          onClose={() => setShowAlert(false)}
          show={showAlert}
          delay={3000}
          autohide
        >
          <Toast.Body className="primary text-light">{erromsg}</Toast.Body>
        </Toast>
      </ToastContainer>

      {showPitchBusiness ? (
        <Pitch
          handleShowPitchBusiness={handleShowPitchBusiness}
          status={setShowAlert}
          msg={setErrorMsg}
          alertType={setAlertType}
        />
      ) : (
        ""
      )}
      <div className="pt-5 d-flex justify-content-end me-5 ">
        <button
          type="button"
          class="btn btn-primary gap-2 d-flex align-items-center justify-content-center"
          onClick={() => handleShowPitchBusiness()}
        >
          <FontAwesomeIcon icon={faCirclePlus} />
          Pitch
        </button>
      </div>

      <div className=" d-flex flex-column mb-4">
        {bussinessDisplay.length === 0 ? (
          <div>
            <h2 className="text-center">
              You don't have any picthed business.
            </h2>
          </div>
        ) : (
          <>
            {bussinessDisplay.map((item, index) => (
              <>
                {" "}
                <Accordion
                  defaultActiveKey="0"
                  key={index}
                  className="mb-3 "
                  alwaysOpen
                >
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <h4> {item.buss_name}</h4>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="d-flex  p-2 align-items-center justify-content-around rounded">
                        <div className=" ">
                          <img
                            src={item.buss_photo}
                            alt="Business Logo"
                            style={{ height: "10rem" }}
                          />
                        </div>
                        <span>
                          <p className="card-title fs-2 fw-bold">
                            {item.buss_name}
                          </p>
                          <p className="card-text  ">{item.buss_summary}</p>
                          <div className="shadow-none bg-secondary  ps-2  align-items-center">
                            <p className="text-primary fs-2 fw-bold">
                              ₱ {item.buss_capital}
                            </p>
                          </div>
                        </span>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey={index + 1}>
                    <Accordion.Header>More</Accordion.Header>
                    <Accordion.Body>
                      <div className="d-flex flex-column  contianer-fluid  rounded p-2">
                        <p className="fs-5 fw-bold">Loan Details</p>
                        <div className=" d-flex border ">
                          <div className="col text-center row">
                            <label className="text-primary fw-bold fs-5">
                              {item.buss_interest}
                            </label>
                            <label>Interest %</label>
                          </div>
                          <div className="col text-center row">
                            <label className="text-primary fw-bold fs-5">
                              {item.buss_no_of_months}
                            </label>
                            <label>Month/s</label>
                          </div>
                          <div className="col text-center row">
                            <label className="text-primary fw-bold fs-5">
                              {item.buss_loan_return}
                            </label>
                            <label>Return ₱</label>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex flex-column  contianer-fluid   p-2">
                        <div className="mb-3 ">
                          <label className="form-label fw-bold">
                            Business Type
                          </label>
                          <div className="d-flex gap-2 ms-3">
                            <span className="border p-2 ">
                              {item.buss_type}
                            </span>
                            <span className="border p-2 ">
                              {item.buss_type_name}
                            </span>
                          </div>
                        </div>
                        <div>
                          <label className="form-label fw-bold">Address</label>
                          <div className="d-flex gap-2 ms-3">
                            <span className="border p-2 ">
                              {item.buss_address}
                            </span>
                          </div>
                        </div>
                        <div class="mb-3 ">
                          <label className="form-label fw-bold">
                            Target Audience
                          </label>
                          <p className="card-text ms-3 ">
                            {item.buss_target_audience}
                          </p>
                        </div>
                      </div>
                      <div class="d-flex  flex-column contianer-fluid   p-2 gap-3">
                        <span className="d-flex justify-content-between align-items-center ">
                          <label className="form-label fw-bold">
                            Payments Date
                          </label>
                          <Button
                            as={NavLink}
                            to={`payments?buss_id=${item.buss_id}&pay_type=payments`}
                            className="rounded"
                            variant="primary"
                          >
                            View Payments
                          </Button>
                        </span>

                        <table class=" table align-middle text-center mb-0 bg-white mt-2">
                          <thead className="table-dark">
                            <tr>
                              <th scope="col">Amount</th>
                              <th scope="col">Due Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {item.buss_installment ? (
                              <>
                                {JSON.parse(item.buss_installment).map(
                                  (item, index) => (
                                    <tr key={index}>
                                      <td class="fw-normal mb-1">
                                        Php {item.installment}
                                      </td>
                                      <td class="fw-normal mb-1">
                                        {formatDateToCustomString(item.mindate)}{" "}
                                        -{" "}
                                        {formatDateToCustomString(item.maxdate)}
                                      </td>
                                    </tr>
                                  )
                                )}
                              </>
                            ) : (
                              ""
                            )}
                          </tbody>
                        </table>
                      </div>
                      <div class="d-flex flex-column  contianer-fluid   p-2">
                        <label className="form-label fw-bold">
                          Use of Funds
                        </label>
                        <table class="table align-middle mb-0 text-center bg-white mt-2">
                          <thead className="table-dark">
                            <tr>
                              <th>No.</th>
                              <th>Products</th>
                              <th>Amount</th>
                              <th>Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filterBusinessUseFundsStatus(
                              JSON.parse(item.buss_useof_funds),
                              item.businessFunds
                            ).map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  <p class="fw-normal mb-1">{item.products}</p>
                                </td>
                                <td>
                                  <p class="fw-normal mb-1">{item.amount}</p>
                                </td>
                                <td>
                                  <span
                                    className={`badge rounded-pill ${
                                      item.status === "send" ? "bg-success" : ""
                                    }`}
                                  >
                                    {item.status}
                                  </span>
                                </td>
                                <td className="w-25">
                                  {item.status === "send" &&
                                  item.bussFunds_amount_recieve_status ===
                                    "pending" &&
                                  !item.bussFunds_reciept ? (
                                    <div className="d-flex align-items-center justify-content-center gap-2">
                                      <button
                                        type="button"
                                        class="btn btn-primary"
                                        disabled={btnStatus}
                                        onClick={() =>
                                          handleUpdateBusinessFundsStatus(
                                            item.id
                                          )
                                        }
                                      >
                                        Recieve
                                      </button>
                                      <button
                                        type="button"
                                        class="btn btn-danger"
                                      >
                                        Report
                                      </button>
                                    </div>
                                  ) : item.status === "not send" ? (
                                    ""
                                  ) : item.bussFunds_amount_recieve_status ===
                                      "recieve" &&
                                    item.status === "send" &&
                                    !item.bussFunds_reciept &&
                                    item.bussFunds_reciept_status ===
                                      "pending" ? (
                                    <div className="d-flex  align-items-end   gap-3">
                                      <div class="">
                                        <label
                                          for="formFileSm"
                                          class="form-label "
                                          style={{ fontSize: ".8rem" }}
                                        >
                                          Upload Your Item Receipt
                                        </label>
                                        <input
                                          class="form-control form-control-sm"
                                          id="formFileSm"
                                          type="file"
                                          accept=".png, .jpg, .jpeg"
                                          disabled={uploadBtnStatus}
                                          onChange={(e) =>
                                            setReceipt(e.target.files)
                                          }
                                        />
                                      </div>
                                      <button
                                        type="button"
                                        class="btn btn-primary rounded"
                                        disabled={uploadBtnStatus}
                                        onClick={() =>
                                          handleUploadReceipt(item.id)
                                        }
                                      >
                                        Upload
                                      </button>
                                    </div>
                                  ) : item.bussFunds_amount_recieve_status ===
                                      "recieve" &&
                                    item.status === "send" &&
                                    item.bussFunds_reciept &&
                                    item.bussFunds_reciept_status ===
                                      "approved" ? (
                                    <FontAwesomeIcon
                                      icon={faCheck}
                                      style={{ color: "#00eb10" }}
                                    />
                                  ) : item.bussFunds_amount_recieve_status ===
                                      "recieve" &&
                                    item.status === "send" &&
                                    item.bussFunds_reciept &&
                                    item.bussFunds_reciept_status ===
                                      "declined" ? (
                                    <div className="d-flex  align-items-end   gap-3">
                                      <div class="">
                                        <label
                                          for="formFileSm"
                                          class="form-label "
                                          style={{ fontSize: ".8rem" }}
                                        >
                                          Re-upload the another receipt{" "}
                                          <FontAwesomeIcon
                                            icon={faCircleQuestion}
                                            title="Please make sure that the receipt image is clear and does not have any blur."
                                          />
                                        </label>
                                        <input
                                          class="form-control form-control-sm"
                                          id="formFileSm"
                                          type="file"
                                          accept=".png, .jpg, .jpeg"
                                          disabled={uploadBtnStatus}
                                          onChange={(e) =>
                                            setReceipt(e.target.files)
                                          }
                                        />
                                      </div>
                                      <button
                                        type="button"
                                        class="btn btn-primary rounded"
                                        disabled={uploadBtnStatus}
                                        onClick={() =>
                                          handleUploadReceipt(item.id)
                                        }
                                      >
                                        Upload
                                      </button>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {/* <div style={{ width: "40rem" }}>
                  <div className="">
                    <div class="mb-3 ">
                  <label className="form-label fw-bold">Loan Details</label>
                  <table class="table ms-3">
                    <thead>
                      <tr>
                        <th scope="col">Amount</th>
                        <th scope="col">Due Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.buss_installment ? (
                        <>
                          {JSON.parse(item.buss_installment).map(
                            (item, index) => (
                              <tr key={index}>
                                <td>Php {item.installment}</td>
                                <td>{new Date(item.date).toDateString()}</td>
                              </tr>
                            )
                          )}
                        </>
                      ) : (
                        ""
                      )}
                    </tbody>
                  </table>
                </div>
                  </div>
                </div> */}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <hr />
              </>

              // <div className=" mt-4  d-flex flex-column gap-3  " key={index}>

              // </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
