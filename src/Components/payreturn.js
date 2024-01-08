import { useParams } from "react-router-dom";
import { decryptId } from "./Encryptor";

import { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReceipt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Toast, ToastContainer } from "react-bootstrap";
export default function Payreturn({
  amount,
  installmentId,
  handleShow,
  buss_id,
  installmentLength,
  totalReyPayment,
}) {
  const user_id = localStorage.getItem("user_id");
  const [alertType, setAlertType] = useState("");
  const [alertStatus, setalertStatus] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const style = { layout: "horizontal" };

  const initialOptions = {
    clientId: process.env.REACT_APP_CLIENT_ID,
    currency: "PHP",
    intent: "capture",
  };

  const handlePayReturnLoan = (email, date, paypalDataLog) => {
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}/payretunrloan`, {
        amount: amount,
        email: email,
        date: date,
        paypalDatalog: JSON.stringify(paypalDataLog),
        user_id: user_id,
        installmentId,
        buss_id,
        installmentLength,
      })
      .then((res) => {
        if (res.data.status) {
          setalertStatus(true);
          setAlertMsg(res.data.message);
          setAlertType("success");
        } else {
          console.log(res.data.message);
          setalertStatus(true);
          setAlertMsg(res.data.message);
          setAlertType("danger");
        }
      })
      .catch((error) => {
        setalertStatus(true);
        setAlertMsg(error.message);
        setAlertType("danger");
      });
  };
  const handleClose = () => handleShow();
  return (
    <>
      <Modal show={handleShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ToastContainer position="top-center" className="p-3">
            <Toast
              className="d-inline-block m-1"
              bg={alertType}
              show={alertStatus}
              delay={1000}
              onClose={() => {
                window.location.reload();
                setalertStatus(false);
              }}
              autohide
            >
              <Toast.Body className="primary text-light">{alertMsg}</Toast.Body>
            </Toast>
          </ToastContainer>

          <PayPalScriptProvider options={initialOptions}>
            <div class="mb-5 mt-3">
              <span className="d-flex align-items-center justify-content-between ">
                <label className="fw-bold">Total Amount Due</label>
                <label className="fw-bold fs-5">
                  <input
                    type="text"
                    class="form-control"
                    // ref={totalInterestRef}
                    value={`₱ ${amount}`}
                    readOnly
                  />
                </label>
              </span>
            </div>
            <label className="form-label text-center w-100">
              Pay using Paypal
            </label>
            <PayPalButtons
              style={style}
              createOrder={async (data, actions) => {
                // const textboxValue = textBoxRef.current.value;
                return await actions.order
                  .create({
                    purchase_units: [
                      {
                        amount: {
                          currency_code: initialOptions.currency,
                          value: parseFloat(amount).toFixed(2),
                        },
                        description: "Pay Return",
                      },
                    ],
                  })
                  .then((orderId) => {
                    return orderId;
                  });
              }}
              onError={(error) => {
                // setalertStatus(true);
                // setalertType("danger");
                // setAlertMsg(error.message);
              }}
              onApprove={async (data, actions) => {
                return await actions.order.capture().then((details) => {
                  handlePayReturnLoan(
                    details.payer.email_address,

                    details.create_time,
                    JSON.stringify(details)
                  );
                  // textBoxRef.current.value = null;
                });
              }}
            />
          </PayPalScriptProvider>
        </Modal.Body>
      </Modal>
    </>
  );
}
