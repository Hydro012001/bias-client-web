import React from "react";
import { useEffect, useState, useRef } from "react";
import { Toast, ToastContainer, Stack, Button, Modal } from "react-bootstrap";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Loan } from "loanjs";
import { decryptId } from "../Encryptor";
import { decryptTextId } from "../EncryptIDs";
import Loader from "../loader";
import ErrorHandler from "../../ErrorPage/ErrorHandler";
import { LoanCalculate } from "../LoanCalculator";

function UpdateInvestmentModa({
  handleShow,
  capital,
  interest,
  month,
  capitalRemains,
}) {
  const [show, setShow] = useState(true);
  const user_id = localStorage.getItem("user_id");
  const textBoxRef = useRef(null);
  const amoutTextRef = useRef(null);
  const totalInterestRef = useRef(null);
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState("");
  const [alertType, setalertType] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [alertStatus, setalertStatus] = useState(false);
  const [amountReturn, setAmountReturn] = useState(0);
  const [showloader, setShowLoarder] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const buss_id = searchParams.get("buss_id");
  const invst_id = searchParams.get("invst_id");
  const [amoutRemain, setAmountReamin] = useState(null);
  const investData = [decryptId(localStorage.getItem("investmentData"))];
  //Summary

  const [summaryTotalAmount, setSummaryTotalAmount] = useState(0);
  const [summaryInterest, setSummaryInterest] = useState(0);
  const [summaryReturn, setSummaryReturn] = useState(0);

  const summaryTotalAmountRef = useRef();
  const summaryInterestRef = useRef();
  const summaryReturnRef = useRef();
  const handleClose = () => {
    setShow(false);
    navigate(-1);
  };

  useEffect(() => {
    setShowLoarder(true);
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}/getTotalInvestAmount`, {
        buss_id: decryptTextId(buss_id),
      })
      .then((res) => {
        const capitalBusiness = investData[0].buss_capital;
        const investamount = res.data.result[0].totalInvstAmt;
        const myinvest = res.data.result[0].invst_amt;
        const remainingAmttoInvest =
          parseFloat(capitalBusiness) - parseFloat(investamount);
        setAmountReamin(remainingAmttoInvest);
        // console.log(capitalBusiness);
        setShowLoarder(false);
      });
  }, []);

  const [totalInterest, setTotalInterest] = useState(0);
  const handleComputeLoan = (inputAmount) => {
    if (inputAmount > 0 && inputAmount <= amoutRemain) {
      // const loanjs = new Loan(
      //   inputAmount,
      //   investData[0].buss_approved_updated_month,
      //   investData[0].buss_approved_percent
      // );

      const loanjs = LoanCalculate(
        inputAmount,
        investData[0].buss_approved_updated_month,
        investData[0].buss_approved_percent
      );
      setMessage("");
      setSummaryTotalAmount(
        parseFloat(investData[0].invst_amt) + parseFloat(inputAmount)
      );
      setSummaryInterest(
        parseFloat(loanjs.AnnualIntrestRate) +
          parseFloat(investData[0].invst_interest_sum)
      );
      setSummaryReturn(
        parseFloat(loanjs.totalAmountReturn) +
          parseFloat(investData[0].invst_returned_amt)
      );
      setAmount(inputAmount);
      setAmountReturn(loanjs.totalAmountReturn);
      setTotalInterest(loanjs.AnnualIntrestRate);
    } else if (parseFloat(amoutRemain) < inputAmount) {
      setMessage("Amount is greater than ");
    } else if (inputAmount <= 0) {
      setMessage("Amount is less than ");
    }
  };
  const style = { layout: "horizontal" };

  const initialOptions = {
    clientId: process.env.REACT_APP_CLIENT_ID,
    currency: "PHP",
    intent: "capture",
  };

  const handleUpdateInvestment = (type, amount, email, date, paypalLog) => {
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}/updateInvestment`, {
        type: type,
        amount: amount,
        email: email,
        paypalLog: paypalLog,
        updateType: "change_details",
        invst_id: decryptTextId(invst_id),

        user_id,
        summaryTotalAmount: summaryTotalAmountRef.current.value,
        summaryInterest: summaryInterestRef.current.value,
        summaryReturn: summaryReturnRef.current.value,
      })
      .then((res) => {
        if (res.data.status) {
          alert(res.data.message);
          setShow(false);
          window.location.reload();
        } else {
          console.log(res.data.message);
        }
      })
      .catch((error) => {
        ErrorHandler(error, navigate);
      });
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Update Investment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showloader ? (
            <div
              className="d-flex justify-content-center align-items-center w-100"
              style={{ height: "10rem" }}
            >
              <Loader />
            </div>
          ) : (
            <>
              <div className="d-flex flex-column ">
                <span className=" ps-3 gap-4 pt-3 pb-3 pe-3 border border-3 border-success mb-5 d-flex flex-column">
                  <label className="w-100 fw-bold fs-5 text-center ">
                    Your Latest Investment
                  </label>
                  <div className="d-flex justify-content-between flex-wrap ">
                    <span className="d-flex align-items-center justify-content-between  w-50 p-2">
                      <label className="w-50">Amount Invest</label>
                      <input
                        type="text"
                        class="form-control w-50"
                        value={parseFloat(investData[0].invst_amt)}
                        readOnly
                      />
                    </span>
                    <span className="d-flex align-items-center justify-content-between  w-50 p-2">
                      <label className="w-50">Interest Rate</label>
                      <input
                        type="text"
                        class="form-control w-50"
                        value={`${investData[0].invst_interest}%`}
                        readOnly
                      />
                    </span>
                    <span className="d-flex align-items-center justify-content-between w-50 p-2">
                      <label className="w-50">Interest </label>
                      <input
                        type="text"
                        class="form-control w-50"
                        value={investData[0].invst_interest_sum}
                        readOnly
                      />
                    </span>
                    <span className="d-flex align-items-center justify-content-between w-50 p-2">
                      <label className="w-50">Return </label>
                      <input
                        type="text"
                        class="form-control w-50"
                        value={investData[0].invst_returned_amt}
                        readOnly
                      />
                    </span>
                    <span className="d-flex align-items-center justify-content-between w-50 p-2">
                      <label className="w-50">Months</label>
                      <input
                        type="text"
                        class="form-control w-50"
                        value={investData[0].invst_num_month}
                        readOnly
                      />
                    </span>
                  </div>
                </span>
                <span className=" ps-3 gap-4 pt-3 pb-3 pe-3 border border-3 border-primary mb-5 d-flex flex-column">
                  <label className="w-100 fw-bold fs-5 text-center ">
                    Added Investment
                  </label>
                  <div className="d-flex flex-column gap-1 ">
                    <span className="d-flex align-items-center justify-content-between">
                      <label className="">Total Interest</label>
                      <label className="fw-bold fs-5">
                        <input
                          type="text"
                          class="form-control"
                          ref={totalInterestRef}
                          value={totalInterest}
                          readOnly
                        />
                      </label>
                    </span>
                    <span className="d-flex align-items-center justify-content-between">
                      <label className="">Total Return </label>
                      <label className="fw-bold fs-5">
                        <input
                          type="text"
                          class="form-control"
                          ref={amoutTextRef}
                          value={amountReturn}
                          readOnly
                        />
                      </label>
                    </span>
                  </div>
                </span>
                <div className="d-flex justify-content-center gap-3">
                  <span
                    className="d-flex flex-column  align-items-center justify-content-center rounded-circle border border-3 border-primary"
                    style={{ width: "7rem", height: "7rem" }}
                  >
                    <label className="fw-bold fs-5">{amoutRemain}</label>
                    <label className="text-center">Remaining</label>
                  </span>
                  <span
                    className="d-flex flex-column  align-items-center justify-content-center rounded-circle border border-3 border-primary"
                    style={{ width: "7rem", height: "7rem" }}
                  >
                    <label className="fw-bold fs-5">
                      {investData[0].buss_approved_updated_month}
                    </label>
                    <label className="">Months</label>
                  </span>
                  <span
                    className="d-flex flex-column  align-items-center justify-content-center rounded-circle border border-3 border-primary"
                    style={{ width: "7rem", height: "7rem" }}
                  >
                    <label className="fw-bold fs-5">
                      {investData[0].buss_approved_percent}%
                    </label>
                    <label className="">Interest </label>
                  </span>
                </div>
              </div>
              <div class="mb-3 mt-3">
                <label class="form-label">Amount</label>
                <input
                  type="number"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="e.g 10000"
                  ref={textBoxRef}
                  onChange={(e) => handleComputeLoan(e.target.value)}
                />
                {message ? (
                  <label className="text-danger">{message}</label>
                ) : (
                  ""
                )}
              </div>
              {totalInterest ? (
                <span className=" ps-3 gap-4 pt-3 pb-3 pe-3 border border-3  mb-5 d-flex flex-column">
                  <label className="w-100 fw-bold fs-5 text-center ">
                    Summary
                  </label>
                  <div className="d-flex flex-column gap-1 ">
                    <span className="d-flex align-items-center justify-content-between">
                      <label className="">Amount Total Invest</label>
                      <label className="fw-bold fs-5"></label>{" "}
                      <label className="fw-bold fs-5">
                        <input
                          type="text"
                          class="form-control"
                          ref={summaryTotalAmountRef}
                          value={summaryTotalAmount.toFixed(2)}
                          readOnly
                        />
                      </label>
                    </span>
                    <span className="d-flex align-items-center justify-content-between">
                      <label className="">Interest</label>
                      <label className="fw-bold fs-5">
                        <input
                          type="text"
                          class="form-control"
                          ref={summaryInterestRef}
                          value={summaryInterest.toFixed(2)}
                          readOnly
                        />
                      </label>
                    </span>
                    <span className="d-flex align-items-center justify-content-between">
                      <label className="">Return </label>{" "}
                      <label className="fw-bold fs-5">
                        <input
                          type="text"
                          class="form-control"
                          ref={summaryReturnRef}
                          value={summaryReturn.toFixed(2)}
                          readOnly
                        />
                      </label>
                    </span>
                  </div>
                </span>
              ) : (
                ""
              )}
              {amoutRemain > 0 ? (
                <PayPalScriptProvider options={initialOptions}>
                  <label className="form-label text-center w-100">
                    Invest using Paypal
                  </label>
                  <PayPalButtons
                    style={style}
                    onClick={async (data, actions) => {
                      const enteredAmount = parseFloat(
                        textBoxRef.current.value
                      );
                      if (enteredAmount < 0) {
                        setMessage("Amount is less than");
                        // You can return false or a Promise.reject() here to prevent the PayPal window from opening
                        return false;
                      }
                      if (enteredAmount > parseFloat(capitalRemains)) {
                        setMessage("Amount is greater than ");
                        // You can return false or a Promise.reject() here to prevent the PayPal window from opening
                        return false;
                      }
                    }}
                    createOrder={async (data, actions) => {
                      const textboxValue = textBoxRef.current.value;
                      return await actions.order
                        .create({
                          purchase_units: [
                            {
                              amount: {
                                currency_code: initialOptions.currency,
                                value: parseFloat(textboxValue).toFixed(2),
                              },
                              description: "invest_update",
                            },
                          ],
                        })
                        .then((orderId) => {
                          return orderId;
                        });
                    }}
                    onError={(error) => {
                      setalertStatus(true);
                      setalertType("danger");
                      console.log(error.message);
                      setAlertMsg(error.message);
                    }}
                    onApprove={async (data, actions) => {
                      return await actions.order.capture().then((details) => {
                        handleUpdateInvestment(
                          details.purchase_units[0].description,
                          details.purchase_units[0].amount.value,
                          details.payer.email_address,
                          details.create_time,
                          JSON.stringify(details)
                        );
                        textBoxRef.current.value = null;
                      });
                    }}
                  />
                </PayPalScriptProvider>
              ) : (
                <label className="fw-bold text-primary">
                  This business has reach the capital needed.
                </label>
              )}
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UpdateInvestmentModa;
