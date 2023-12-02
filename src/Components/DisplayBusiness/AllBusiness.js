import React from "react";
import Nav from "react-bootstrap/Nav";

import { useNavigate, useParams, NavLink, Outlet } from "react-router-dom";
import { mapInvestorProfile } from "../../Utils/InvestorProfileMap";

function AllBusiness({ sortedBusinessCategory }) {
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
  return (
    <div className="mt-2 border">
      {" "}
      <label className="bg-secondary w-100 ps-4 fw-bold ">Feeds</label>
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
  );
}

export default AllBusiness;
