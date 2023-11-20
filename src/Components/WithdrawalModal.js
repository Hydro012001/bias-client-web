import React, { useState } from "react";
import "../Screens/CSS/wallet.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
function WithdrawalModal({ showWithdrawal, balance }) {
  const user_id = localStorage.getItem("user_id");
  const [amtWith, setAmtWith] = useState(0);
  const [email, setEmail] = useState("");

  console.log(balance);

  const handleWithdrawRequest = () => {
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}:3006/withdraw`, {
        amount: amtWith,
        type: "Withdraw",
        email: email,
        payee: email,
        user_id: user_id,
        paymentsource: "Bias Wallet",
      })
      .then((res) => {
        if (res.data.status) {
          alert(res.data.message);
        } else {
          alert(res.data.message);
        }
      });
  };
  const handleClose = () => {
    showWithdrawal();
  };
  return (
    <>
      <Modal show={showWithdrawal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Withdraw</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="mb-3 ">
            <label for="exampleFormControlInput1" class="form-label">
              Email
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="e.g 10000"
            />
          </div>
          <div class="mb-3 mt-3">
            <label for="exampleFormControlInput1" class="form-label">
              Amount
            </label>
            <input
              type="number"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="e.g 10000"
            />
          </div>
          <label style={{ fontSize: "12px" }}>
            Note: Please wait for within 2-3 business days. For your transaction
            to completed.
          </label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Withdraw
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default WithdrawalModal;
