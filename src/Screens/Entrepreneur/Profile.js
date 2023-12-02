import React, { useEffect, useState } from "react";
import axios from "axios";

import PasswordStrengthBar from "react-password-strength-bar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { encryptId } from "../../Components/Encryptor";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { calculateUserStatus } from "../../Utils/Compute";
import { Button, Toast, ToastContainer } from "react-bootstrap";
import Address from "../../Components/address";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../Components/firebaseConfig";
import Loader from "../../Components/loader";
export default function ProfileInvestor() {
  const user_id = localStorage.getItem("user_id");
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [profile, setProfile] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddleName] = useState("");
  const [lastname, setLastname] = useState("");
  const [Birthday, setBirthday] = useState("");
  const [userage, setUserAge] = useState();
  const [gender, setGender] = useState("");
  const [phonenum, setPhonum] = useState("");
  const [userProfileLink, setUserProfileLink] = useState("");
  const [userProfile, setUserProfile] = useState("");
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [passStrength, setPassStrength] = useState(0);
  const [conPass, setConPass] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [bg, setBg] = useState("");
  const [userIdentity, SetUserIdentity] = useState([]);
  const [changeInputStatus, setChangeInputStatus] = useState(true);
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}/user/myprofile`, {
        user_id: user_id,
      })
      .then((res) => {
        if (res.data.status) {
          setProfile(res.data.result);
          console.log(res.data.result);
          SetUserIdentity(res.data.resultIdentiy);
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

  // const hanldeVerify = (id) => {
  //   const encrypt = encryptId(id);
  //   navigate(`p/${encrypt}`);
  // };

  const handelSetProfile = (event) => {
    const file = event.target.files[0];

    if (file) {
      const imgURL = URL.createObjectURL(file);
      setUserProfile(file);
      setUserProfileLink(imgURL);
    }
  };
  const handleUpdate = async () => {
    setShowLoader(true);
    const fileName = userProfile.name;
    console.log(fileName);
    const storageRef = ref(storage, `${user_id}/${fileName}`);

    const snapshot = await uploadBytes(storageRef, userProfile);
    const url = await getDownloadURL(snapshot.ref);

    console.log(url);

    if (password === conPass) {
      axios
        .post(`${process.env.REACT_APP_NETWORK_ADD}/user/updateprofile`, {
          firstname,
          middlename,
          lastname,
          password,
          Birthday,
          userage,
          province: address.province,
          city: address.city,
          barangay: address.barangay,
          url,
          user_id,
          gender,
        })
        .then((res) => {
          if (res.data.status) {
            setShow(true);
            setBg("success");
            setAlertMsg(res.data.message);
            setShowLoader(false);
            window.location.reload();
          } else {
            setShow(true);
            setBg("danger");
            setAlertMsg(res.data.message);
            setShowLoader(false);
          }
        })
        .catch((error) => {
          setShow(true);
          setBg("danger");
          setAlertMsg(error.messgae);
          setShowLoader(false);
        });
    } else {
      setShow(true);
      setBg("danger");
      setAlertMsg("Password not match");
    }
  };

  const handleAllowEditProrfile = () => {
    setShow(true);
    setBg("primary");
    setChangeInputStatus(false);
    setAlertMsg("You can edit now");
  };

  const handleCancelEdit = () => {
    setShow(true);
    setChangeInputStatus(true);
    setBg("primary");
    setAlertMsg("Cancel");
  };
  return (
    // <div style={{ marginTop: "5rem" }}>
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
    <div>
      {showLoader ? (
        <div
          className="d-flex align-items-center justify-content-center w-100"
          style={{ height: "90vh" }}
        >
          <Loader />
        </div>
      ) : (
        <>
          <ToastContainer position="top-center" className="p-3">
            <Toast
              className="d-inline-block m-1 mt-5"
              bg={`${bg}`}
              show={show}
              delay={3000}
              onClose={() => setShow(false)}
              autohide
            >
              <Toast.Body className="primary text-light">{alertMsg}</Toast.Body>
            </Toast>
          </ToastContainer>
          <div className="overflow-auto" style={{ height: "100vh" }}>
            {profile.map((item) => (
              <div
                className="container-fluid pt-2  pb-4 d-flex flex-column align-items-center"
                key={item.user_id}
              >
                <div
                  className=" d-flex align-items-center justify-content-center pt-5 flex-column"
                  style={{ height: "20rem" }}
                >
                  {changeInputStatus ? (
                    <>
                      {item.user_profile ? (
                        <img
                          src={item.user_profile}
                          alt="Undefiend"
                          className="rounded-circle shadow"
                          style={{ width: "12rem", height: "12rem" }}
                        />
                      ) : (
                        <img
                          src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                          alt="Undefiend"
                          className="rounded-circle shadow"
                          style={{ width: "12rem", height: "12rem" }}
                        />
                      )}
                    </>
                  ) : (
                    <img
                      src={userProfileLink}
                      alt="Undefiend"
                      className="rounded-circle shadow"
                      style={{ width: "12rem", height: "12rem" }}
                    />
                  )}

                  {changeInputStatus ? (
                    ""
                  ) : (
                    <div class="mb-3">
                      <label for="formFileSm" class="form-label">
                        Upload Profile
                      </label>
                      <input
                        class="form-control form-control-sm"
                        id="formFileSm"
                        type="file"
                        onChange={(e) => handelSetProfile(e)}
                      />
                    </div>
                  )}
                </div>
                <div className="mt-5" style={{ width: "75%" }}>
                  <ProgressBar
                    percent={calculateUserStatus(item.user_status)}
                    filledBackground="#b319d2"
                  >
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
                            <FontAwesomeIcon
                              icon={faCheck}
                              style={{ color: "white" }}
                            />
                          </span>

                          <label
                            className={`${
                              accomplished
                                ? "text-primary fw-bold"
                                : "text-secondary"
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
                          className=" d-flex flex-column align-items-center justify-content-end "
                          style={{ height: "4rem", width: "10rem" }}
                        >
                          <span
                            className={` rounded-circle d-flex align-items-center justify-content-center ${
                              accomplished ? "bg-primary" : "bg-secondary"
                            }`}
                            style={{ width: "2rem", height: "2rem" }}
                          >
                            <FontAwesomeIcon
                              icon={faCheck}
                              style={{ color: "white" }}
                            />
                          </span>

                          <label
                            className={`${
                              accomplished
                                ? "text-primary fw-bold"
                                : "text-secondary"
                            }`}
                          >
                            Fully Verfied
                          </label>
                        </div>
                      )}
                    </Step>
                  </ProgressBar>
                </div>
                <div className="d-flex justify-content-end gap-3 mt-5 contianer">
                  <div>
                    {userIdentity ? (
                      <>
                        {userIdentity[0].user_identity_status === "pending" ? (
                          <label>Waiting for approval</label>
                        ) : userIdentity[0].user_identity_status ===
                          "decline" ? (
                          <div className="d-flex flex-column">
                            <label className="text-danger">
                              Your verification status was decline
                            </label>
                            <Button
                              variant="primary"
                              as={NavLink}
                              to={`/investor/account/verify`}
                            >
                              Verify
                            </Button>
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      <Button
                        variant="primary"
                        as={NavLink}
                        to={`/investor/account/verify`}
                      >
                        Verify
                      </Button>
                    )}
                  </div>
                </div>

                <div className="container mt-3">
                  {changeInputStatus ? (
                    <div className="mb-3 mt-3 ">
                      <label for="exampleFormControlInput1" class="form-label">
                        Fullname
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="name@example.com"
                        readOnly
                        value={`${item.user_fname} ${item.user_mname} ${item.user_lname}`}
                      />
                    </div>
                  ) : (
                    <div class="mb-3 mt-3 d-flex gap-3 justify-content-evenly">
                      <div className="w-50">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Firstname
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="e.g Juan"
                          readOnly={changeInputStatus}
                          // value={`${item.user_fname} `}
                          onChange={(e) => setFirstname(e.target.value)}
                        />
                      </div>
                      <div className="w-50">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Middlename
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="e.g Reyes"
                          readOnly={changeInputStatus}
                          // value={`${item.user_mname} `}
                          onChange={(e) => setMiddleName(e.target.value)}
                        />
                      </div>
                      <div className="w-50">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Lastname
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="e.g Dela Cruz"
                          readOnly={changeInputStatus}
                          // value={`${item.user_lname} `}
                          onChange={(e) => setLastname(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  <div class="mb-3 d-flex gap-3">
                    <span className="col">
                      <label for="exampleFormControlInput1" class="form-label">
                        Birthdate
                      </label>
                      <input
                        type={`${changeInputStatus ? "text" : "date"}`}
                        class="form-control"
                        placeholder="name@example.com"
                        readOnly={changeInputStatus}
                        onChange={(e) => {
                          setBirthday(e.target.value);
                          setUserAge(calculateAge(e.target.value));
                        }}
                        value={
                          changeInputStatus
                            ? new Date(item.user_bdate).toLocaleDateString()
                            : Birthday
                        }
                      />
                    </span>
                    <span className="col">
                      <label for="exampleFormControlInput1" class="form-label">
                        Age
                      </label>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="name@example.com"
                        readOnly
                        value={changeInputStatus ? item.user_age : userage}
                      />
                    </span>
                  </div>
                  <div className="w-50">
                    <label for="exampleFormControlInput1" class="form-label">
                      Gender
                    </label>
                    {changeInputStatus ? (
                      <input
                        type="text"
                        class="form-control"
                        placeholder="e.g Dela Cruz"
                        readOnly
                        value={`${item.user_gender} `}
                        // onChange={(e) => setGender(e.target.value)}
                      />
                    ) : (
                      <>
                        <label>Select you gender: </label>
                        <select
                          name="gender"
                          onChange={(e) => setGender(e.target.value)}
                          className="form-select"
                          aria-label="Default select example"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="unknown">Prefer not to say</option>
                        </select>
                      </>
                    )}
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      readOnly
                      value={item.user_email}
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      class="form-control"
                      readOnly={changeInputStatus}
                      value={changeInputStatus ? item.user_password : password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {changeInputStatus ? (
                      ""
                    ) : (
                      <PasswordStrengthBar
                        password={password}
                        onChangeScore={(number, feedback) => {
                          setPassStrength(number);
                        }}
                        className="mt-3"
                      />
                    )}{" "}
                  </div>
                  {changeInputStatus ? (
                    ""
                  ) : (
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        class="form-control"
                        readOnly={changeInputStatus}
                        value={changeInputStatus ? item.user_password : conPass}
                        onChange={(e) => setConPass(e.target.value)}
                      />
                    </div>
                  )}
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Address
                    </label>
                    {changeInputStatus ? (
                      <>
                        <input
                          type="text"
                          class="form-control"
                          readOnly
                          value={`${item.user_province} ${item.user_barangay} ${item.user_city}`}
                        />
                      </>
                    ) : (
                      <>
                        <Address addressData={setAddress} />
                      </>
                    )}
                  </div>
                  {/* <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
           
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
           
            placeholder="name@example.com"
            readOnly
          />
        </div> */}
                  <div className="d-flex justify-content-center gap-3">
                    {" "}
                    {changeInputStatus ? (
                      <>
                        <button
                          type="button"
                          class="btn btn-primary"
                          onClick={handleAllowEditProrfile}
                        >
                          Update
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          class="btn btn-secondary"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          class="btn btn-primary"
                          onClick={handleUpdate}
                        >
                          Submit
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
