import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faHandHoldingDollar,
  faUserTie,
  faStore,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useRef, useState } from "react";
import { Stack, Button, Modal } from "react-bootstrap";
import axios from "axios";

import Nav from "react-bootstrap/Nav";
import iconlogo from "../icons/logo.jpg";
import "../Screens/CSS/investorFeed.css";
import { useNavigate, useParams, NavLink, Outlet } from "react-router-dom";
import { decryptId, encryptId } from "./Encryptor";
import Loader from "../Components/loader";
import ErrorMsg from "./ErrorMsg";

import InvestModal from "./InvestModal";
import { searchFilter } from "../Utils/categoriesAPI";
import { Loan } from "loanjs";
import { mapInvestorProfile } from "../Utils/InvestorProfileMap";

export default function ListOfBusiness() {
  const navigate = useNavigate();
  const [selectCapital, setSelectCapital] = useState("");
  const [listBusiness, setListBusiness] = useState([]);
  const [ImageLoaded, setImageLoaded] = useState(false);
  const [sortedBusinessCategory, setsortedBusinessCategory] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [show, setShow] = useState(false);
  const user_id = localStorage.getItem("user_id");
  const [erromsg, setErrorMsg] = useState();
  const { typeKey, category } = useParams();
  const calculateTotalInvest = (investment) => {
    const investDetails = investment.map((item) => item.invest_amount);

    let totalSum = 0;

    for (let i = 0; i < investDetails.length; i++) {
      totalSum += parseFloat(investDetails[i]);
    }
    if (totalSum) {
      return totalSum;
    } else {
      return 0;
    }
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NETWORK_ADD}:3006/list`)
      .then((res) => {
        if (res.data.success) {
          const initialData = res.data.filterData;

          const data = initialData.filter((item) => {
            if (item.buss_capital !== calculateTotalInvest(item.investments)) {
              return item;
            }
          });

          if (typeKey !== "all") {
            const matchingBusiness = data.filter(
              (item) =>
                item.buss_type.toLocaleLowerCase() ===
                typeKey.toLocaleLowerCase()
            );

            if (category === "all") {
              setsortedBusinessCategory(matchingBusiness);
            } else {
              const categoryData = category.split(",");
              const matchElement = data
                .filter((item) => categoryData.includes(item.buss_type_name))
                .sort((a, b) => {
                  // Custom sorting function based on the order of items in 'categoryData'
                  const aIndex = categoryData.indexOf(a.buss_type_name);
                  const bIndex = categoryData.indexOf(b.buss_type_name);
                  return aIndex - bIndex;
                });
              const notMatchElement = data.filter(
                (item) => !categoryData.includes(item.buss_type_name)
              );

              setsortedBusinessCategory([...matchElement, ...notMatchElement]);
            }
          } else {
            setsortedBusinessCategory(data);
          }
        } else {
          console.log(res.data.error);
        }
      })
      .catch((error) => console.log(error));
  }, [typeKey]);

  const toggleShowText = () => {
    setShowMore(!showMore);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const checkPercentAmt = (percentAmt) => {
    if (percentAmt) {
      return percentAmt;
    } else {
      return "0";
    }
  };

  const handlBusinessParams = (id, status, capital, amountInvested) => {
    if (status === "approve") {
      axios
        .post(`${process.env.REACT_APP_NETWORK_ADD}:3006/checkUserStatus`, {
          user_id: user_id,
        })
        .then((res) => {
          if (res.data.success) {
            if (parseInt(amountInvested) >= parseInt(capital)) {
              alert("Investemnt is already full");
            } else {
              const encrypt = encryptId(id);
              const remains = parseInt(capital) - parseInt(amountInvested);
              const max = (parseInt(remains) / parseInt(capital)) * 100;
              sessionStorage.setItem("capital", parseInt(capital));
              sessionStorage.setItem("remains", remains);
              sessionStorage.setItem("max", max);
              navigate(`i/${encrypt}`);
            }
          } else {
            setErrorMsg(res.data.message);
          }
        });
    } else {
      alert("Business is not available to invest ");
    }
  };
  const handleViewBusiness = (id) => {
    navigate(`i/${id}`);
  };

  // const handlChatUser = (id) => {
  //   setAddActive(id);
  //   socket.emit("join_chat", id, (acknowledgment) => {
  //     if (acknowledgment) {
  //       const chat_id = encryptId(id);

  //       navigate(`t/${chat_id}`);
  //     } else {
  //       alert("Something went wrong");
  //     }
  //   });

  //   // socket.emit("AllChats", id);
  // };

  const handleShow = () => setShow(!show);

  const handleAbbreviatedValue = (value) => {
    if (value >= 1000000000) {
      return (value / 1000000000).toFixed(1) + "B";
    }
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + "M";
    }
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + "K";
    } else {
      return value;
    }
  };

  useEffect(() => {
    if (category !== "all") {
      const categoryData = category.split(",");
      const matchElement = sortedBusinessCategory
        .filter((item) => categoryData.includes(item.buss_type_name))
        .sort((a, b) => {
          // Custom sorting function based on the order of items in 'categoryData'
          const aIndex = categoryData.indexOf(a.buss_type_name);
          const bIndex = categoryData.indexOf(b.buss_type_name);
          return aIndex - bIndex;
        });
      const notMatchElement = sortedBusinessCategory.filter(
        (item) => !categoryData.includes(item.buss_type_name)
      );

      setsortedBusinessCategory([...matchElement, ...notMatchElement]);
    } else {
    }
  }, [category, navigate]);

  return (
    <>
      {sortedBusinessCategory ? (
        <div className="contianer me-5 d-flex flex-wrap justify-content-evenly">
          {sortedBusinessCategory.map((item) => (
            <div key={item.buss_id}>
              <div class="card mt-3 " style={{ width: "20rem" }}>
                <div
                  className="bg-secondary text-center p-3 position-relative d-flex align-items-center justify-content-center"
                  style={{ height: "11rem" }}
                >
                  <img
                    src={item.buss_photo}
                    class="card-img-top w-50 rounded-0"
                    alt="..."
                  />
                </div>

                <div class="card-body d-flex flex-column ">
                  <span className="mb-1 ">
                    <label className="" style={{ fontWeight: "500" }}>
                      {item.buss_name}
                    </label>
                  </span>

                  <span
                    className="mb-3  d-flex align-items-center justify-content-between "
                    style={{ height: "2rem" }}
                  >
                    <div className="  d-flex align-items-center gap-2">
                      <div class="text-center d-flex align-items-center">
                        {mapInvestorProfile(item.investments, 1)}
                      </div>
                      {item.investments.length > 3 ? (
                        <label
                          className="  text-center"
                          style={{ fontSize: ".7rem" }}
                        >
                          {item.investments.length - 3} investors
                        </label>
                      ) : (
                        ""
                      )}
                    </div>
                    <label
                      className="  text-center"
                      style={{ fontSize: ".7rem" }}
                    >
                      {calculateTotalInvest(item.investments) !== 0 ? (
                        <>
                          Remaining Amount:{" "}
                          {handleAbbreviatedValue(
                            parseFloat(
                              item.buss_capital -
                                calculateTotalInvest(item.investments)
                            )
                          )}
                        </>
                      ) : (
                        ""
                      )}
                    </label>
                  </span>

                  <div
                    className="d-flex align-items-center justify-content-center  mb-3 position-absolute "
                    style={{ top: "0rem", right: "0px" }}
                  >
                    <span
                      className="d-flex bg-primary text-light p-1 rounded rounded-end-0 shadow align-items-center justify-content-center  "
                      style={{ fontSize: "12px" }}
                    >
                      <label className="">
                        {item.buss_approved_updated_month} months with{" "}
                        {item.buss_approved_percent}% return
                      </label>
                    </span>
                    {/* <span
                className="d-flex flex-column bg-primary  text-light shadow align-items-center justify-content-center  border border-secondary border-2"
                style={{ width: "2rem", height: "2rem", fontSize: "12px" }}
              ></span> */}
                  </div>

                  <label
                    className="w-100 text-truncate  "
                    style={{ fontSize: "12px" }}
                  >
                    {item.buss_summary}
                  </label>
                  <div className="d-flex gap-2 mt-2">
                    <label
                      class="  border border-dark border-1 w-50 rounded-0 d-flex align-items-center justify-content-center ps-2 pe-2"
                      title={` ₱ ${item.buss_capital} `}
                    >
                      ₱ {handleAbbreviatedValue(item.buss_capital)}
                    </label>

                    <button
                      type="button"
                      class=" btn btn-primary rounded-0 w-75"
                    >
                      <Nav.Link
                        as={NavLink}
                        to={`/investor/business-details?id=${item.buss_id}`}
                      >
                        More +
                      </Nav.Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </>

    // <>
    //   {erromsg ? (
    //     <ErrorMsg msg={erromsg} />
    //   ) : (
    //     <div className="investor">
    //       {listBusiness.length === 0 ? (
    //         <h1>No pitch business yet</h1>
    //       ) : (
    //         <div className="businessList">
    //           {listBusiness.map((item) => (
    //             <div className="feeds" key={item.buss_id}>
    //               <div className="entrepUser">
    //                 <div className="userDetails">
    //                   <div id="profilePic">
    //                     <img
    //                       src={item.user_profile_photo}
    //                       alt="user"
    //                       id="profilePic"
    //                     />
    //                   </div>
    //                   <span>
    //                     {" "}
    //                     <label id="name">
    //                       {item.user_fname} {item.user_lname}
    //                     </label>
    //                     <p id="date">{formatDate(item.buss_created_at)}</p>
    //                   </span>
    //                 </div>
    //                 <br />
    //                 <p id="desc">Description : </p>
    //                 <div className="bussDetails">
    //                   {showMore ? (
    //                     <>
    //                       <p id="expand">{item.buss_details}</p>
    //                     </>
    //                   ) : (
    //                     <>
    //                       <p id="less">{item.buss_details}</p>
    //                     </>
    //                   )}
    //                   <p onClick={toggleShowText} id="collapse">
    //                     {showMore ? "Show less" : "Show more"}
    //                   </p>
    //                   <br />
    //                   <h5>Capital : {item.buss_capital}</h5>
    //                   <h5>
    //                     Amount Remais :
    //                     {parseInt(item.buss_capital) -
    //                       parseInt(item.totalAmountInvts)}
    //                   </h5>
    //                 </div>
    //               </div>

    //               {ImageLoaded ? (
    //                 <img
    //                   src={item.buss_photo}
    //                   alt="Logo"
    //                   id="image"
    //                   onLoad={() => setImageLoaded(true)}
    //                 />
    //               ) : (
    //                 <div>
    //                   <Loader />
    //                   <img
    //                     src={item.buss_photo}
    //                     alt="Logo"
    //                     id="image"
    //                     onLoad={() => setImageLoaded(true)}
    //                   />
    //                 </div>
    //               )}
    //               <button
    //                 onClick={() =>
    //                   handlBusinessParams(
    //                     item.buss_id,
    //                     item.buss_status,
    //                     item.buss_capital,
    //                     item.totalAmountInvts
    //                   )
    //                 }
    //               >
    //                 Invest
    //               </button>
    //               <button onClick={() => chatInvestor(item.user_id)}>
    //                 Message
    //               </button>
    //               {/* <button
    //                 onClick={() =>
    //                   handlBusinessParams(item.buss_id, item.buss_status)
    //                 }
    //               >
    //                 Chat
    //               </button> */}
    //             </div>
    //           ))}
    //         </div>
    //       )}
    //     </div>
    //   )}
    // </>
  );
}
