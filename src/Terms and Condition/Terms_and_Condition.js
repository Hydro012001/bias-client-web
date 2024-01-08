import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

function Terms_and_Condition(props) {
  const [show, setShow] = useState(true);
  const agree = sessionStorage.getItem("agreeToTermsandCondition");
  const handleAgree = () => {
    setShow(false);
    sessionStorage.setItem("agreeToTermsandCondition", true);
  };
  useEffect(() => {
    if (agree) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [agree]);
  return (
    <Modal show={show} size="lg">
      <Modal.Header>
        <Modal.Title>TERMS AND CONDITION</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="overflow-auto" style={{ height: "70vh" }}>
          <h5>AGREEMENT TO TERMS</h5>
          <label>
            These Terms and Conditions Constitute a legally binding agreement
            made between you, whether personally or on behalf of an entity
            (“you”) and BiaS (“we”, “us”, “our”), concerning your access to and
            use BiaS website as well as any other media form, media channel,
            mobile website or mobile application related, linked, or otherwise
            connected there to (collectively, the “BiaS”). You agree that by
            accessing the app and site, you have read, understood and agree to
            be bound by all of these terms and condition, if you do not agree
            with all these terms and condition, then you are expressly
            prohibited from using the app or Site and you must discontinue use
            immediately.
          </label>
          <h5>Terms and Conditions for BiaS </h5>
          <p>
            Please read these terms and conditions carefully before using BiaS
            operated by BiaS.
          </p>
          <p>
            1. Acceptance of Terms By accessing or using BiaS, you agree to
            comply with and be bound by these terms and conditions. If you do
            not agree to these terms, please do not use the app.{" "}
          </p>
          <p>
            2. Changes to Terms BiaS reserves the right to update or modify
            these terms at any time without prior notice. Your continued use of
            the app after any changes constitutes acceptance of the new terms
          </p>
          <p>
            3. Use of the App:{" "}
            <p>
              a. BiaS is provided for your personal and non-commercial use only.
            </p>{" "}
            <p>
              b. You may not use the app for any illegal or unauthorized
              purpose. You agree to comply with all laws and regulations
              applicable to your use of the app.
            </p>
            <p>
              c. You are responsible for maintaining the confidentiality of your
              account information and for all activities that occur under your
              account.
            </p>
          </p>
          <p>
            4. Privacy Policy Your use of BiaS is also governed by our Privacy
            Policy, which can be found at . Please review the Privacy Policy to
            understand how we collect, use, and disclose information.
          </p>
          <p>
            5. Intellectual Property:{" "}
            <p>
              a. All content and materials available on [Your Business] are the
              property of BiaS and are protected by intellectual property laws.
            </p>{" "}
            <p>
              {" "}
              b. You may not reproduce, distribute, modify, or create derivative
              works from any content without express written consent from BiaS.
            </p>
            <p>
              6. User-Generated Content:
              <p>
                a. Users may submit content to BiaS. By submitting content, you
                grant a non-exclusive, worldwide, royalty-free license to use,
                reproduce, modify, and distribute the content.{" "}
              </p>
              <p>
                b. BiaS reserves the right to remove any content that violates
                these terms or is otherwise objectionable.{" "}
              </p>
            </p>
            <p>
              8. Limitation of Liability: To the extent permitted by law, BiaS
              shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages, or any loss of profits or
              revenues, whether incurred directly or indirectly.{" "}
            </p>
            <p>
              8. Limitation of Liability: To the extent permitted by law, BiaS
              shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages, or any loss of profits or
              revenues, whether incurred directly or indirectly.{" "}
            </p>
            {/* <p>
              9. Governing Law These terms are governed by and construed in
              accordance with the laws of [Your Jurisdiction], without regard to
              its conflict of law principles.{" "}
            </p> */}
            <i>
              Contact Information If you have any questions about these terms,
              please contact us at <b>biascapstone@gmail.com</b>. By using BiaS,
              you agree to these terms and conditions.
            </i>
          </p>
        </div>
        <Button
          variant="primary"
          className="w-100 rounded mb-3 mt-3"
          onClick={handleAgree}
        >
          Agree
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default Terms_and_Condition;
