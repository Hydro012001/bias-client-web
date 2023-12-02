import { useNavigate, useParams } from "react-router-dom";
import "../Screens/CSS/entrepHome.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { decryptId } from "./Encryptor";
import { useEffect, useState } from "react";
import axios from "axios";
import { encryptId } from "./Encryptor";
export default function ViewBusiness() {
  const user_id = localStorage.getItem("user_id");
  const [bussinessDisplay, setBussinesDisplay] = useState([]);
  const { id } = useParams();
  const businessId = decryptId(id);
  const navigate = useNavigate();
  const [filterValue, setFilterValue] = useState("All");
  const capital = sessionStorage.getItem("capitalBuss");

  useEffect(() => {
    if (businessId === null) {
      return <div>Invalid id</div>;
    } else {
      axios
        .post(
          `${process.env.REACT_APP_NETWORK_ADD}/api/viewBusinessInvestors`,
          {
            businessId: businessId,
          }
        )
        .then((res) => {
          if (res.data.status) {
            setBussinesDisplay(res.data.result);
            console.log(res.data.result);
          } else {
            alert(res.data.message);
          }
        })
        .catch((error) => alert(error));
    }
  }, [user_id, businessId]);

  const handleReturnPayment = (id, amt) => {
    const encrypt = encryptId(id);

    navigate(`/entrepreneur/business/r/${encrypt}`);
  };

  const chatInvestor = (e) => {
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}/api/create-chat-room`, {
        user_id: user_id,
        recieverId: e,
      })
      .then((res) => {
        if (res.data.status && res.data.hasRoom) {
          const encrypt = encryptId(res.data.roomId);
          navigate(`/entrepreneur/chat/t/${encrypt}`);
        } else if (res.data.status && res.data.hasRoom !== true) {
          const encrypt = encryptId(e);
          navigate(`/entrepreneur/chat/t/${encrypt}`);
        } else {
          alert(res.data.message);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleAcceptInvestment = (invest_id) => {
    const status = "Accept";
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}/acceptInvetment`, {
        invest_id: invest_id,
        status: status,
      })
      .then((res) => {
        if (res.data.status) {
          alert(res.data.message);
          window.location.reload();
        } else {
          alert(res.data.message);
        }
      });
  };

  const handleViewInvestorInvestment = (id) => {
    const encrypt = encryptId(id);

    navigate(`/entrepreneur/business/v/${encrypt}`);
  };

  const handleFilter = (str) => {
    setFilterValue(str.charAt(0).toUpperCase() + str.slice(1).toLowerCase());
  };

  const handleInvesment = bussinessDisplay.filter((item) => {
    if (filterValue === "Approved") {
      return item.invst_status === "Approved";
    } else if (filterValue === "Request") {
      return item.invst_status === "Request";
    } else if (filterValue === "Send") {
      return item.invst_amount_send_status === "Send";
    } else if (filterValue === "waitnInvstorApproval") {
      return item.invst_status === "WaitingInvestor";
    } else {
      return true;
    }
  });

  const Accumulated = bussinessDisplay.reduce((accumulator, item) => {
    const valueToAdd = parseFloat(item.invst_amt);

    return accumulator + valueToAdd;
  }, 0);

  const handleCheckBussinesSendStatus = bussinessDisplay.some((item) => {
    return item.invst_status === "Approved";
  });

  const handleCheckBussinesStartStatus = bussinessDisplay.some((item) => {
    return item.buss_status === "start";
  });

  const handleStartBusiness = () => {
    //TODO: this is for axios to start the business

    const invst_id = handleInvesment.map((item) => {
      return item.invst_id;
    });

    console.log(invst_id);
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}/api/UpdateBusinessStart`, {
        businessId: businessId,
        invst_id: invst_id,
      })
      .then((res) => {
        if (res.data.status) {
          alert("Udpated ");
        }
      });
  };
  return (
    <div className="entrep-business">
      <div className="entrep-header">
        <div className="header-details">
          <div className="header-business">
            <span>
              <p id="title-invst">Capital :</p>
              <p id="amout-invst">{parseFloat(capital).toFixed(2)}</p>
            </span>
            <span>
              <p id="title-invst">Accumalted :</p>
              <p id="amout-invst">{Accumulated}</p>
            </span>
            <span>
              <p id="title-invst">No. Investors: </p>
              <p id="amout-invst">{bussinessDisplay.length}</p>
            </span>
          </div>
          <div className="header-filter">
            <select onChange={(e) => handleFilter(e.target.value)}>
              <option value="all">Select Status</option>
              <option value="all">All</option>
              <option value="send">Send Invesment</option>
              <option value="approved">Approved</option>
              <option value="request">Request</option>
              <option value="waitnInvstorApproval">
                Waiting Investor Approval
              </option>
            </select>
          </div>
        </div>
      </div>

      {parseFloat(Accumulated) === parseFloat(capital) &&
      handleCheckBussinesSendStatus === true ? (
        <div>
          <p>Note: Business is can be started</p>

          <div className="startBtn" onClick={handleStartBusiness}>
            Start
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="approvde-investment">
        <div className="invst-header-title">
          <p>{filterValue} Investment</p>
        </div>
        <div className="invst_container">
          {handleInvesment.map((item, index) => (
            <div key={index}>
              <div className="invst-details">
                <div className="display">
                  <p>Amount: {parseFloat(item.invst_amt).toFixed(2)}</p>
                </div>

                <div className="display">
                  <p>
                    Amount Return: {parseFloat(item.invst_returnamt).toFixed(2)}
                  </p>
                </div>
                <button onClick={() => chatInvestor(item.user_id)}>Chat</button>
                <div className="box-details">
                  <span>
                    <p id="amout-invst">Investor:</p>
                    <p id="title-invst">
                      {`${item.user_fname} ${item.user_mname} ${item.user_fname}`}
                    </p>
                  </span>
                  <span>
                    <p id="amout-invst">Interest:</p>
                    <p id="title-invst">{item.invst_interest}</p>
                  </span>
                  <span>
                    <p id="amout-invst">No. Month:</p>
                    <p id="title-invst">{item.invst_num_month}</p>
                  </span>
                  <span>
                    <p id="amout-invst"> Date:</p>
                    <p id="title-invst">
                      {new Date(item.invst_created_at).toDateString()}
                    </p>
                  </span>
                </div>
                {item.invst_status === "start" ? (
                  <div
                    className="returnProfit"
                    onClick={() =>
                      handleReturnPayment(item.invst_id, item.invst_returnamt)
                    }
                  >
                    Return Profit
                  </div>
                ) : item.invst_status === "Request" ? (
                  <div className="accept-decline">
                    <div
                      className="returnProfit"
                      onClick={() =>
                        handleViewInvestorInvestment(item.invst_id)
                      }
                    >
                      Accept
                    </div>
                    <div className=" btndecline">Decline</div>
                  </div>
                ) : item.invst_status === "WaitingInvestor" ? (
                  <div className="accept-decline">
                    <h3>Waiting for the investor to approved</h3>
                  </div>
                ) : item.invst_status === "Approved" ? (
                  <div
                    className="radio-btn"
                    // onClick={() => handleReturnPayment(item.invst_id, item.invst_amt)}
                  >
                    Click Start to start this business
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
