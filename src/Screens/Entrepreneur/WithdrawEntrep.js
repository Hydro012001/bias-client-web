import React, { useState } from "react";
import "../CSS/wallet.css";
import axios from "axios";
function WithdrawEntrep(props) {
  const user_id = localStorage.getItem("user_id");
  const [amtWith, setAmtWith] = useState(0);
  const [email, setEmail] = useState("");
  const { balance, capitalSend } = props;
  const [fundsTypes, setFundsType] = useState("");
  const [errorText, setError] = useState("");
  const handleWithdrawRequest = () => {
    if (fundsTypes === "funds") {
      if (amtWith <= balance) {
        handlePostWitdraw();
      } else {
        setError(
          `Your funds balance is ${balance} you are not allowed to withdraw it...Please select capital if you want to withdraw the capital`
        );
      }
    } else if (fundsTypes === "capital") {
      handlePostWitdraw();
    } else {
      setError("Please select your funds type to witdraw");
    }
  };

  const handlePostWitdraw = () => {
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}/withdraw`, {
        amount: amtWith,
        type: "withdrawCapital",
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
  const handleSetFundsType = (e) => {
    setFundsType(e);
  };

  return (
    <div className="wthdraw-modal-container">
      <div className="withdraw-modal">
        <h1>Withdrawal</h1>
        <h4>Balance:₱ {balance + capitalSend}</h4>
        <h5>Send Capital:₱ {capitalSend}</h5>
        <select onChange={(e) => handleSetFundsType(e.target.value)}>
          <option>Select Funds Type</option>
          <option value="capital">Business Capital</option>
          <option value="funds">My Funds</option>
        </select>
        {errorText ? <p>{errorText}</p> : ""}

        <input
          type="number"
          placeholder="Enter amout to withdraw"
          onChange={(e) => setAmtWith(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter your paypal email address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleWithdrawRequest}>Withdraw</button>
      </div>
    </div>
  );
}

export default WithdrawEntrep;
