import { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/wallet.css";
import Deposite from "../../Components/deposite";
import Transaction from "../../Components/transaction";
import WithdrawalModal from "../../Components/WithdrawalModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPesoSign,
  faMoneyCheck,
  faPiggyBank,
  faCircleDollarToSlot,
  faHandHoldingDollar,
} from "@fortawesome/free-solid-svg-icons";
import { Dropdown, DropdownButton } from "react-bootstrap";
export default function WalletInvestor() {
  const [showPaypal, setShowPaypal] = useState(false);
  const user_id = localStorage.getItem("user_id");
  const [balance, setBalance] = useState([]);
  const [showTransactionBtn, setShowTransactionBtn] = useState(false);
  const [showWithdrawal, setShowWithdrawal] = useState(false);
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}:3006/balance`, {
        user_id: user_id,
      })
      .then((res) => {
        if (res.data.success) {
          if (res.data.result === 0) {
            setBalance("");
          } else {
            setBalance(res.data.result);
          }
        } else {
          console.log(res.data.error);
        }
      });
  }, [user_id, showPaypal]);

  const showButtonPaypal = () => {
    setShowPaypal(!showPaypal);
  };
  const showTrans = () => {
    setShowTransactionBtn(!showTransactionBtn);
  };

  const getBalance = balance.reduce((sum, item) => sum + parseInt(item.amt), 0);
  const handleShowWitdrawal = () => {
    setShowWithdrawal(!showWithdrawal);
  };
  return (
    // <>
    //   {showWithdrawal ? (
    //     <>
    //       {" "}
    //       <WithdrawalModal balance={getBalance} />{" "}
    //     </>
    //   ) : (
    //     ""
    //   )}

    //   <div className="walletInvestor" style={{ marginTop: "5rem" }}>
    //     {showTransactionBtn ? (
    //       <>
    //         {" "}
    //         <Transaction />
    //         <br />
    //         <button onClick={showTrans}>Back</button>
    //       </>
    //     ) : (
    //       <div className="container">
    //         {balance.length === 0 ? (
    //           <>
    //             <h3>Balance : No balance</h3>
    //           </>
    //         ) : (
    //           <div>
    //             <h3>Balance : ₱ {getBalance}</h3>
    //           </div>
    //         )}

    //         <button
    //           onClick={() => {
    //             setShowWithdrawal(true);
    //             setShowPaypal(false);
    //             setShowTransactionBtn(false);
    //           }}
    //         >
    //           Withdraw
    //         </button>
    //         <button
    //           onClick={() => {
    //             setShowPaypal(true);
    //             setShowWithdrawal(false);
    //             setShowTransactionBtn(false);
    //           }}
    //         >
    //           Deposite
    //         </button>
    //         <button
    //           onClick={() => {
    //             setShowPaypal(false);
    //             setShowWithdrawal(false);
    //             setShowTransactionBtn(true);
    //           }}
    //         >
    //           Transaction History
    //         </button>

    //         <br />
    //         {showPaypal ? <Deposite showButtonPaypal={showButtonPaypal} /> : ""}
    //       </div>
    //     )}
    //   </div>
    // </>

    <div className="contianer-fluid mt-4">
      {showPaypal ? <Deposite showButtonPaypal={showButtonPaypal} /> : ""}
      {showWithdrawal ? (
        <WithdrawalModal showWithdrawal={handleShowWitdrawal} />
      ) : (
        ""
      )}
      <div className="p-5">
        <label className="fs-2 fw-bold">Wallet</label>
        <div className="contianer-fluid  mt-2 d-flex gap-4 ">
          <button
            type="button"
            class="btn btn-primary rounded"
            onClick={handleShowWitdrawal}
          >
            Withdraw
            <FontAwesomeIcon
              icon={faMoneyCheck}
              style={{ marginLeft: "1rem" }}
            />
          </button>
          <button
            type="button"
            class="btn btn-primary rounded "
            onClick={showButtonPaypal}
          >
            Deposite
            <FontAwesomeIcon
              icon={faCircleDollarToSlot}
              style={{ marginLeft: "1rem" }}
            />
          </button>
        </div>
        <div className="contianer-fluid  mt-4 d-flex gap-5">
          <div
            className="shadow d-flex align-items-center justify-content-between p-4"
            style={{ width: "17rem", height: "7rem" }}
          >
            <span className="d-flex flex-column">
              <label className="fw-bold fs-4">583</label>
              <label className="fw-">Total Balance</label>
            </span>

            <span className="">
              <FontAwesomeIcon icon={faPiggyBank} size="2xl" />
            </span>
          </div>
          <div
            className="shadow d-flex align-items-center justify-content-between p-4"
            style={{ width: "17rem", height: "7rem" }}
          >
            <span className="d-flex flex-column">
              <label className="fw-bold fs-4">583</label>
              <label className="fw-">Total Deposite</label>
            </span>

            <span className="">
              <FontAwesomeIcon icon={faCircleDollarToSlot} size="2xl" />
            </span>
          </div>
          <div
            className="shadow d-flex align-items-center justify-content-between p-4"
            style={{ width: "17rem", height: "7rem" }}
          >
            <span className="d-flex flex-column">
              <label className="fw-bold fs-4">583</label>
              <label className="fw-">Total Invest</label>
            </span>

            <span className="">
              <FontAwesomeIcon icon={faHandHoldingDollar} size="2xl" />
            </span>
          </div>
          <div
            className="shadow d-flex align-items-center justify-content-between p-4"
            style={{ width: "17rem", height: "7rem" }}
          >
            <span className="d-flex flex-column">
              <label className="fw-bold fs-4">583</label>
              <label className="fw-">Total Withdraw</label>
            </span>

            <span className="">
              <FontAwesomeIcon icon={faMoneyCheck} size="2xl" />
            </span>
          </div>
        </div>

        <div className="contianer-fluid mt-3 ">
          <span
            className="d-flex justify-content-between align-items-center "
            style={{ height: "5rem" }}
          >
            <span className="d-flex flex-column">
              <label className="fs-4 fw-bold">Payment History</label>
              <label>Payment History</label>
            </span>
            <DropdownButton id="dropdown-basic-button" title="Filter Payments">
              <Dropdown.Item href="#/action-1">Withdraw</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Deposite</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Invest</Dropdown.Item>
            </DropdownButton>
          </span>

          <table class="table mt-4 shadow">
            <thead className="shadow">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Date</th>
                <th scope="col">Recipient</th>
                <th scope="col">Email</th>
                <th scope="col">Type</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Mark</td>
                <td>Otto</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>Mark</td>
                <td>Otto</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Mark</td>
                <td>Otto</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
