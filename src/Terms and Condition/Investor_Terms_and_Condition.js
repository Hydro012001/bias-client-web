import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

function Investor_Terms_and_Condition(props) {
  const [show, setShow] = useState(true);
  const agree = sessionStorage.getItem("investorAgree");
  const handleAgree = () => {
    setShow(false);
    sessionStorage.setItem("investorAgree", true);
    window.location.reload();
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
        <Modal.Title>Investor Terms and Conditions</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="overflow-auto" style={{ height: "80vh" }}>
          <p>
            Please carefully read the following terms and conditions before
            becoming an investor in BiaS. By investing in BiaS, you agree to be
            bound by the terms outlined below.
          </p>

          <p>
            <p className="fw-bold"> 1. Investment Eligibility: </p>
            <p>
              a. Only individuals who meet the eligibility criteria as specified
              in the relevant offering documents and applicable laws may invest
              in BiaS.
            </p>
            <p>
              b. BiaS reserves the right to reject any investment at its sole
              discretion.{" "}
            </p>
            <p>
              <p className="fw-bold">2. Investment Process:</p>
              <p>
                a. Investors must follow the investment process as outlined on
                BiaS and in the offering documents.
              </p>
              <p>
                b. Investments may be subject to minimum and maximum limits as
                specified in the offering documents.
              </p>
            </p>
            <p>
              <p>
                3. Risk Acknowledgment Investing in BiaS involves risks,
                including but not limited to the risk of loss of the entire
                investment. Investors acknowledge that they have carefully
                considered the risks associated with the investment and are
                investing at their own risk.
              </p>
            </p>
            <p>
              <p className="fw-bold">4. Information Accuracy: </p>
              <p>
                a. Investors are responsible for providing accurate and complete
                information during the investment process.
              </p>
              <p>
                b. BiaS is not responsible for any losses or damages incurred
                due to inaccurate or incomplete information provided by the
                investor.
              </p>
            </p>
            <p>
              <p>
                5. Transferability of Investments made through BiaS may not be
                transferred, sold, or assigned without the express written
                consent of BiaS.
              </p>
              <p className="fw-bold">6. Dividends and Returns </p>
              <p>
                a. Dividends or returns on investments, if any, will be
                distributed in accordance with the terms specified in the
                offering documents.
              </p>
              <p>
                b. BiaS reserves the right to modify the dividend or return
                distribution policies at its discretion.
              </p>
              <p>
                7. Confidentiality Investors agree to keep confidential all
                non-public information received from BiaS regarding the
                investment and the business operations.{" "}
              </p>
              <p>
                8. Exit and Liquidity Investors acknowledge that there may not
                be a readily available market for the sale of their investment
                and that liquidity events are subject to business conditions and
                market factors.{" "}
              </p>
              <i>
                Contact Information If you have any questions about these
                investor terms and conditions, please contact us at{" "}
                <b>biascapstone@gmail.com</b>. By becoming an investor on BiaS,
                you agree to these terms and conditions.
              </i>
            </p>
          </p>
        </div>
        <Button
          variant="primary"
          className="rounded w-100 mb-3 mt-3"
          onClick={handleAgree}
        >
          Agree
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default Investor_Terms_and_Condition;
