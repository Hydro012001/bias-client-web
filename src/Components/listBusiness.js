import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

import Nav from "react-bootstrap/Nav";

import "../Screens/CSS/investorFeed.css";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { encryptId } from "./Encryptor";
import Loader from "../Components/loader";

import { mapInvestorProfile } from "../Utils/InvestorProfileMap";
import { businessLikes } from "./bussinesDetails";
import newIcon from "../icons/newIcon.png";
import Investor_Terms_and_Condition from "../Terms and Condition/Investor_Terms_and_Condition";
import calculateTotalInvest from "../Utils/Compute";
import ErrorHandler from "../ErrorPage/ErrorHandler";

export default function ListOfBusiness() {
  const navigate = useNavigate();
  const agree = sessionStorage.getItem("investorAgree");
  const [hasLikes, setHasLikes] = useState(null);
  const [likes, setLikes] = useState([]);
  const [ImageLoaded, setImageLoaded] = useState(false);
  const [sortedBusinessCategory, setsortedBusinessCategory] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [show, setShow] = useState(false);
  const user_id = localStorage.getItem("user_id");
  const recomendShow = localStorage.getItem("recomend");
  const [erromsg, setErrorMsg] = useState();
  const { typeKey, category } = useParams();
  const [showLoader, setShowLoader] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [investorRecomededBusinessList, setinvestorRecomededBusinessList] =
    useState([]);
  const [newBusinessList, setNewBusinessList] = useState([]);

  const [likesBusiness, setLikesBusiness] = useState([]);
  // const calculateTotalInvest = (investment) => {
  //   const investDetails = investment.map((item) => item);

  //   let totalSum = 0;

  //   for (let i = 0; i < investDetails.length; i++) {
  //     if (investDetails[i].invst_status !== "cancel") {
  //       totalSum += parseFloat(investDetails[i].invst_amount);
  //     } else {
  //     }
  //   }
  //   if (totalSum) {
  //     return totalSum;
  //   } else {
  //     return 0;
  //   }
  // };

  //Get the list of business
  useEffect(() => {
    setShowLoader(true);
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}/list`, {
        user_id: user_id,
      })
      .then((res) => {
        if (res.data.success) {
          const initialResult = res.data.filterData;
          const userHasLikes = res.data.hasLikes;
          const withInvestors = res.data.withInvestors;
          const subCategory = res.data.subCategory;

          const initialBusinessLikes = subCategory.map((item) => ({
            ...item,
            activeClass: false,
          }));
          setLikesBusiness(initialBusinessLikes);

          if (userHasLikes) {
            setHasLikes(true);
            setshowModal(false);
          } else {
            setshowModal(true);
          }
          setinvestorRecomededBusinessList(res.data.recomended);
          // const findBusinessNotMatch = withInvestors.filter((item) =>
          //   investorLikesBusiness.map((data) => {
          //     if (item.buss_id === data.buss_id) {
          //       return item;
          //     } else if (item.buss_id !== data.buss_id) {
          //       return data;
          //     }
          //   })
          // );
          // console.log(res.data.recomended);
          // console.log(...withInvestors, ...investorLikesBusiness);
          //Filter on finding new and old business
          const newBusiness = initialResult.filter((item) => {
            if (item.isNew) {
              return item;
            }
          });
          const notNew = initialResult.filter((item) => {
            if (!item.isNew) {
              return item;
            }
          });

          //using spread to join to arrays
          const data = [...newBusiness, ...notNew];

          //Set Business that is based on the likes of investor

          setNewBusinessList(newBusiness);

          if (
            typeKey !== "all" &&
            typeKey !== "new" &&
            typeKey !== "investee"
          ) {
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
          } else if (typeKey === "new") {
            setsortedBusinessCategory(newBusiness);
          } else if (typeKey === "all") {
            setsortedBusinessCategory(data);
            // setsortedBusinessCategory(data);
          } else if (typeKey === "investee") {
            setsortedBusinessCategory(withInvestors);
          }
        } else {
          console.log(res.data.error);
        }
        setShowLoader(false);
      })
      .catch((error) => ErrorHandler(error, navigate));
  }, [typeKey]);

  const toggletoSetRecommended = () => {
    localStorage.setItem("recomend", true);
    window.location.reload();
  };

  // const formatDate = (dateStr) => {
  //   const date = new Date(dateStr);
  //   return date.toLocaleDateString("en-US", {
  //     month: "long",
  //     day: "numeric",
  //     year: "numeric",
  //   });
  // };

  // const checkPercentAmt = (percentAmt) => {
  //   if (percentAmt) {
  //     return percentAmt;
  //   } else {
  //     return "0";
  //   }
  // };

  const handlBusinessParams = (id, status, capital, amountInvested) => {
    if (status === "approve") {
      axios
        .post(`${process.env.REACT_APP_NETWORK_ADD}/checkUserStatus`, {
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
        .filter((item) => {
          const parsedBussType = JSON.parse(item.buss_type_name);
          return parsedBussType.some((type) => categoryData.includes(type));
        })
        .sort((a, b) => {
          const parsedA = JSON.parse(a.buss_type_name);
          const parsedB = JSON.parse(b.buss_type_name);

          const aIndex = categoryData.indexOf(
            parsedA.find((type) => categoryData.includes(type))
          );
          const bIndex = categoryData.indexOf(
            parsedB.find((type) => categoryData.includes(type))
          );

          return aIndex - bIndex;
        });

      const notMatchElement = sortedBusinessCategory.filter((item) => {
        const parsedBussType = JSON.parse(item.buss_type_name);
        return !parsedBussType.some((type) => categoryData.includes(type));
      });

      setsortedBusinessCategory([...matchElement, ...notMatchElement]);
    }
  }, [category, navigate]);
  const handleClose = () => {
    setshowModal(false);
  };

  //Function for addign a active class to the business types likes
  const handleNameClick = (index) => {
    const updatedBusinessLikes = [...likesBusiness];
    updatedBusinessLikes[index].activeClass =
      !updatedBusinessLikes[index].activeClass;
    setLikesBusiness(updatedBusinessLikes);
  };
  const handleGetTheLikesBusiness = () => {
    const filterLikes = likesBusiness.filter((item) => {
      if (item.activeClass) {
        return item;
      }
    });
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}/savelikes`, {
        filterLikes: JSON.stringify(filterLikes),
        user_id: user_id,
      })
      .then((res) => {
        if (res.data.status) {
          alert(res.data.message);
          setshowModal(false);
          window.location.reload();
        } else {
          alert(res.data.message);
          setshowModal(false);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <>
      {agree ? (
        <Modal show={showModal} onHide={handleClose} size="lg">
          <Modal.Header>
            <Modal.Title>Favorites</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-wrap justify-content-evenly  w-100">
              {likesBusiness.map((item, index) => (
                <div key={index} style={{ cursor: "pointer" }}>
                  <div
                    className={`rounded mb-3 p-2 ${
                      item.activeClass
                        ? "bg-primary text-light "
                        : "bg-secondary"
                    }`}
                    onClick={() => handleNameClick(index)}
                  >
                    {item.sub_ctg_name}
                  </div>
                </div>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleGetTheLikesBusiness}>
              Submit
            </Button>
            <label
              className="fw-bold ms-3"
              onClick={handleClose}
              style={{ cursor: "pointer" }}
            >
              Skip
            </label>
          </Modal.Footer>
        </Modal>
      ) : (
        <Investor_Terms_and_Condition />
      )}

      {showLoader ? (
        <div
          className="contianer me-5 d-flex justify-content-center align-items-center"
          style={{ height: "90vh" }}
        >
          <Loader />
        </div>
      ) : (
        <div className="d-flex flex-column">
          {!recomendShow &&
          hasLikes &&
          agree &&
          investorRecomededBusinessList.length > 0 ? (
            <Modal show={true} onHide={toggletoSetRecommended} size="lg">
              <Modal.Header closeButton>
                <Modal.Title>Business you likes</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {investorRecomededBusinessList ? (
                  <div className="contianer-fluid  me-5 d-flex flex-wrap justify-content-evenly ">
                    {investorRecomededBusinessList.map((item) => (
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
                                {calculateTotalInvest(item.investments) !==
                                0 ? (
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
                            {item.isNew ? (
                              <div
                                className="position-absolute"
                                style={{ top: "9.5rem", left: "0rem" }}
                              >
                                <img
                                  src={newIcon}
                                  alt="..."
                                  style={{ height: "3rem", width: "3rem" }}
                                />
                              </div>
                            ) : (
                              ""
                            )}

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
              </Modal.Body>
              <Modal.Footer></Modal.Footer>
            </Modal>
          ) : (
            ""
          )}
          <div className="mt-2 ">
            {" "}
            {sortedBusinessCategory ? (
              <div className="contianer-fluid  me-5 d-flex flex-wrap justify-content-evenly ">
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
                        {item.isNew ? (
                          <div
                            className="position-absolute"
                            style={{ top: "9.5rem", left: "0rem" }}
                          >
                            <img
                              src={newIcon}
                              alt="..."
                              style={{ height: "3rem", width: "3rem" }}
                            />
                          </div>
                        ) : (
                          ""
                        )}

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
          </div>
        </div>
      )}
    </>
  );
}
