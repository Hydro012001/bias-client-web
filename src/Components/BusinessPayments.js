import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Card, Nav } from "react-bootstrap";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Payreturn from "./payreturn";
import { decryptTextId, encrypTextId } from "./EncryptIDs";
import Loader from "./loader";
import ErrorHandler from "../ErrorPage/ErrorHandler";
import PayReturnMissed from "./PayReturnMissed";
function BusinessPayments(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [todayDate, setTodayDate] = useState();
  const user_id = localStorage.getItem("user_id");
  const searchData = new URLSearchParams(location.search);
  const buss_id = searchData.get("buss_id");

  const paymentType = searchData.get("pay_type");
  const itemInstallId = searchData.get("installment_id");
  const [installmentsData, setInstallmentsData] = useState([]);
  const [unpaidInstallment, setunpaidInstallment] = useState([]);
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState(0);
  const [todayPayment, setTodaysPayment] = useState([]);
  const [showPayMissed, setShowPayMissed] = useState(false);
  const [installmentId, setinstallmentId] = useState("");
  const [transactionList, setTransactionList] = useState([]);
  const [totalReyPayment, setTotalReyPayment] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [missedPayment, setMissedPayment] = useState([]);
  const [showLoader, setShowLaoder] = useState(false);
  const [missedPaymentWithInterest, setMissedPaymentWithInteres] = useState([]);
  useEffect(() => {
    setShowLaoder(true);
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}/viewBusinessInstallments`, {
        buss_id: buss_id,
        user_id,
      })
      .then((res) => {
        if (res.data.status) {
          const installdata = res.data.installmentsDatas;
          installdata.sort((a, b) => {
            if (a.status === "paid" && b.status !== "paid") {
              return 1;
            } else if (a.status !== "paid" && b.status == "paid") {
              return -1;
            } else {
              return 0;
            }
          });

          //console.log(res.data.missedPayments);
          //console.log(res.data.todayPayment);
          setTodayDate(res.data.currentDate);
          //  console.log(res.data.transresult);
          //Unpaid
          setunpaidInstallment(installdata);
          //Missed Payment
          setMissedPayment(res.data.missedPayments);
          // console.log(paymentStatus.missedPayments);
          //Total Reypayments
          setTotalReyPayment(res.data.totalReyPayment);
          //Todays payment
          console.log(res.data.todayPayment);
          setTodaysPayment(res.data.todayPayment);
          //Transaction List
          setTransactionList(res.data.transresult);
          //Total Paid
          setTotalPaid(res.data.totalPaidAmount);
          setShowLaoder(false);
          // const installmentData = JSON.parse(
          //   res.data.result[0].buss_installment
          // );
          // console.log(installmentData);
          // //Installment original data
          // setInstallmentsData(installmentData);
          // //
          // const transacitonData = res.data.loanData;
          // const paymentStatus = calculatePaymentStatus(
          //   installmentData,
          //   transacitonData,
          //   todayDate
          // );
          // const missedPayment = paymentStatus.missedPayments;
          // const missedPaymentId = missedPayment.map((item) => item.id);
          // const installmentsDatas = installmentData.map((item) => {
          //   if (missedPaymentId.includes(item.id)) {
          //     return { ...item, status: "missed" };
          //   } else {
          //     return item;
          //   }
          // });
          // const missedPayments = installmentsDatas.filter((item) => {
          //   if (item.status === "missed") {
          //     return item;
          //   }
          // });
        } else {
          alert(res.data.message);
        }
      })
      .catch((error) => {
        ErrorHandler(error, navigate);
      });
  }, [buss_id]);

  const handleShow = () => {
    setShow(!show);
  };

  //   searchData.set("pay_type", `${typePayments}`);

  //   return `?${searchData.toString()}`;
  // };

  // const calculateTheUnPaidInstallment = (installment, returPayments) => {
  //   let matchUnpaidItem = [];
  //   if (returPayments.length > 0) {
  //     for (const item of installment) {
  //       const matchItem = returPayments.find(
  //         (item2) => item2.returnLoan_id !== item.id
  //       );
  //       if (matchItem) {
  //         matchUnpaidItem.push(matchItem);
  //       }
  //     }
  //     return matchUnpaidItem;
  //   } else {
  //     return installment;
  //   }
  // };

  const caculateMissedPayments = (missedPayment) => {
    const missedAmount = missedPayment.reduce(
      (sum, item) => sum + item.totalPayment,
      0
    );

    return missedAmount;
  };

  //Function for calculating the added intrest and for days passed
  const handleComputeAddedInterest = (maxdate, amount) => {
    const timeDifference = new Date(todayDate) - new Date(maxdate);
    const daysDifference = Math.floor(
      timeDifference / (7 * 24 * 60 * 60 * 1000)
    );
    const interest = amount * 0.01;
    const interestAdded = interest * parseInt(daysDifference);
    const totalPayment = interestAdded + amount;

    //console.log(daysDifference);
    return { daysDifference, interestAdded, totalPayment };
  };

  const handleSetValue = (maxdate, amount, id, status) => {
    if (status === "not paid") {
      setAmount(amount);
      setinstallmentId(id);
      handleShow();
    }
    // else if (status === "missed") {
    //   const amt = handleComputeAddedInterest(maxdate, amount).totalPayment;
    //   setAmount(amt);
    //   setinstallmentId(id);
    //   handleShow();
    // }
  };

  const handlePayMissedPayments = () => {
    console.log(missedPayment);
    //!TODO: Make the amount and installmentId into an array and map it when storing in the database.
    const missedPaymentsData = missedPayment.map((item) => {
      const installmentsData = item.data;

      return installmentsData;
    });

    const missedPaymentsDataWithInterest = missedPaymentsData.map((item) => {
      return {
        ...item,
        installment: handleComputeAddedInterest(item.maxdate, item.installment)
          .totalPayment,
      };
    });
    setMissedPaymentWithInteres(missedPaymentsDataWithInterest);
    console.log(missedPaymentsDataWithInterest);
    handleShowMissed();
  };
  const handleShowMissed = () => {
    setShowPayMissed(!showPayMissed);
  };

  const TotalcaculateMissedPayments = (missedPayment) => {
    const missedPaymentsData = missedPayment.map((item) => {
      const installmentsData = item.data;

      return installmentsData;
    });

    const missedPaymentsDataWithInterest = missedPaymentsData.map((item) => {
      return {
        ...item,
        installment: handleComputeAddedInterest(item.maxdate, item.installment)
          .totalPayment,
      };
    });

    const TotalPaymentMissed = missedPaymentsDataWithInterest.reduce(
      (sum, current) => {
        return (sum += current.installment);
      },
      0
    );
    return TotalPaymentMissed;
  };
  return (
    <div className="mt-5 pt-5 ps-5 pb-3 pe-5">
      {showLoader ? (
        <div
          className="d-flex align-items-center justify-content-center w-100"
          style={{ height: "100vh" }}
        >
          <Loader />
        </div>
      ) : (
        <>
          {show ? (
            <Payreturn
              amount={amount}
              installmentId={installmentId}
              handleShow={handleShow}
              buss_id={buss_id}
              installmentLength={unpaidInstallment.length}
            />
          ) : (
            ""
          )}

          {showPayMissed ? (
            <PayReturnMissed
              installmentLength={unpaidInstallment.length}
              installment={missedPaymentWithInterest}
              handleShowMissed={handleShowMissed}
              buss_id={buss_id}
            />
          ) : (
            ""
          )}

          <div class="d-flex align-items-center  w-100 mb-4">
            <span className="w-50">
              <span className="d-flex justify-content-between w-100 gap-5 ">
                <h3 class=" ">Repayment</h3>
                <h3 class="text-primary">
                  {totalReyPayment ? <>₱ {totalReyPayment.toFixed(2)}</> : ""}
                </h3>
              </span>
              <hr />
              <span className="d-flex justify-content-between w-100 gap-5">
                <label class=" ">Paid Installment</label>
                <label class="fw-bold">
                  {totalPaid ? <>₱ {totalPaid.toFixed(2)}</> : "No Payment yet"}
                </label>
              </span>
              <span className="d-flex justify-content-between w-100 gap-5">
                <label class=" ">Remaining Installment</label>
                <label class="fw-bold">
                  ₱ {(totalReyPayment - totalPaid).toFixed(2)}
                </label>
              </span>
              <span className="d-flex justify-content-between w-100 gap-5">
                <label class=" text-danger">Missed Payment</label>
                <label class="fw-bold text-danger">
                  ₱ {caculateMissedPayments(missedPayment).toFixed(2)}
                </label>
              </span>
            </span>
            <div className="d-flex flex-column w-75 gap-1 align-items-end">
              {missedPayment.length > 0 ? (
                <div className="card w-75">
                  <h5 class="card-header bg-danger text-light">
                    Missed Payments
                  </h5>

                  <>
                    <div
                      class="card-body d-flex flex-column mt-2"
                      style={{ cursor: "default" }}
                    >
                      <div className=" d-flex align-items-center justify-content-between">
                        <h4 class="card-title">
                          ₱{" "}
                          {TotalcaculateMissedPayments(missedPayment).toFixed(
                            2
                          )}
                        </h4>

                        <Button
                          variant="primary"
                          //   as={NavLink}
                          //   to={`approved?id=${item.buss_id}&user_id=${item.buss_user_id}`}
                          role="button"
                          className="rounded"
                          onClick={() => handlePayMissedPayments()}
                        >
                          Missed Payments
                        </Button>
                      </div>
                    </div>
                  </>
                </div>
              ) : (
                ""
              )}
              {todayPayment ? (
                <div className="card w-75">
                  <h5 class="card-header bg-primary text-light">
                    Todays Payment
                  </h5>

                  {todayPayment.status === "paid" ? (
                    <>
                      {" "}
                      <div
                        class="card-body d-flex flex-column mt-2"
                        style={{ cursor: "default" }}
                      >
                        <p class="card-text">Today's Payments has been paid</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        class="card-body d-flex flex-column mt-2"
                        style={{ cursor: "default" }}
                      >
                        <p class="card-text">
                          {new Date(todayPayment.mindate).toDateString()} -{" "}
                          {new Date(todayPayment.maxdate).toDateString()}
                        </p>
                        <div className=" d-flex align-items-center justify-content-between">
                          <h4 class="card-title">
                            ₱ {todayPayment.installment}
                          </h4>

                          <Button
                            variant="primary"
                            //   as={NavLink}
                            //   to={`approved?id=${item.buss_id}&user_id=${item.buss_user_id}`}
                            role="button"
                            className="rounded"
                            onClick={() =>
                              handleSetValue(
                                todayPayment.maxdate,
                                todayPayment.installment,
                                todayPayment.id,
                                todayPayment.status
                              )
                            }
                          >
                            Pay Installment
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="d-flex  gap-2">
            <div class="card w-75">
              <Card>
                <Card.Header>
                  <Nav variant="tabs" defaultActiveKey="#first">
                    <Nav.Item>
                      <Nav.Link
                        href={`?buss_id=${buss_id}&pay_type=payments`}
                        active={paymentType === "payments" ? true : false}
                      >
                        Payments
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        href={`?buss_id=${buss_id}&pay_type=missed`}
                        active={paymentType === "missed" ? true : false}
                      >
                        Missed
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        href={`?buss_id=${buss_id}&pay_type=paid`}
                        active={paymentType === "paid" ? true : false}
                      >
                        Paid
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Header>
                <Card.Body>
                  {paymentType === "payments" ? (
                    <div className="overflow-auto " style={{ height: "70vh" }}>
                      {" "}
                      <table class="table  ">
                        <thead className="table-dark">
                          <tr>
                            <th>No.</th>

                            <th>Amount</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {unpaidInstallment.map((item, index) => (
                            <tr key={index}>
                              <td>
                                <p class="fw-normal ">{index + 1}</p>
                              </td>

                              <td>
                                <p class="fw-normal ">
                                  ₱{" "}
                                  {item.status === "not paid" ? (
                                    <>{item.installment.toFixed(2)}</>
                                  ) : item.status === "missed" ? (
                                    <>
                                      {" "}
                                      {handleComputeAddedInterest(
                                        item.maxdate,
                                        item.installment
                                      ).totalPayment.toFixed(2)}
                                    </>
                                  ) : item.status === "paid" ? (
                                    <>{item.amount.toFixed(2)}</>
                                  ) : (
                                    ""
                                  )}
                                </p>
                              </td>
                              <td>
                                {todayPayment ? (
                                  <>
                                    {item.status === "not paid" &&
                                    todayPayment.mindate === item.mindate ? (
                                      <span className="badge rounded-pill bg-success">
                                        today's payment
                                      </span>
                                    ) : (
                                      <>
                                        {item.status === "not paid" ? (
                                          ""
                                        ) : (
                                          <span
                                            class={`badge rounded-pill  ${
                                              item.status === "not paid"
                                                ? "bg-danger text-light "
                                                : item.status === "paid"
                                                ? "bg-success text-dark"
                                                : item.status === "missed"
                                                ? "bg-warning  text-dark"
                                                : ""
                                            }`}
                                          >
                                            {" "}
                                            {item.status}
                                          </span>
                                        )}
                                      </>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    {item.status === "not paid" ? (
                                      ""
                                    ) : (
                                      <span
                                        class={`badge rounded-pill  ${
                                          item.status === "not paid"
                                            ? "bg-danger text-light "
                                            : item.status === "paid"
                                            ? "bg-success text-dark"
                                            : item.status === "missed"
                                            ? "bg-warning  text-dark"
                                            : ""
                                        }`}
                                      >
                                        {" "}
                                        {item.status}
                                      </span>
                                    )}
                                  </>
                                )}
                              </td>

                              <td>
                                <p class="fw-normal">
                                  {new Date(item.mindate).toDateString()} -{" "}
                                  {new Date(item.maxdate).toDateString()}
                                </p>
                              </td>
                              <td>
                                {item.status === "paid" ? (
                                  <FontAwesomeIcon
                                    icon={faCheck}
                                    style={{ color: "#00eb10" }}
                                  />
                                ) : item.status === "not paid" ? (
                                  <>
                                    {todayPayment ? (
                                      <>
                                        {todayPayment.mindate ===
                                        item.mindate ? (
                                          <Button
                                            variant="primary"
                                            //   as={NavLink}
                                            //   to={`approved?id=${item.buss_id}&user_id=${item.buss_user_id}`}
                                            role="button"
                                            className="rounded"
                                            onClick={() =>
                                              handleSetValue(
                                                item.maxdate,
                                                item.installment,
                                                item.id,
                                                item.status
                                              )
                                            }
                                          >
                                            Pay
                                          </Button>
                                        ) : (
                                          ""
                                        )}
                                      </>
                                    ) : (
                                      ""
                                    )}
                                  </>
                                ) : item.status === "missed" ? (
                                  <>
                                    {/* <Button
                                      variant="primary"
                                      //   as={NavLink}
                                      //   to={`approved?id=${item.buss_id}&user_id=${item.buss_user_id}`}
                                      role="button"
                                      className="rounded"
                                      onClick={() =>
                                        handleSetValue(
                                          item.maxdate,
                                          item.installment,
                                          item.id,
                                          item.status
                                        )
                                      }
                                    >
                                      Pay
                                    </Button> */}
                                    <Button
                                      variant="secondary"
                                      //   as={NavLink}
                                      //   to={`approved?id=${item.buss_id}&user_id=${item.buss_user_id}`}
                                      role="button"
                                      className="rounded ms-2"
                                      as={NavLink}
                                      to={`?buss_id=${buss_id}&pay_type=missed&installment_id=${item.id}`}
                                      // onClick={() =>
                                      //   handleSetValue(item.installment, item.id)
                                      // }
                                    >
                                      Details
                                    </Button>
                                  </>
                                ) : (
                                  ""
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : paymentType === "missed" ? (
                    <div className="overflow-auto " style={{ height: "70vh" }}>
                      <table class="table  text-center">
                        <thead className="table-dark">
                          <tr>
                            <th>No.</th>
                            <th>Installment</th>

                            <th>Weeks Passed</th>
                            <th>Interets Added</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {missedPayment.map((item, index) => (
                            <tr
                              key={index}
                              className={
                                item.data.id === itemInstallId
                                  ? "table-secondary"
                                  : ""
                              }
                            >
                              <td>
                                <p class="fw-normal ">{index + 1}</p>
                              </td>
                              <td>
                                {" "}
                                <p class="fw-normal ">
                                  ₱{item.data.installment.toFixed(2)}
                                </p>
                              </td>

                              <td>
                                {
                                  handleComputeAddedInterest(
                                    item.data.maxdate,
                                    item.data.installment
                                  ).daysDifference
                                }
                              </td>
                              <td>
                                ₱{" "}
                                {handleComputeAddedInterest(
                                  item.data.maxdate,
                                  item.data.installment
                                ).interestAdded.toFixed(2)}
                              </td>
                              <td>
                                <p class="fw-normal ">
                                  ₱{" "}
                                  {handleComputeAddedInterest(
                                    item.data.maxdate,
                                    item.data.installment
                                  ).totalPayment.toFixed(2)}
                                </p>
                              </td>
                              <td>
                                <span
                                  class={`badge rounded-pill  ${
                                    item.data.status === "not paid"
                                      ? "bg-danger text-light "
                                      : item.data.status === "paid"
                                      ? "bg-success text-dark"
                                      : item.data.status === "missed"
                                      ? "bg-warning  text-dark"
                                      : ""
                                  }`}
                                >
                                  {todayPayment ? (
                                    <>
                                      {item.data.status === "not paid" &&
                                      todayPayment.mindate ===
                                        item.data.mindate ? (
                                        "today's payment"
                                      ) : (
                                        <> {item.data.status}</>
                                      )}
                                    </>
                                  ) : (
                                    <>{item.data.status}</>
                                  )}
                                </span>
                              </td>

                              <td>
                                <p class="fw-normal">
                                  {new Date(
                                    item.data.mindate
                                  ).toLocaleDateString()}{" "}
                                  -{" "}
                                  {new Date(
                                    item.data.maxdate
                                  ).toLocaleDateString()}
                                </p>
                              </td>
                              <td>
                                {item.data.status === "paid" ? (
                                  <FontAwesomeIcon
                                    icon={faCheck}
                                    style={{ color: "#00eb10" }}
                                  />
                                ) : (
                                  // <Button
                                  //   variant="primary"
                                  //   //   as={NavLink}
                                  //   //   to={`approved?id=${item.buss_id}&user_id=${item.buss_user_id}`}
                                  //   role="button"
                                  //   className="rounded"
                                  //   onClick={() =>
                                  //     handleSetValue(
                                  //       item.data.maxdate,
                                  //       item.data.installment,
                                  //       item.data.id,
                                  //       item.data.status
                                  //     )
                                  //   }
                                  //   style={{ fontSize: ".7rem" }}
                                  // >
                                  //   Pay Missed
                                  // </Button>
                                  ""
                                )}

                                {/* {item.buss_status === "pending" ? (
                  <Button
                    variant="success"
                    as={NavLink}
                    to={`approved?id=${item.buss_id}&user_id=${item.buss_user_id}`}
                    role="button"
                  >
                    Approved
                  </Button>
                ) : item.buss_status === "approved" ||
                  item.buss_status === "start" ? (
                  <Button variant="primary">View</Button>
                ) : (
                  ""
                )} */}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : paymentType === "paid" ? (
                    <div className="overflow-auto " style={{ height: "70vh" }}>
                      <table class="table  ">
                        <thead className="table-dark">
                          <tr>
                            <th>No.</th>

                            <th>Amount</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {unpaidInstallment.map((item, index) => (
                            <tr key={index}>
                              {item.status === "paid" ? (
                                <>
                                  {" "}
                                  <td>
                                    <p class="fw-normal ">{index + 1}</p>
                                  </td>
                                  <td>
                                    <p class="fw-normal ">
                                      ₱{" "}
                                      {item.status === "not paid" ? (
                                        <>{item.installment.toFixed(2)}</>
                                      ) : item.status === "missed" ? (
                                        <>
                                          {" "}
                                          {handleComputeAddedInterest(
                                            item.maxdate,
                                            item.installment
                                          ).totalPayment.toFixed(2)}
                                        </>
                                      ) : item.status === "paid" ? (
                                        <>{item.amount.toFixed(2)}</>
                                      ) : (
                                        ""
                                      )}
                                    </p>
                                  </td>
                                  <td>
                                    <span
                                      class={`badge rounded-pill  ${
                                        item.status === "not paid"
                                          ? "bg-danger text-light "
                                          : item.status === "paid"
                                          ? "bg-success text-dark"
                                          : item.status === "missed"
                                          ? "bg-warning  text-dark"
                                          : ""
                                      }`}
                                    >
                                      {item.status}
                                    </span>
                                  </td>
                                  <td>
                                    <p class="fw-normal">
                                      {new Date(item.mindate).toDateString()} -{" "}
                                      {new Date(item.maxdate).toDateString()}
                                    </p>
                                  </td>
                                  <td>
                                    {item.status === "paid" ? (
                                      <FontAwesomeIcon
                                        icon={faCheck}
                                        style={{ color: "#00eb10" }}
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </td>
                                </>
                              ) : (
                                ""
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    ""
                  )}
                </Card.Body>
              </Card>
            </div>

            <div class="card w-25">
              <div class="card-header ">Transactions</div>
              <div className="overflow-auto " style={{ height: "70vh" }}>
                {" "}
                <table class="table mt-2 table align-middle text-center">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionList.map((item, index) => (
                      <tr key={index}>
                        <td>{item.returnLoan_transac_id}</td>
                        <td>₱ {item.returnLoan_amt.toFixed(2)}</td>
                        <td>
                          {new Date(
                            item.returnLoan_created_at
                          ).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>

    //     <h5 class="card-header bg-danger text-light">Missed Payment</h5>

    // <div
    //   class="card-body d-flex flex-column mt-2"
    //   style={{ cursor: "default" }}
    // >
    //   <span>
    //     <p class="card-text">Sat Nov 04 2023 - Sun Dec 03 2023</p>
    //     <div className=" d-flex align-items-center justify-content-between">
    //       <h4 class="card-title">₱ 2000.00 + 3%</h4>

    //       <a href="#" class="btn btn-primary">
    //         Pay Installment
    //       </a>
    //     </div>
    //   </span>
    // </div>
  );
}

export default BusinessPayments;
