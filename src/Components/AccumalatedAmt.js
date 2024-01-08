import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorHandler from "../ErrorPage/ErrorHandler";
function AccumalatedAmt({ buss_id }) {
  const navigate = useNavigate();
  const [accumaltedAmt, setAccumaltedAmt] = useState(null);
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}/api/getAccumulatedAmt`, {
        buss_id: buss_id,
      })
      .then((res) => {
        if (res.data.status) {
          setAccumaltedAmt(res.data.result);
          console.log(res.data.result);
        }
      })
      .catch((error) => {
        ErrorHandler(error, navigate);
      });
  }, [buss_id]);
  return (
    <div>
      <span>
        {accumaltedAmt !== null && accumaltedAmt.length > 0 ? (
          <>
            <p>{accumaltedAmt[0].totalAmt}</p>
          </>
        ) : (
          <p>Loading ....</p>
        )}
      </span>
    </div>
  );
}

export default AccumalatedAmt;
