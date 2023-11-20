import React, { useState, useEffect, useCallback } from "react";
import "../Screens/CSS/calendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
export default function CalendarComponent() {
  const user_id = localStorage.getItem("user_id");
  const [investorList, setInvestorList] = useState([]);
  // const startDateStr = "July 31, 2022";
  // const endDateStr = "July 31, 2024";

  // const [listToMatch, setlistToMatch] = useState([
  //   "July 31, 2022",
  //   "August 31, 2022",
  //   "October 1, 2022",
  // ]);

  // const getMonthList = (start, end) => {
  //   const dateList = [];
  //   const startDate = new Date(start);
  //   const endDate = new Date(end);

  //   let currentDate = startDate;
  //   while (currentDate <= endDate) {
  //     dateList.push({
  //       date: currentDate.toDateString(),
  //       done: false,
  //     });
  //     currentDate.setMonth(currentDate.getMonth() + 1);
  //   }

  //   return dateList;
  // };

  // const [monthlyDates, setMonthlyDates] = useState(
  //   getMonthList(startDateStr, endDateStr)
  // );

  // const markDatesAsDone = useCallback((datesToMark) => {
  //   setMonthlyDates((prevDates) =>
  //     prevDates.map((dateInfo) => {
  //       if (datesToMark.includes(dateInfo.date)) {
  //         return { ...dateInfo, done: true };
  //       }
  //       return dateInfo;
  //     })
  //   );
  // }, []);

  // useEffect(() => {
  //   const parsedDatesToMatch = listToMatch.map((dateStr) =>
  //     new Date(dateStr).toDateString()
  //   );

  //   markDatesAsDone(parsedDatesToMatch);
  // }, [listToMatch, markDatesAsDone]);

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}:3006/api/investortopay`, {
        user_id: user_id,
      })
      .then((res) => {
        //console.log(res.data.result);
        setInvestorList(res.data.result);
      })
      .catch((error) => alert(error));
  }, []);

  return (
    <div className="dates">
      <h1>Investors</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Investment Range</th>
            <th>Business</th>
          </tr>
        </thead>
        <tbody>
          {investorList.map((item, index) => (
            <tr key={index}>
              <td>
                {item.user_fname} {item.user_lname}
              </td>
              <td>
                {new Date(item.startDate).toDateString()} -{" "}
                {new Date(item.endDate).toDateString()}
              </td>
              <td>{item.buss_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
