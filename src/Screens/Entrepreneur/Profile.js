import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/profile.css";
import { Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { encryptId } from "../../Components/Encryptor";
import { ProgressBar, Step } from "react-step-progress-bar";
export default function Profile() {
  const user_id = localStorage.getItem("user_id");

  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}:3006/user/myprofile`, {
        user_id: user_id,
      })
      .then((res) => {
        if (res.data.status) {
          setProfile(res.data.result);
          console.log(res.data.result);
        } else {
          alert(res.data.messgae);
        }
      });
  }, [user_id]);

  const calculateAge = (birthdate) => {
    const currentDate = new Date();

    const birthdateDate = new Date(birthdate);

    const timeDifference = currentDate - birthdateDate;

    const ageInMilliseconds = timeDifference;

    const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;
    const ageInYears = ageInMilliseconds / millisecondsInYear;

    const age = Math.floor(ageInYears);

    return age;
  };

  const calculateBirthdate = (birthdate) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = `${birthdate.toLocaleDateString(undefined, options)}`;

    return formattedDate;
  };

  const hanldeVerify = (id) => {
    const encrypt = encryptId(id);
    navigate(`v/${encrypt}`);
  };
  return (
    // <div>
    //   {profile.map((item, index) => (
    //     <div className="profile-contianer" key={index}>
    //       <div className="profile-header">
    //         <div className="profile-background">
    //           <img
    //             src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
    //             alt="Undefiend"
    //           />
    //         </div>
    //         <div className="profile-info">
    //           <div className="profile-user">
    //             <div className="profile-user-picture">
    //               {item.user_profile_photo ? (
    //                 <img src={item.user_profile_photo} alt="Undefiend" />
    //               ) : (
    //                 <img
    //                   src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
    //                   alt="Undefiend"
    //                 />
    //               )}
    //             </div>

    //             <div className="profile-user-details">
    //               <h4>
    //                 {item.user_fname} {item.user_mname} {item.user_lname}
    //               </h4>
    //               {item.user_type === "investor" ? (
    //                 <h5>Investor</h5>
    //               ) : item.user_type === "entrepreneur" ? (
    //                 <h5>Entrepreneur</h5>
    //               ) : (
    //                 <h5>Undefied</h5>
    //               )}
    //             </div>
    //           </div>

    //           <div className="account-status">
    //             {item.user_status === "No Verified" ? (
    //               <>
    //                 <h3>Not Verfied</h3>
    //                 <button onClick={hanldeVerify}>Verify</button>
    //               </>
    //             ) : (
    //               <>
    //                 <h3>Fully Verfied</h3>
    //               </>
    //             )}
    //           </div>
    //         </div>
    //       </div>
    //       <div className="profile-content">
    //         <div className="profile-about">
    //           <h2>About</h2>
    //           <hr />
    //           <h4>Gender</h4>
    //           <p>{item.user_gender}</p>
    //           <hr />
    //           <h4>Age</h4>
    //           <p>{calculateAge(item.user_bdate)}</p>
    //           <hr />
    //           <h4>Birthday</h4>
    //           <p>{calculateBirthdate(new Date(item.user_bdate))}</p>
    //           <hr />
    //           <h4>Address</h4>
    //           <p>
    //             {item.user_barangay}, {item.user_city}, {item.user_province}
    //           </p>
    //           <hr />
    //         </div>
    //       </div>
    //     </div>
    //   ))}

    //   {/* {profile.map((item) => (

    //     <div key={item.user_id}>
    //       <div className="profile-header">
    //         <div>
    //           <div>
    //             {item.user_profile_photo ? (
    //               <img src={item.user_profile_photo} alt="No Profile" />
    //             ) : (
    //               <>
    //                 <div>
    //                   <h3>Please Uplaod a Profile Picture</h3>
    //                   <button>Upload</button>
    //                 </div>
    //               </>
    //             )}
    //           </div>
    //           <p>
    //             {item.user_fname} {item.user_mname} {item.user_lname}
    //           </p>
    //         </div>
    //         <div>
    //           {item.user_status === "No Verified" ? (
    //             <>
    //               <h3>Account : Not Verfied</h3>
    //               <label>Click Here to Verify : </label>
    //               <button>Verify</button>
    //             </>
    //           ) : (
    //             <>
    //               <h3>Account : Fully Verfied</h3>
    //             </>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   ))} */}
    //   <Outlet />
    // </div>
    <div className="container-fluid w-75 float-end pb-4 d-flex flex-column align-items-center">
      <div
        className=" d-flex align-items-center justify-content-center pt-5"
        style={{ height: "17rem" }}
      >
        <img
          src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
          alt="Undefiend"
          className="rounded-circle shadow"
          style={{ width: "13rem", height: "13rem" }}
        />
      </div>
      <div className="mt-5" style={{ width: "75%" }}>
        <ProgressBar percent={0} filledBackground="#b319d2">
          <Step>
            {({ accomplished, index }) => (
              <div
                className="d-flex flex-column align-items-center justify-content-end "
                style={{ height: "4rem" }}
              >
                <span
                  className={` rounded-circle d-flex align-items-center justify-content-center ${
                    accomplished ? "bg-primary" : "bg-secondary"
                  }`}
                  style={{ width: "2rem", height: "2rem" }}
                >
                  <FontAwesomeIcon icon={faCheck} style={{ color: "white" }} />
                </span>

                <label
                  className={`${
                    accomplished ? "text-primary fw-bold" : "text-secondary"
                  }`}
                >
                  Basic Level
                </label>
              </div>
            )}
          </Step>

          <Step>
            {({ accomplished, index }) => (
              <div
                className="d-flex flex-column align-items-center justify-content-end "
                style={{ height: "4rem" }}
              >
                <span
                  className={` rounded-circle d-flex align-items-center justify-content-center ${
                    accomplished ? "bg-primary" : "bg-secondary"
                  }`}
                  style={{ width: "2rem", height: "2rem" }}
                >
                  <FontAwesomeIcon icon={faCheck} style={{ color: "white" }} />
                </span>

                <label
                  className={`${
                    accomplished ? "text-primary fw-bold" : "text-secondary"
                  }`}
                >
                  Semi-Verifed
                </label>
              </div>
            )}
          </Step>
          <Step>
            {({ accomplished, index }) => (
              <div
                className=" d-flex flex-column align-items-center justify-content-end "
                style={{ height: "4rem", width: "10rem" }}
              >
                <span
                  className={` rounded-circle d-flex align-items-center justify-content-center ${
                    accomplished ? "bg-primary" : "bg-secondary"
                  }`}
                  style={{ width: "2rem", height: "2rem" }}
                >
                  <FontAwesomeIcon icon={faCheck} style={{ color: "white" }} />
                </span>

                <label
                  className={`${
                    accomplished ? "text-primary fw-bold" : "text-secondary"
                  }`}
                >
                  Fully Verfied
                </label>
              </div>
            )}
          </Step>
        </ProgressBar>
      </div>

      <div className="container mt-5">
        <div class="mb-3 mt-3">
          <label for="exampleFormControlInput1" class="form-label">
            Fullname
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            readOnly
            value={"Sample Sample Sample"}
          />
        </div>
        <div class="mb-3 d-flex gap-3">
          <span className="col">
            <label for="exampleFormControlInput1" class="form-label">
              Birthdate
            </label>
            <input
              type="date"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
              readOnly
              value={"2001-09-11"}
            />
          </span>
          <span className="col">
            <label for="exampleFormControlInput1" class="form-label">
              Age
            </label>
            <input
              type="number"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
              readOnly
              value={24}
            />
          </span>
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleFormControlInput1"
            readOnly
            value={"arvel@gmail.com"}
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Address
          </label>
          <input
            type="text"
            class="form-control"
            readOnly
            value={"Cebu City"}
          />
        </div>
        {/* <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            readOnly
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            readOnly
          />
        </div> */}
        <div className="d-flex justify-content-end gap-3">
          <button type="button" class="btn btn-primary">
            Update
          </button>
          <button type="button" class="btn btn-dark">
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}
