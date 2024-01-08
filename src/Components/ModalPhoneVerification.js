import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
function ModalPhoneVerification({ handleShow, generatedCodes }) {
  const [code, setCode] = useState("");
  const handleClose = () => {
    handleShow();
  };

  const handleVerifyPhone = () => {
    console.log(generatedCodes);
    if (parseInt(code) === parseInt(generatedCodes)) {
      localStorage.setItem("isVerifyPhone", true);
      alert("Code Match");
      handleClose();
    } else {
      alert("Not match");
    }
  };
  return (
    <Modal show={handleShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Phone Verification</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {" "}
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Enter the code here.
          </label>
          <input
            type="text"
            class="form-control"
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleVerifyPhone}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalPhoneVerification;
