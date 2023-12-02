import React from "react";

function ViewEntrepProfile(props) {
  return (
    <div className="d-flex flex-column mt-5 p-3 gap-3">
      <div className="container-fluid w-100  mt-4">
        <img
          src="https://cdn.britannica.com/98/236598-050-9F0C5A8D/Mark-Zuckerberg-2019.jpg"
          className="rounded mx-auto d-block  "
          alt="..."
          style={{ width: "15rem", height: "15rem" }}
        />
        <span className="ps-3">
          <div class="mb-3">
            <label className="form-label fw-bold">Entrepreneur Name</label>
            <input
              type="text"
              class="form-control"
              readOnly
              //value={`${item.user_fname} ${item.user_mname} ${item.user_lname}`}
            />
          </div>
          <div class="mb-3">
            <label className="form-label fw-bold">Entrepreneur Address</label>
            <input
              type="text"
              class="form-control"
              readOnly
              //value={`${item.user_province}, ${item.user_city}, ${item.user_barangay}`}
            />
          </div>
          <div class="mb-3">
            <label className="form-label fw-bold">Entrepreneur Birthdate</label>
            <input
              type="text"
              class="form-control"
              readOnly
              //value={new Date(item.user_bdate).toLocaleDateString()}
            />
          </div>
          <div class="mb-3">
            <label className="form-label fw-bold">Entrepreneur Age</label>
            <input
              type="text"
              class="form-control"
              readOnly
              //value={item.user_age}
            />
          </div>
        </span>
      </div>
    </div>
  );
}

export default ViewEntrepProfile;
