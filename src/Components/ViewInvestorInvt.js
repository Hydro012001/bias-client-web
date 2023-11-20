import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { decryptId } from "./Encryptor";
import {
  calcualteLoan,
  calculateAge,
  calculateBirthdate,
} from "../Utils/Compute";

function ViewInvestorInvt(props) {
  const { id } = useParams();
  const Id = decryptId(id);
  const [investInfo, setInvestInfo] = useState([]);
  const [showLReturns, setShowReturn] = useState(false);
  const [loanReturns, setLoanReturns] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [InterestSum, setInterestSum] = useState(0);
  const [InstllSum, setInstllSum] = useState(0);
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}:3006/api/view/investment`, {
        invest_id: Id,
      })
      .then((res) => {
        if (res.data.status) {
          setInvestInfo(res.data.result);
          console.log(res.data.result);
        } else {
          alert(res.data.message);
        }
      });
  }, []);

  //Mao ang pag view sa installments with date na
  // const handleViewReturns = (amt, installNum, interestRate, laonType) => {
  //   setShowReturn(!showLReturns);

  //   const loan = calcualteLoan(amt, installNum, interestRate, laonType);

  //   const installment = loan.installments;
  //   setInterestSum(loan.interestSum);
  //   setInstllSum(loan.sum);

  //   const listdate = [];

  //   for (let i = 0; i < parseInt(installNum); i++) {
  //     const nextDate = new Date(startDate);
  //     nextDate.setMonth(startDate.getMonth() + i);

  //     listdate.push(nextDate.toDateString());
  //   }
  //   const updateReturnsWithDate = installment.map((item, index) => ({
  //     ...item,
  //     date: listdate[index] || null,
  //   }));

  //   setLoanReturns(updateReturnsWithDate);
  //   console.log(updateReturnsWithDate);
  // };

  //Handle To Set Date or Update
  // const handlUpdateDate = (month, invst_id) => {
  //   const currentDate = new Date();
  //   const listdate = [];

  //   for (let i = 0; i < parseInt(month); i++) {
  //     const nextDate = new Date(startDate);
  //     nextDate.setMonth(currentDate.getMonth() + i);
  //     listdate.push(nextDate.toDateString());
  //   }

  //   const updateReturnsWithDate = loanReturns.map((item, index) => ({
  //     ...item,
  //     date: listdate[index] || null,
  //   }));

  //   console.log(updateReturnsWithDate);
  // };

  const handleAcceptInvestment = (id) => {
    axios
      .post(
        `${process.env.REACT_APP_NETWORK_ADD}:3006/api/approvedInvestment`,
        {
          invst_id: id,
          invst_status: "Approved",
        }
      )
      .then((res) => {
        if (res.data.status) {
          alert(res.data.message);
        } else {
          alert(res.data.message);
        }
      });
  };

  const hanldeChangeDate = (event) => {
    const selectedDate = new Date(event);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      alert("Date must not be earlier than today's date.");
    } else {
      const threeMonthsAhead = new Date(currentDate);
      threeMonthsAhead.setMonth(currentDate.getMonth() + 1);

      if (selectedDate >= threeMonthsAhead) {
        setStartDate(selectedDate);
      } else {
        alert("Date must be at least 2 months in advance.");
      }
    }
  };

  return (
    <div>
      {investInfo.map((item, index) => (
        <div key={index}>
          <h2>Invetsor Information</h2>
          <p>
            Name: {`${item.user_fname} ${item.user_mname} ${item.user_lname}`}
          </p>
          <p>Age: {calculateAge(item.user_bdate)}</p>
          <p>Birthday: {calculateBirthdate(item.user_bdate)}</p>
          <p>Gender: {item.user_gender.toLocaleUpperCase()}</p>
          <p>Phone Number: {item.contact_num}</p>
          <p>
            Address:{" "}
            {`${item.user_barangay}, ${item.user_city}, ${item.user_province}`}
          </p>

          <h2>Investment Details</h2>
          <p>Invest Type: {item.invst_type.toLocaleUpperCase()}</p>
          <p>Invest Amount: {item.invst_amt}</p>
          <p>Invest Interest: {item.invst_interest}</p>
          <p>Invest No. of Installment: {item.invst_num_month}</p>
          <p>Amount Return: {parseFloat(item.invst_returnamt).toFixed(2)}</p>
          <p>
            Invest Date Requested:{" "}
            {new Date(item.invst_created_at).toDateString()}
          </p>

          <br />
          <button onClick={() => handleAcceptInvestment(item.invst_id)}>
            Approved
          </button>
          <button>Decline</button>
        </div>
      ))}

      {/* {showLReturns ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Capital</th>
                <th>Installment</th>
                <th>Interest</th>
                <th>Interest Sum</th>
                <th>Remain</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {loanReturns.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.capital.toFixed(2)}</td>
                  <td>{item.installment.toFixed(2)}</td>
                  <td>{item.interest.toFixed(2)}</td>
                  <td>{item.interestSum.toFixed(2)}</td>
                  <td>{item.remain.toFixed(2)}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )} */}
    </div>
  );
}

export default ViewInvestorInvt;
