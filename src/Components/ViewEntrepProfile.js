import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { Button } from "react-bootstrap";
function ViewEntrepProfile(props) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const entrepId = searchParams.get("entrep_id");
  const [entrepDetails, setEntrepDetails] = useState([]);
  const [rating, setRatings] = useState(0);
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}/user/entrep-details`, {
        entrepId,
      })
      .then((res) => {
        if (res.data.status) {
          setEntrepDetails(res.data.result);
          const ratings = res.data.ratings;
          setRatings(ratings);
        }
      });
  }, [entrepId]);

  // const handleSendSMS = () => {};
  return (
    <div className="d-flex flex-column mt-5 p-3 gap-3">
      {/* <Button>Send SMS</Button> */}
      {entrepDetails.map((item) => (
        <div className="container-fluid w-100  mt-4" key={item.user_id}>
          <img
            src={`${
              item.user_profile
                ? item.user_profile
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }`}
            className="rounded-circle mx-auto d-block  "
            alt="..."
            style={{ width: "15rem", height: "15rem" }}
          />
          <div className="d-flex align-items-center justify-content-center  mt-2">
            <div className="bg-primary d-flex align-items-center justify-content-center gap-2 p-3 rounded-pill">
              <StarRatings
                rating={rating}
                starDimension="25px"
                starSpacing="10px"
                starRatedColor="yellow"
              />
              <label
                className="fw-bold text-light"
                style={{ fontSize: ".9rem" }}
              >
                {rating} out of 5
              </label>
            </div>
          </div>

          <span className="ps-3">
            <div class="mb-3">
              <label className="form-label fw-bold">Entrepreneur Name</label>
              <input
                type="text"
                class="form-control"
                readOnly
                value={`${item.user_fname} ${item.user_mname} ${item.user_lname}`}
              />
            </div>
            <div class="mb-3">
              <label className="form-label fw-bold">Entrepreneur Address</label>
              <input
                type="text"
                class="form-control"
                readOnly
                value={`${item.user_province}, ${item.user_city}, ${item.user_barangay}`}
              />
            </div>
            <div class="mb-3">
              <label className="form-label fw-bold">
                Entrepreneur Birthdate
              </label>
              <input
                type="text"
                class="form-control"
                readOnly
                value={new Date(item.user_bdate).toLocaleDateString()}
              />
            </div>
            <div class="mb-3">
              <label className="form-label fw-bold">Entrepreneur Age</label>
              <input
                type="text"
                class="form-control"
                readOnly
                value={item.user_age}
              />
            </div>
          </span>
        </div>
      ))}
    </div>
  );
}

export default ViewEntrepProfile;
