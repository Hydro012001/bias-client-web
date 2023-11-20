import { useRef } from "react";
import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
export default function Deposite({ showButtonPaypal }) {
  const user_id = localStorage.getItem("user_id");
  const textBoxRef = useRef(null);

  const saveDepositeDatabase = (
    email,
    currency,
    payee,
    status,
    paymentSource,
    timestamp,
    value,
    descript
  ) => {
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}:3006/deposite`, {
        user_id: user_id,
        timestamp: timestamp,
        value: value,
        descript: descript,
        email: email,

        payee: payee,

        paymentSource: paymentSource,
      })
      .then((res) => {
        if (res.data.success) {
          alert(res.data.message);
        } else {
          alert(res.data.message);
        }
      })
      .catch((error) => alert(error));
  };

  const style = { layout: "horizontal" };

  const initialOptions = {
    clientId: process.env.REACT_APP_CLIENT_ID,
    currency: "PHP",
    intent: "capture",
  };
  const handleClose = () => {
    showButtonPaypal();
  };
  return (
    <>
      <Modal show={showButtonPaypal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deposite</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PayPalScriptProvider options={initialOptions}>
            <div class="mb-3 mt-3">
              <label for="exampleFormControlInput1" class="form-label">
                Amount
              </label>
              <input
                type="number"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="e.g 10000"
                ref={textBoxRef}
              />
            </div>

            <PayPalButtons
              style={style}
              createOrder={async (data, actions) => {
                const textboxValue = textBoxRef.current.value;
                return await actions.order
                  .create({
                    purchase_units: [
                      {
                        amount: {
                          currency_code: initialOptions.currency,
                          value: parseInt(textboxValue).toFixed(2),
                        },
                        description: "deposite",
                      },
                    ],
                  })
                  .then((orderId) => {
                    // Your code here after create the order

                    return orderId;
                  });
              }}
              onError={(error) => {
                alert("There is an error on deposite");
                console.log(error.message);
              }}
              onApprove={async (data, actions) => {
                return await actions.order.capture().then((details) => {
                  saveDepositeDatabase(
                    details.payer.email_address,
                    details.purchase_units[0].amount.currency_code,
                    details.purchase_units[0].payee.email_address,
                    details.status,
                    data.paymentSource,
                    details.create_time,
                    details.purchase_units[0].amount.value,
                    details.purchase_units[0].description
                  );
                  showButtonPaypal();
                  textBoxRef.current.value = null;
                });
              }}
            />
          </PayPalScriptProvider>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
