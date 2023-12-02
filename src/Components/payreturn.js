import { useParams } from "react-router-dom";
import { decryptId } from "./Encryptor";

import { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReceipt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
export default function Payreturn({
  amount,
  installmentId,
  handleShow,
  buss_id,
  installmentLength,
}) {
  const user_id = localStorage.getItem("user_id");

  // const { id } = useParams();
  // const invst_id = decryptId(id);
  // const progressRef = useRef();
  // const [progress, setProgress] = useState("30");
  // const user_id = localStorage.getItem("user_id");
  // const [returnHistory, setReturnHistory] = useState([]);
  // //TODO: Make this data from the api of return
  // const [installmentDetails, setInstallmentDetails] = useState([]);
  // const [listReturns, setListReturns] = useState([]);
  // const [todayPayementDate, setTodayPaymentDate] = useState("");
  // const [todayPaymentAmt, setTodayPayemntAmt] = useState(0);
  // const [notPaidPayment, setNotPaidPayment] = useState([]);
  // const [install_id, setInstallId] = useState("");
  // const todayDate = new Date(new Date().setMonth(new Date().getMonth() + 2));

  // // const todayDate = new Date();
  // useEffect(() => {
  //   axios
  //     .post(`${process.env.REACT_APP_NETWORK_ADD}/returnHistory`, {
  //       user_id: user_id,
  //       invst_id: invst_id,
  //     })
  //     .then((res) => {
  //       if (res.data.status) {
  //         setReturnHistory(res.data.result);
  //         console.log(res.data.result);
  //       }
  //     });
  // }, []);

  // useEffect(() => {
  //   axios
  //     .post(`${process.env.REACT_APP_NETWORK_ADD}/investmentdetails`, {
  //       user_id: user_id,
  //       invst_id: invst_id,
  //     })
  //     .then((res) => {
  //       if (res.data.status) {
  //         setInstallmentDetails(res.data.result);
  //       }
  //     });
  // }, []);

  // const returnAmount = returnHistory.reduce((sum, item) => {
  //   const amt = parseFloat(item.installpayment_amout);

  //   return sum + amt;
  // }, 0);
  // const retrnAmt = installmentDetails.map((item) => {
  //   return item.invst_returnamt;
  // });

  // useEffect(() => {
  //   console.log(returnAmount);

  //   const percent = (parseFloat(returnAmount) / parseFloat(retrnAmt)) * 100;

  //   progressRef.current.style.width = `${20}%`;

  //   setProgress(20);
  // }, [returnAmount, retrnAmt]);

  // // const topdate = () => {
  // //   const startDate = installmentDetails[0].date;

  // //   const endDate = installmentDetails[installmentDetails.length - 1].date;

  // //   return `${startDate} - ${endDate}`;
  // // };

  // const todayPayment = () => {
  //   // const todayDate = new Date(new Date().setMonth(new Date().getMonth() + 1));
  //   // installmentDetails.forEach((item) => {
  //   //   const maxMonth = new Date(item.date);
  //   //   const earlierMonth = new Date(maxMonth);
  //   //   earlierMonth.setMonth(maxMonth.getMonth() - 1);
  //   //   if (todayDate >= earlierMonth && todayDate <= maxMonth) {
  //   //     console.log("This date is payment date");
  //   //     console.log(new Date(todayDate).toDateString());
  //   //     axios
  //   //       .post(
  //   //         `${process.env.REACT_APP_NETWORK_ADD}/checkInstallmentPayment`,
  //   //         {
  //   //           intll_id: listReturns.instll_id,
  //   //           date: item.date,
  //   //         }
  //   //       )
  //   //       .then((res) => {
  //   //         if (res.data.status) {
  //   //           const instllmentdata = res.data.result;
  //   //           if (instllmentdata.length === 0) {
  //   //             setTodayPaymentDate(item.date);
  //   //             setTodayPayemntAmt(item.installment);
  //   //           } else {
  //   //             instllmentdata.forEach((item) => {
  //   //               console.log(item);
  //   //             });
  //   //           }
  //   //         }
  //   //       });
  //   //   } else {
  //   //   }
  //   // });
  // };

  // const handleReturnPayment = () => {
  //   // console.log(install_id);
  //   // axios
  //   //   .post(`${process.env.REACT_APP_NETWORK_ADD}/returnProfit`, {
  //   //     amout: todayPaymentAmt,
  //   //     date: todayPayementDate,
  //   //     install_id: install_id,
  //   //     user_id: user_id,
  //   //   })
  //   //   .then((res) => {
  //   //     if (res.data.status) {
  //   //       alert(res.data.message);
  //   //     } else {
  //   //       alert(res.data.message);
  //   //     }
  //   //   })
  //   //   .catch((error) => {
  //   //     alert(error);
  //   //   });
  // };
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
          alert(res.data.message);
          window.location.reload();
        } else {
          alert(res.data.message);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const handleClose = () => handleShow();
  return (
    // <div className="return-contianer">
    //   <div className="top">
    //     <h3>₱ 10000.00</h3>

    //     <div
    //       className="progress-container"
    //       title="percentage of the amount return"
    //     >
    //       <div className="progress-bar progress-text" ref={progressRef}>
    //         {progress ? <> {parseFloat(progress).toFixed(2)}% </> : ""}
    //       </div>
    //     </div>

    //     <div className="payment-status">
    //       <p>Amount Return : ₱ 1000.00</p>
    //     </div>
    //   </div>
    //   <div className="btn-container">
    //     <div className="pay-btn">Pay</div>
    //     <div className="ext-btn">Extend</div>
    //   </div>

    //   <h4>Return History :</h4>
    //   <span className="borderBox" />
    //   <div className="return-history">
    //     <table>
    //       <thead>
    //         <tr>
    //           <th>Date</th>
    //           <th>Amount</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         <tr>
    //           <td>Sample</td>
    //           <td>Sample</td>
    //         </tr>
    //         <tr>
    //           <td>Sample</td>
    //           <td>Sample</td>
    //         </tr>
    //         <tr>
    //           <td>Sample</td>
    //           <td>Sample</td>
    //         </tr>
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
    <Modal show={handleShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
            {/* <label class="form-label">Amount</label>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="e.g 10000"
              value={amount}
              readOnly
            />
            {message ? <label className="text-danger">{message}</label> : ""} */}
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
  );
}
