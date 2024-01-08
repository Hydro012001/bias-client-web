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
import { Button, Toast, ToastContainer, Modal } from "react-bootstrap";
import Address from "../../Components/address";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../Components/firebaseConfig";
import Loader from "../../Components/loader";
import ErrorHandler from "../../ErrorPage/ErrorHandler";

export default function Profile() {
  const user_id = localStorage.getItem("user_id");
  const [PasswordToText, setPasswordtoText] = useState(false);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  // const [profile, setProfile] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddleName] = useState("");
  const [lastname, setLastname] = useState("");
  const [Birthday, setBirthday] = useState("");
  const [userage, setUserAge] = useState();
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [userProfileLink, setUserProfileLink] = useState("");
  const [userProfile, setUserProfile] = useState("");
  const [email, setEmail] = useState("");
  const [prevAddres, setPrevAddress] = useState("");
  const [address, setAddress] = useState("");
  const [newPassword, setNewPass] = useState("");
  const [confPass, setConPass] = useState("");
  const [ollPass, setoldPass] = useState("");
  const [password, setPassword] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [bg, setBg] = useState("");
  const [passwordStrength, setPassStrength] = useState(0);
  const [userIdentity, SetUserIdentity] = useState([]);
  const [changeInputStatus, setChangeInputStatus] = useState(true);
  const [showChangePass, setShowChangePass] = useState(false);
  const [passworMatch, setPasswordMatch] = useState("");
  const [showNewandOldPass, setShowNewandOldPass] = useState(false);
  const [clickButton, setClickButton] = useState(false);
  useEffect(() => {
    setShowLoader(true);
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}/user/myprofile`, {
        user_id: user_id,
      })
      .then((res) => {
        if (res.data.status) {
          //  setProfile(res.data.result);

          setFirstname(res.data.result[0].user_fname);
          setLastname(res.data.result[0].user_lname);
          setMiddleName(res.data.result[0].user_mname);
          setBirthday(res.data.result[0].user_bdate);
          setPrevAddress({
            province: res.data.result[0].user_province,
            city: res.data.result[0].user_city,
            barangay: res.data.result[0].user_barangay,
          });
          setGender(res.data.result[0].user_gender);
          setUserProfile(res.data.result[0].user_profile);
          setPassword(res.data.result[0].user_password);
          SetUserIdentity(res.data.resultIdentiy);
          setStatus(res.data.result[0].user_status);
          setEmail(res.data.result[0].user_email);
          setUserAge(res.data.result[0].user_age);
          setShowLoader(false);
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

    if (userProfileLink !== "") {
      const fileName = userProfile.name;

      const storageRef = ref(storage, `${user_id}/${fileName}`);

      const snapshot = await uploadBytes(storageRef, userProfile);
      const url = await getDownloadURL(snapshot.ref);

      axios
        .post(`${process.env.REACT_APP_NETWORK_ADD}/user/updateprofile`, {
          firstname,
          middlename,
          lastname,

          Birthday: new Date(Birthday).toISOString().slice(0, 10),
          userage,
          province:
            address.province !== "" ? address.province : prevAddres.province,
          city: address.city !== "" ? address.city : prevAddres.city,
          barangay:
            address.barangay !== "" ? address.barangay : prevAddres.barangay,
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
      axios
        .post(`${process.env.REACT_APP_NETWORK_ADD}/user/updateprofile`, {
          firstname,
          middlename,
          lastname,

          Birthday: new Date(Birthday).toISOString().slice(0, 10),
          userage,
          province:
            address.province !== "" ? address.province : prevAddres.province,
          city: address.city !== "" ? address.city : prevAddres.city,
          barangay:
            address.barangay !== "" ? address.barangay : prevAddres.barangay,
          url: userProfile,
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

  const handleShowUpdatePass = () => {
    setShowChangePass(!showChangePass);
  };
  const handelCheckNewandOldPass = (e) => {
    if (e != password) {
      setPasswordMatch("Password not match");
      setShowNewandOldPass(false);
    } else if (e === "") {
      setPasswordMatch("Password not match");
    } else {
      setPasswordMatch("");
      setShowNewandOldPass(true);
    }
  };

  const handelChangePassword = () => {
    if (passwordStrength > 3) {
      if (confPass.toString() === newPassword.toString()) {
        axios
          .post(`${process.env.REACT_APP_NETWORK_ADD}/user/udpatePassword`, {
            user_id,
            newPassword,
          })
          .then((res) => {
            if (res.data.status) {
              setShow(true);
              setBg("primary");

              setAlertMsg(res.data.message);
              window.location.reload();
            } else {
              setShow(true);
              setBg("danger");
              setAlertMsg(res.data.message);
            }
          })
          .catch((error) => {
            ErrorHandler(error, navigate);
          });
      } else {
        setShow(true);
        setBg("danger");

        setAlertMsg("Password are not match");
      }
    } else {
      setShow(true);
      setBg("danger");

      setAlertMsg("Password is weak");
    }
  };
  return (
    // <div>
    //   {showLoader ? (
    //     <div
    //       className="d-flex align-items-center justify-content-center w-100"
    //       style={{ height: "90vh" }}
    //     >
    //       <Loader />
    //     </div>
    //   ) : (
    //     <>
    //       <ToastContainer position="top-center" className="p-3">
    //         <Toast
    //           className="d-inline-block m-1 mt-5"
    //           bg={`${bg}`}
    //           show={show}
    //           delay={3000}
    //           onClose={() => setShow(false)}
    //           autohide
    //         >
    //           <Toast.Body className="primary text-light">{alertMsg}</Toast.Body>
    //         </Toast>
    //       </ToastContainer>
    //       <div className="overflow-auto" style={{ height: "100vh" }}>
    //         <div className="container-fluid pt-2  pb-4 d-flex flex-column align-items-center">
    //           <div
    //             className=" d-flex align-items-center justify-content-center pt-5 flex-column"
    //             style={{ height: "20rem" }}
    //           >
    //             {userProfile ? (
    //               <img
    //                 src={userProfileLink ? userProfileLink : userProfile}
    //                 alt="Undefiend"
    //                 className="rounded-circle shadow"
    //                 style={{ width: "12rem", height: "12rem" }}
    //               />
    //             ) : (
    //               <img
    //                 src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
    //                 alt="Undefiend"
    //                 className="rounded-circle shadow"
    //                 style={{ width: "12rem", height: "12rem" }}
    //               />
    //             )}

    //             {changeInputStatus ? (
    //               ""
    //             ) : (
    //               <div class="mb-3">
    //                 <label for="formFileSm" class="form-label">
    //                   Upload Profile
    //                 </label>
    //                 <input
    //                   class="form-control form-control-sm"
    //                   id="formFileSm"
    //                   type="file"
    //                   onChange={(e) => handelSetProfile(e)}
    //                 />
    //               </div>
    //             )}
    //           </div>
    //           <div className="mt-5" style={{ width: "75%" }}>
    //             <ProgressBar
    //               percent={calculateUserStatus(status)}
    //               filledBackground="#b319d2"
    //             >
    //               <Step>
    //                 {({ accomplished, index }) => (
    //                   <div
    //                     className="d-flex flex-column align-items-center justify-content-end "
    //                     style={{ height: "4rem" }}
    //                   >
    //                     <span
    //                       className={` rounded-circle d-flex align-items-center justify-content-center ${
    //                         accomplished ? "bg-primary" : "bg-secondary"
    //                       }`}
    //                       style={{ width: "2rem", height: "2rem" }}
    //                     >
    //                       <FontAwesomeIcon
    //                         icon={faCheck}
    //                         style={{ color: "white" }}
    //                       />
    //                     </span>

    //                     <label
    //                       className={`${
    //                         accomplished
    //                           ? "text-primary fw-bold"
    //                           : "text-secondary"
    //                       }`}
    //                     >
    //                       Basic Level
    //                     </label>
    //                   </div>
    //                 )}
    //               </Step>

    //               <Step>
    //                 {({ accomplished, index }) => (
    //                   <div
    //                     className=" d-flex flex-column align-items-center justify-content-end "
    //                     style={{ height: "4rem", width: "10rem" }}
    //                   >
    //                     <span
    //                       className={` rounded-circle d-flex align-items-center justify-content-center ${
    //                         accomplished ? "bg-primary" : "bg-secondary"
    //                       }`}
    //                       style={{ width: "2rem", height: "2rem" }}
    //                     >
    //                       <FontAwesomeIcon
    //                         icon={faCheck}
    //                         style={{ color: "white" }}
    //                       />
    //                     </span>

    //                     <label
    //                       className={`${
    //                         accomplished
    //                           ? "text-primary fw-bold"
    //                           : "text-secondary"
    //                       }`}
    //                     >
    //                       Fully Verified
    //                     </label>
    //                   </div>
    //                 )}
    //               </Step>
    //             </ProgressBar>
    //           </div>
    //           <div className="d-flex justify-content-end gap-3 mt-5 contianer">
    //             <div>
    //               {userIdentity.length > 0 ? (
    //                 <>
    //                   {userIdentity[0].user_identity_status === "pending" ? (
    //                     <label>Waiting for approval</label>
    //                   ) : userIdentity[0].user_identity_status === "decline" ? (
    //                     <div className="d-flex flex-column">
    //                       <label className="text-danger">
    //                         Your verification status was decline
    //                       </label>
    //                       <Button
    //                         variant="primary"
    //                         as={NavLink}
    //                         to={`/investor/account/verify`}
    //                       >
    //                         Verify
    //                       </Button>
    //                     </div>
    //                   ) : (
    //                     ""
    //                   )}
    //                 </>
    //               ) : (
    //                 <Button
    //                   variant="primary"
    //                   as={NavLink}
    //                   to={`/investor/account/verify`}
    //                 >
    //                   Verify
    //                 </Button>
    //               )}
    //             </div>
    //           </div>

    //           <div className="container mt-3">
    //             {changeInputStatus ? (
    //               <div className="mb-3 mt-3 ">
    //                 <label for="exampleFormControlInput1" class="form-label">
    //                   Fullname
    //                 </label>
    //                 <input
    //                   type="text"
    //                   class="form-control"
    //                   placeholder="name@example.com"
    //                   disabled
    //                   value={`${firstname} ${middlename} ${lastname}`}
    //                 />
    //               </div>
    //             ) : (
    //               <div class="mb-3 mt-3 d-flex gap-3 justify-content-evenly">
    //                 <div className="w-50">
    //                   <label for="exampleFormControlInput1" class="form-label">
    //                     Firstname
    //                   </label>
    //                   <input
    //                     type="text"
    //                     class="form-control"
    //                     placeholder="e.g Juan"
    //                     disabled={changeInputStatus}
    //                     value={firstname}
    //                     onChange={(e) => setFirstname(e.target.value)}
    //                   />
    //                 </div>
    //                 <div className="w-50">
    //                   <label for="exampleFormControlInput1" class="form-label">
    //                     Middlename
    //                   </label>
    //                   <input
    //                     type="text"
    //                     class="form-control"
    //                     placeholder="e.g Reyes"
    //                     disabled={changeInputStatus}
    //                     value={middlename}
    //                     onChange={(e) => setMiddleName(e.target.value)}
    //                   />
    //                 </div>
    //                 <div className="w-50">
    //                   <label for="exampleFormControlInput1" class="form-label">
    //                     Lastname
    //                   </label>
    //                   <input
    //                     type="text"
    //                     class="form-control"
    //                     placeholder="e.g Dela Cruz"
    //                     disabled={changeInputStatus}
    //                     value={lastname}
    //                     onChange={(e) => setLastname(e.target.value)}
    //                   />
    //                 </div>
    //               </div>
    //             )}

    //             <div class="mb-3 d-flex gap-3">
    //               <span className="col">
    //                 <label for="exampleFormControlInput1" class="form-label">
    //                   Birthdate
    //                 </label>
    //                 <input
    //                   type={`${changeInputStatus ? "text" : "date"}`}
    //                   class="form-control"
    //                   placeholder="name@example.com"
    //                   disabled={changeInputStatus}
    //                   onChange={(e) => {
    //                     setBirthday(e.target.value);
    //                     setUserAge(calculateAge(e.target.value));
    //                   }}
    //                   value={
    //                     Birthday
    //                       ? new Date(Birthday).toISOString().slice(0, 10)
    //                       : Birthday
    //                   }
    //                 />
    //               </span>
    //               <span className="col">
    //                 <label for="exampleFormControlInput1" class="form-label">
    //                   Age
    //                 </label>
    //                 <input
    //                   type="number"
    //                   class="form-control"
    //                   placeholder="name@example.com"
    //                   disabled
    //                   value={userage}
    //                 />
    //               </span>
    //             </div>
    //             <div className="w-50">
    //               <label for="exampleFormControlInput1" class="form-label">
    //                 Gender
    //               </label>
    //               {changeInputStatus ? (
    //                 <input
    //                   type="text"
    //                   class="form-control"
    //                   placeholder="e.g Dela Cruz"
    //                   disabled
    //                   value={gender}
    //                   // onChange={(e) => setGender(e.target.value)}
    //                 />
    //               ) : (
    //                 <>
    //                   <label>Select you gender: </label>
    //                   <select
    //                     name="gender"
    //                     onChange={(e) => setGender(e.target.value)}
    //                     className="form-select"
    //                     aria-label="Default select example"
    //                   >
    //                     <option value="male">Male</option>
    //                     <option value="female">Female</option>
    //                     <option value="unknown">Prefer not to say</option>
    //                   </select>
    //                 </>
    //               )}
    //             </div>
    //             <div class="mb-3">
    //               <label for="exampleFormControlInput1" class="form-label">
    //                 Email address
    //               </label>
    //               <input
    //                 type="email"
    //                 class="form-control"
    //                 disabled
    //                 value={email}
    //               />
    //             </div>
    //             <div class="mb-3">
    //               <label for="exampleFormControlInput1" class="form-label">
    //                 Password
    //               </label>
    //               <input
    //                 type="password"
    //                 class="form-control"
    //                 disabled
    //                 value={password}
    //               />
    //             </div>
    //             <div class="mb-3">
    //               <label for="exampleFormControlInput1" class="form-label">
    //                 Address
    //               </label>
    //               {changeInputStatus ? (
    //                 <>
    //                   <input
    //                     type="text"
    //                     class="form-control"
    //                     disabled
    //                     value={`${prevAddres.province} ${prevAddres.barangay} ${prevAddres.city}`}
    //                     // onChange={(e) => setAddress(e.target.value)}
    //                   />
    //                 </>
    //               ) : (
    //                 <>
    //                   <Address addressData={setAddress} />
    //                 </>
    //               )}
    //             </div>

    //             <div className="d-flex justify-content-center gap-3">
    //               {" "}
    //               {changeInputStatus ? (
    //                 <>
    //                   {/* {status === "basic" ? (
    //                     <button
    //                       type="button"
    //                       class="btn btn-primary"
    //                       onClick={handleAllowEditProrfile}
    //                     >
    //                       Update
    //                     </button>
    //                   ) : (
    //                     ""
    //                   )} */}
    //                   <button
    //                     type="button"
    //                     class="btn btn-primary"
    //                     onClick={handleAllowEditProrfile}
    //                   >
    //                     Update
    //                   </button>
    //                 </>
    //               ) : (
    //                 <>
    //                   <button
    //                     type="button"
    //                     class="btn btn-secondary"
    //                     onClick={handleCancelEdit}
    //                   >
    //                     Cancel
    //                   </button>
    //                   <button
    //                     type="button"
    //                     class="btn btn-primary"
    //                     onClick={handleUpdate}
    //                   >
    //                     Submit
    //                   </button>
    //                 </>
    //               )}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </>
    //   )}
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
          {showChangePass ? (
            <Modal show={showChangePass} onHide={handleShowUpdatePass}>
              <Modal.Header closeButton>
                <Modal.Title>Change Password</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div class="form-floating">
                  <input
                    type={`${PasswordToText ? "text" : "password"}`}
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={(e) => handelCheckNewandOldPass(e.target.value)}
                  />
                  <label for="floatingPassword">Old Password</label>
                </div>
                <label>{passworMatch}</label>
                {showNewandOldPass ? (
                  <>
                    {" "}
                    <div class="form-floating mb-2">
                      <input
                        type={`${PasswordToText ? "text" : "password"}`}
                        class="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        onChange={(e) => setNewPass(e.target.value)}
                      />
                      <label for="floatingPassword">New Password</label>
                    </div>
                    <PasswordStrengthBar
                      password={newPassword}
                      onChangeScore={(number, feedback) => {
                        setPassStrength(number);
                      }}
                    />
                    <div class="form-floating mb-2">
                      <input
                        type={`${PasswordToText ? "text" : "password"}`}
                        class="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        onChange={(e) => setConPass(e.target.value)}
                      />
                      <label for="floatingPassword">Confirm Password</label>
                    </div>
                  </>
                ) : (
                  ""
                )}

                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    onChange={() => setPasswordtoText(!PasswordToText)}
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Show Password
                  </label>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleShowUpdatePass}>
                  Close
                </Button>
                <Button variant="primary" onClick={handelChangePassword}>
                  Change Password
                </Button>
              </Modal.Footer>
            </Modal>
          ) : (
            ""
          )}
          <div className="overflow-auto" style={{ height: "100vh" }}>
            <div className="container-fluid pt-2  pb-4 d-flex flex-column align-items-center">
              <div
                className=" d-flex align-items-center justify-content-center pt-5 flex-column"
                style={{ height: "20rem" }}
              >
                {userProfile ? (
                  <img
                    src={userProfileLink ? userProfileLink : userProfile}
                    alt="Undefiend"
                    className="rounded-circle shadow"
                    accept="image/png, image/jpeg, image/jpg"
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
                  percent={calculateUserStatus(status)}
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
                          Fully Verified
                        </label>
                      </div>
                    )}
                  </Step>
                </ProgressBar>
              </div>
              <div className="d-flex justify-content-end gap-3 mt-5 contianer">
                <div>
                  {userIdentity.length > 0 ? (
                    <>
                      {userIdentity[0].user_identity_status === "pending" ? (
                        <label>Waiting for approval</label>
                      ) : userIdentity[0].user_identity_status === "decline" ? (
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
                      disabled
                      value={`${firstname} ${middlename} ${lastname}`}
                    />
                  </div>
                ) : (
                  <div class="mb-3 mt-3 d-flex gap-3 justify-content-evenly">
                    <div className="w-50">
                      <label for="exampleFormControlInput1" class="form-label">
                        Firstname
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="e.g Juan"
                        disabled={changeInputStatus}
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                      />
                    </div>
                    <div className="w-50">
                      <label for="exampleFormControlInput1" class="form-label">
                        Middlename
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="e.g Reyes"
                        disabled={changeInputStatus}
                        value={middlename}
                        onChange={(e) => setMiddleName(e.target.value)}
                      />
                    </div>
                    <div className="w-50">
                      <label for="exampleFormControlInput1" class="form-label">
                        Lastname
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="e.g Dela Cruz"
                        disabled={changeInputStatus}
                        value={lastname}
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
                      disabled={changeInputStatus}
                      onChange={(e) => {
                        setBirthday(e.target.value);
                        setUserAge(calculateAge(e.target.value));
                      }}
                      value={
                        Birthday
                          ? new Date(Birthday).toISOString().slice(0, 10)
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
                      disabled
                      value={userage}
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
                      disabled
                      value={gender}
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
                    disabled
                    value={email}
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    disabled
                    value={password}
                  />
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={handleShowUpdatePass}
                  >
                    Change Password
                  </button>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Address
                  </label>
                  {changeInputStatus ? (
                    <>
                      <input
                        type="text"
                        class="form-control"
                        disabled
                        value={`${prevAddres.province} ${prevAddres.barangay} ${prevAddres.city}`}
                        // onChange={(e) => setAddress(e.target.value)}
                      />
                    </>
                  ) : (
                    <>
                      <Address addressData={setAddress} />
                    </>
                  )}
                </div>

                <div className="d-flex justify-content-center gap-3">
                  {" "}
                  {changeInputStatus ? (
                    <>
                      {/* {status === "basic" ? (
                        <button
                          type="button"
                          class="btn btn-primary"
                          onClick={handleAllowEditProrfile}
                        >
                          Update
                        </button>
                      ) : (
                        ""
                      )} */}
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
          </div>
        </>
      )}
    </div>
  );
}
