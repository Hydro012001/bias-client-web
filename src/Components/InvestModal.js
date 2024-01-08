import React from "react";
import { useEffect, useState, useRef } from "react";
import { Toast, ToastContainer, Stack, Button, Modal } from "react-bootstrap";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Loan } from "loanjs";
import { LoanCalculate } from "./LoanCalculator";

function InvestModal({
  handleShow,
  capital,
  interest,
  month,
  capitalRemains,

  buss_id,
}) {
  const [show, setShow] = useState(false);
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
  const navigate = useNavigate();
  const handleClose = () => handleShow();
  const [totalInterest, setTotalInterest] = useState(0);
  // const handleInvest = () => {

  // }
  const saveDepositeDatabase = (type, amount, email, date, paypalLog) => {
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}/invest`, {
        type: type,
        amount: amount,
        email: email,
        date: date,
        paypalLog: paypalLog,
        user_id: user_id,
        returnSum: amoutTextRef.current.value,
        status: "request",
        month: month,
        interest: interest,
        buss_id: buss_id,
        notif_status: "unread",
        totalInterest: totalInterestRef.current.value,
      })
      .then((res) => {
        if (res.data.status) {
          setalertStatus(true);
          setalertType("success");
          setAlertMsg(res.data.message);
        } else {
          setalertStatus(true);
          setalertType("danger");
          console.log(res.data.message);
          setAlertMsg(res.data.message);
        }
      })
      .catch((error) => {
        setalertStatus(true);
        setalertType("danger");
        console.log(error.message);
        setAlertMsg(error.message);
      });
  };

  // const testing = () => {
  //   axios
  //     .post(`${process.env.REACT_APP_NETWORK_ADD}/invest`, {
  //       //  type: type,
  //       //  amount: amount,
  //       //  email: email,
  //       //  date: date,
  //       //  paypalLog: paypalLog,
  //       //  user_id: user_id,
  //       //  returnSum: returnSum,
  //       //  status: "request",
  //       //  year: year,
  //       //  interest: interest,
  //       //  buss_id: buss_id,
  //       //  notif_status: "unread",
  //       buss_id: business,
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       // if (res.data.success) {
  //       //   alert(res.data.message);
  //       // } else {
  //       //   alert(res.data.message);
  //       // }
  //     })
  //     .catch((error) => alert(error));
  // };

  const style = { layout: "horizontal" };

  const initialOptions = {
    clientId: process.env.REACT_APP_CLIENT_ID,
    currency: "PHP",
    intent: "capture",
  };

  // useEffect(() => {
  //   if (parseFloat(amount) <= 0) {
  //     setMessage("Amount is less than");
  //   } else if (parseFloat(amount) > parseFloat(capital)) {
  //     setMessage("Amount is greater than ");
  //   } else {
  //     setMessage("");
  //   }
  // }, [amount]);

  const handleComputeLoan = (inputAmount) => {
    if (inputAmount > 0 && inputAmount <= capitalRemains) {
      //const loanjs = new Loan(inputAmount, month, interest);

      const loanjs = LoanCalculate(inputAmount, month, interest);
      setMessage("");

      setAmountReturn(loanjs.totalAmountReturn);
      setTotalInterest(loanjs.AnnualIntrestRate);
    } else if (parseFloat(capitalRemains) < inputAmount) {
      setMessage("Amount is greater than ");
    } else if (inputAmount <= 0) {
      setMessage("Amount is less than ");
    }
  };

  return (
    <>
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
      <Modal show={handleShow} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Invest</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column ">
            <span className=" ps-3 gap-4 pt-3 pb-3 pe-3 border border-3 border-primary mb-5 d-flex flex-column">
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
            </span>
            <div className="d-flex justify-content-center gap-3">
              <span
                className="d-flex flex-column  align-items-center justify-content-center rounded-circle border border-3 border-primary"
                style={{ width: "7rem", height: "7rem" }}
              >
                <label className="fw-bold fs-5">{capitalRemains}</label>
                <label className="text-center">Remaining</label>
              </span>
              <span
                className="d-flex flex-column  align-items-center justify-content-center rounded-circle border border-3 border-primary"
                style={{ width: "7rem", height: "7rem" }}
              >
                <label className="fw-bold fs-5">{month}</label>
                <label className="">Months</label>
              </span>
              <span
                className="d-flex flex-column  align-items-center justify-content-center rounded-circle border border-3 border-primary"
                style={{ width: "7rem", height: "7rem" }}
              >
                <label className="fw-bold fs-5">{interest}%</label>
                <label className="">Interest </label>
              </span>
            </div>
          </div>

          <PayPalScriptProvider options={initialOptions}>
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
              {message ? <label className="text-danger">{message}</label> : ""}
            </div>
            <label className="form-label text-center w-100">
              Invest using Paypal
            </label>
            <PayPalButtons
              style={style}
              onClick={async (data, actions) => {
                const enteredAmount = parseFloat(textBoxRef.current.value);
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
                        description: "invest",
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
                  saveDepositeDatabase(
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
        </Modal.Body>
      </Modal>
    </>
  );
}

export default InvestModal;
