import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

function Entrepreneur_Terms_and_Contdition(props) {
  const [show, setShow] = useState(true);
  const agree = sessionStorage.getItem("entrepAgree");
  const handleAgree = () => {
    setShow(false);
    sessionStorage.setItem("entrepAgree", true);
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
        <Modal.Title>Entrepreneur Terms and Conditions</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="overflow-auto" style={{ height: "80vh" }}>
          <p>
            Before using BiaS as an entrepreneur, please carefully review the
            following terms and conditions.
          </p>
          <p>
            By accessing or using our platform, you agree to comply with and be
            bound by the terms outlined below.
          </p>
          <p>
            <p className="fw-bold">1. Eligibility: </p>
            <p>
              a. To use BiaS as an entrepreneur, you must be a legal entity or
              an individual who is at least 18 years old and capable of forming
              a legally binding contract.{" "}
            </p>
            <p>
              <p className="fw-bold">2. Account Registration:</p>
              <p>
                a. Entrepreneurs are required to create an account on BiaS to
                access certain features.{" "}
              </p>
              <p>
                a. Entrepreneurs are required to create an account on BiaS to
                access certain features.{" "}
              </p>
            </p>
            <p>
              <p className="fw-bold">3. Listing a Business: </p>
              <p>
                a. By listing your business on [BiaS], you represent and warrant
                that all information provided is accurate, complete, and not
                misleading.{" "}
              </p>
              <p>
                a. By listing your business on [BiaS], you represent and warrant
                that all information provided is accurate, complete, and not
                misleading.{" "}
              </p>
            </p>
            <p>
              <p className="fw-bold">4. Fees and Payments: </p>
              <p>
                a. BiaS may charge fees for certain services, and entrepreneurs
                agree to pay all fees associated with the use of these services.{" "}
              </p>
              <p>
                b. Fee details will be provided in the pricing section of
                [BiaS], and entrepreneurs are responsible for reviewing and
                understanding the fee structure.
              </p>
            </p>
            <p>
              <p className="fw-bold">5. Intellectual Property: </p>
              <p>
                a. Entrepreneurs retain ownership of the intellectual property
                associated with their business listings.{" "}
              </p>
              <p>
                b. By listing a business on [BiaS], you grant BiaS a
                non-exclusive, worldwide, royalty-free license to use,
                reproduce, modify, and display the content for the purpose of
                promoting your business on the platform.{" "}
              </p>
              <p>
                <p className="fw-bold">6. Communication and Marketing:</p>
                <p>
                  a. By using [BiaS], entrepreneurs consent to receive
                  communications, including promotional messages, from [BiaS].{" "}
                </p>
                <p>
                  b. Entrepreneurs can opt out of promotional communications at
                  any time through the app settings.
                </p>
              </p>
              <p>
                <p className="fw-bold"> 7. Ratings and Reviews:</p>
                <p>
                  a. Users may provide ratings and reviews of listed businesses.
                  BiaS is not responsible for the content of these reviews but
                  reserves the right to moderate and remove reviews that violate
                  these terms.{" "}
                </p>
              </p>
              <p>
                8. Termination BiaS may terminate or suspend access to [BiaS]
                for entrepreneurs immediately, without prior notice or
                liability, for any reason whatsoever, including without
                limitation if you breach these terms.{" "}
              </p>
              <p>
                9. Governing Law These terms are governed by and construed in
                accordance with the laws of [Your Jurisdiction], without regard
                to its conflict of law principles. Contact Information If you
                have any questions about these terms and conditions. Please
                contact us at <b>biascapstone@gmail.com</b>. By using BiaS as an
                entrepreneur, you agree to these terms and conditions.
              </p>
              <p className="fw-bold">10. Business Process Terms</p>
              <p>
                After the business proposal has been approved, you will have a
                time span of one month to gain investors from the exact date it
                was approved, or the business proposal will be cancelled, and
                you will be forced to repitch again. And after one month of
                gaining investors, if the sourced capital has been reached, then
                the administrator and the entrepreneur will have one month to
                distribute the budget capital. And if the distribution of funds
                has been completed, then the entrepreneur will have a time span
                of one month to start the business. And after one month since
                the business started, the entrepreneur will start paying for the
                monthly installments of the invested capital.
              </p>
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

export default Entrepreneur_Terms_and_Contdition;
