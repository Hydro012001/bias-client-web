import { useEffect, useState } from "react";
import axios from "axios";
import "../Screens/CSS/investorFeed.css";
import { useNavigate, useParams } from "react-router-dom";
import { decryptId } from "./Encryptor";
import { Loan } from "loanjs";

export default function Invest() {
  const navigate = useNavigate();
  const [percent, setPercent] = useState(0);
  const [amountInvst, setamountInvst] = useState(0);

  const [interest, setInterest] = useState(0);
  const [month, setMonth] = useState(0);
  const [percentReturn, setpercentReturn] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectInterest, setSelectInterest] = useState(0);
  const user_id = localStorage.getItem("user_id");
  const [payee, setPayee] = useState("");
  const [max, setMax] = useState(100);
  const { business } = useParams();
  const [listBusiness, setListBusiness] = useState([]);
  const businessId = decryptId(business);
  const sessionMax = sessionStorage.getItem("max");

  useEffect(() => {
    if (sessionMax) {
      setMax(sessionMax);
    } else {
      setMax("100");
    }
  }, [sessionMax]);
  console.log(max);

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}:3006/api/business`, {
        businessId: businessId,
      })
      .then((res) => {
        setListBusiness(res.data.result);
        // setMax(res.data.result[0].buss_percent_remains);
      })
      .catch((err) => console.log(err));
  }, [businessId]);

  const Sessioncapital = sessionStorage.getItem("capital");
  const sessionRemains = sessionStorage.getItem("remains");
  // console.log(sessionRemains);

  const handlePercent = (e) => {
    const selectpersent = parseInt(e) / 100;
    const interestRate = selectpersent * 10;
    const capital = parseInt(Sessioncapital);
    const amount = selectpersent * capital;

    // console.log(e);
    setamountInvst(amount);
    setPercent(e);
    setSelectInterest(parseFloat(interestRate.toFixed(2)));

    // console.log(e);
    // setPayee(listBusiness.user_email);
    // const selectpersent = parseInt(e) / 100;
    // const capital = parseInt(listBusiness.buss_capital);
    // const amount = selectpersent * capital;

    // const interest = capital * percent * year;

    // setamountInvst(amount);
    // setInterest(interest);
    // setpercentReturn(percentReturn);
  };

  const HandleComputer = () => {
    const loan = new Loan(amountInvst, month, selectInterest, "annuity");
    console.log(loan.sum);
  };

  const getDate = (month) => {
    setMonth(month);
  };
  const invest = () => {
    const loan = new Loan(amountInvst, month, selectInterest, "annuity");
    console.log(loan.sum);
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}:3006/invest`, {
        selectBusinessId: businessId,
        amountInvst: amountInvst,
        user_id: user_id,
        interest: selectInterest,
        percentReturn: percentReturn,
        percent: percent,
        returnAmt: loan.sum,
        month: month,
      })
      .then((res) => {
        if (res.data.success) {
          alert(res.data.message);
        } else {
          alert(res.data.message);
        }
      })
      .catch((error) => console.log(error));
  };

  const hide = () => {
    sessionStorage.removeItem("capital");
    sessionStorage.removeItem("max");
    sessionStorage.removeItem("remains");
    navigate("/investor/feeds");
  };
  return (
    <div className="investor">
      <div className="businessInvest">
        <div className="inputInvest">
          <p>Business Capital {Sessioncapital}</p>
          {sessionRemains === " " ? (
            <p>Remains Amount Invest: {sessionRemains}</p>
          ) : (
            ""
          )}

          <label>Note: 12 months is 1 year</label>
          <br />
          <input
            type="number"
            placeholder="Enter your how much months to invest"
            onChange={(e) => {
              getDate(e.target.value);
            }}
          />
          <br />
          <label>Interest Rate: {selectInterest}%</label>
          <br />
          <label>Amount to Invest: {amountInvst}</label>
          <br />
          {/* <label>Start Date: {startDate && startDate.toDateString()}</label>
          <br />
          <label>End Date: {endDate && endDate.toDateString()}</label>
          <br />
          <label>Amount to Invest : ₱ {amountInvst.toFixed(2)}</label>
          <br />
          <label>Interest : {interest.toFixed(2)}</label>
          <br />
          <label>
            Percent Return : {parseFloat(percentReturn).toFixed(1)}%
          </label>
          <br />
          <label>Select percent :</label> */}

          <input
            type="range"
            min="0"
            max={max}
            value={percent}
            onChange={(e) => handlePercent(e.target.value)}
          />
          <label>{percent} %</label>
          <br />
          <button onClick={() => invest()}>Invest</button>
          <button onClick={() => hide()}>Hide</button>
        </div>
      </div>
    </div>
  );
}
